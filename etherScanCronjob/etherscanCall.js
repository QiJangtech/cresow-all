var async = require('async-q');
var Web3 = require('web3');
var db = require('./db');
var http = require('http');
var request = require('request');
const Etherscan = require('node-etherscan-api');

const TOKEN_API = 'B72VBNXP3KK1FCMZZIUEU9HXPCZ9F4T4DR';
const etherscan = new Etherscan(TOKEN_API);

const cresow_eth_wallet = '0x35D6E8d02089b3e4577E47102fd4C5396c479e09'.toLowerCase();


// const providerPath = `wss://mainnet.infura.io/l8nAh1rMMoXp7UgvDyZ2/ws`
// var web3 = new Web3()
// const eventProvider = new Web3.providers.WebsocketProvider(providerPath)
//     //listen for disconnects
// eventProvider.on('error', e => console.error(e));
// eventProvider.on('end', e => console.error(e))

// web3.setProvider(eventProvider)

var web3 = new Web3('https://mainnet.infura.io/l8nAh1rMMoXp7UgvDyZ2');
// var web3 = new Web3(new Web3.providers.HttpProvider('http://13.230.45.43:7878'));

var ETHtoCRXrate = 1000
var adminAccount = '0x35D6E8d02089b3e4577E47102fd4C5396c479e09'
// var hash = '0xaa33778566e865a55c51d1d4cfb479c0319607feb7778234aac1e03a4630bfa5';
// var hash = '0x585f6c32ae9ad06c18b5da4b26a4f236a0368f764b4d1bed430fe191810fd541';

var getTransactionStatus = (hash) => {
    return new Promise((resolve, reject) => {
        web3.eth.getTransactionReceipt(hash, (error, result) => {
            if (error) {
                reject(error)
            }
            if (result) {
                resolve(result.status ? 'COMPLETED' : 'FAILED')
            }
        })
    })
}

function getethAddress() {
    return db.select().from('tbl_walletinfohistory')
        .where('status', 'pending')
        .then(result => {
            if (result.length) {
                async.eachSeries(result, record => {
                    // GET RECORD FROM DB
                    etherscan.getTransactions(record.from_address)
                        .then(transactions => {
                            Array.from(transactions).forEach(trx => {
                                //GET transaction using from_address, value and blocknumber
                                if (trx.to == cresow_eth_wallet) {
                                    if (web3.utils.fromWei(trx.value) == record.amount) {
                                        return db.select().from('tbl_walletinfohistory')
                                            .where('trx_hash', trx.hash)
                                            .then(row => {
                                                console.log(row);

                                                var params = {
                                                    "transaction_id": record.id,
                                                    "trx_hash": trx.hash
                                                };

                                                request({
                                                    url: 'https://u03g7xi1gh.execute-api.us-east-1.amazonaws.com/dev/wallet/completeDeposit',
                                                    method: "PUT",
                                                    headers: {
                                                        'Content-type': 'application/json'
                                                    },
                                                    body: params,
                                                    json: true
                                                 }, (error, response, body) => {
                                                    
                                                 })

                                            })
                                    }
                                }

                            })
                        })
                });
            }
        });
}

var insertTransactions = (trx) => {
    return new Promise((resolve, reject) => {
        db.select().from('wallet_info_history')
            .where('trx_hash', trx.hash)
            .first()
            .then(result => {
                if (!result) {
                    return db('wallet_master')
                        .insert({
                            'transaction_type': 'DEPOSIT',
                            'transaction_status': 'PENDING',
                            'eth_deposit': web3.utils.fromWei(trx.value),
                            'crx_amount': web3.utils.fromWei(trx.value) * ETHtoCRXrate,
                            'trx_hash': trx.hash,
                            'from_address': trx.from
                        })
                        .then(success => {
                            resolve(success)
                        })
                        .catch(error => {
                            reject(error)
                        })
                } else {
                    reject('Transaction Exists')
                }
            })
    })
}

function getAllTransactions() {
    web3.eth.getBlockNumber()
        .then(num => {
            console.log(num)
            endBlockNumber = num;
            startBlockNumber = endBlockNumber - 100;
            console.log("Searching for transactions to account " + adminAccount + " within blocks " + startBlockNumber + " and " + endBlockNumber);
            for (var i = startBlockNumber; i <= endBlockNumber; i++) {
                if (i % 100 == 0) {
                    console.log("Searching block " + i);
                }
                web3.eth.getBlock(i, true)
                    .then(block => {
                        if (block != null && block.transactions != null) {
                            block.transactions.forEach(trx => {
                                if (trx.to == adminAccount) {
                                    console.log(web3.utils.fromWei(trx.value))
                                    insertTransactions(trx)
                                        .then(res => {
                                            console.log("Total " + res[0] + " Rows after updating")
                                        })
                                        .catch(err => {
                                            console.error('DB Error: ', err);
                                        })
                                    // console.log('---------------------------------------------------------------------')
                                }
                            })
                        }
                    })
                    .catch(err => {
                        console.error('Empty Block: ', err.message);
                    })
            }
            return;
        })
        .catch(err => {
            console.error('Error Getting Block Number: ', err.message);
        });
}

function updateTransactions() {
    return db.select().from('wallet_master') // Looking for pending ETH deposits
        .where('transaction_type', 'DEPOSIT')
        // .andWhere('currency', 'ETH')
        .andWhere('transaction_status', 'PENDING')
        .then(result => {
            if (result.length) {
                async.eachSeries(result, record => {
                    console.log(record.trx_hash);
                    var amountInCrx = Number(record.eth_deposit) * ETHtoCRXrate; // Calculating amount in CRX token
                    getTransactionStatus(record.trx_hash) // Getting trx status
                        .then(stat => {
                            console.log(stat);
                            return db('wallet_master') // Updating the status
                                .where('trx_hash', record.trx_hash)
                                .update({
                                    'transaction_status': stat,
                                    // 'crx_amount': amountInCrx
                                })
                                .then(success => {
                                    return success;
                                    // db.select().from('tbl_walletinfo') // Getting the wallet balance info
                                    //     .where('id', record.wallet_id)
                                    //     .then(wallets => {
                                    //         if (wallets.length) {
                                    //             var balance = Number(wallets[0].crx_balance);
                                    //             db('tbl_walletinfo') // Updating wallet balance
                                    //                 .where('id', record.wallet_id)
                                    //                 .update('crx_balance', balance + amountInCrx)
                                    //                 .then(success => {
                                    //                     return success;
                                    //                 })
                                    //         }
                                    //     })
                                })
                                .catch(err => {
                                    return console.error(err.message)
                                })
                        })
                        .catch(err => {
                            return console.error(err.message)
                        })
                });
            } else {
                return console.log('No Transaction to Update')
            }
        })
}

module.exports = {
    // getAllTransactions: getAllTransactions,
    // updateTransactions: updateTransactions,
    getethAddress: getethAddress
};