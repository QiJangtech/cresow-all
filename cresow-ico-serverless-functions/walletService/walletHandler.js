const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mysql = require('mysql');
const querystring = require('querystring');
const http = require('http');
var request=require('request');
var crypto = require('crypto-price')
var cors = require('cors');

const WALLET_INFO_TABLE = "tbl_walletinfo";
const WALLET_INFO_HISTORY_TABLE = "tbl_walletinfohistory";

// ----------- Model -------------------
var connection = mysql.createConnection({
    host: 'skus-storage.crnrqk57qmx5.ap-southeast-1.rds.amazonaws.com',
    user: 'cresowadmin',
    password: 'cresow$admin',
    database: 'cresowdb'
});
connection.connect(function (err) {
    if (err) throw err;
});

function getWalletById(id, result) {
    connection.query("Select * from " + WALLET_INFO_TABLE + " where wallet_id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

  
  // This should work both there and elsewhere.
  function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }
function getWithdrawalById(id, result) {
    console.log(id)
    connection.query("Select * from " + WALLET_INFO_HISTORY_TABLE + " where wallet_id = '" + id + "' AND transaction_type='WITHDRAWAL' ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

function getDepositById(id, result) {
    connection.query("Select * from " + WALLET_INFO_HISTORY_TABLE + " where id = '" + id + "' ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

function getDepositList(walletId, result) {
    connection.query("Select * from " + WALLET_INFO_HISTORY_TABLE + " where transaction_type ='DEPOSIT' AND wallet_id=? ", walletId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

function getWithdrawalList(walletId, result) {
    connection.query("Select * from " + WALLET_INFO_HISTORY_TABLE + " where transaction_type = 'WITHDRAWAL' AND wallet_id=? ", walletId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

function checkWalletExists(eth_address, result) {
    connection.query("Select * from " + WALLET_INFO_TABLE + " where eth_public_key = '"+eth_address+"' LIMIT 1", function (err, res,fields) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
               else {
            result(null, res);
        }
    });
};

function createWallet(newWallet, result) {
    connection.query("INSERT INTO " + WALLET_INFO_TABLE + " set ?", newWallet, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

function add_public_key(publicKeys, result) {
    var btc = publicKeys.btc_public_key;
    var eth = publicKeys.eth_public_key;
    if (typeof btc === 'undefined') {
        btc = 'NULL';
    }
    else if (typeof eth === 'undefined') {
        var eth = 'NULL';
    }
    connection.query("UPDATE " + WALLET_INFO_TABLE + " set btc_public_key='" + btc + "',eth_public_key='" + eth + "',lm_time='" + publicKeys.lm_time + "'WHERE id=" + publicKeys.wallet_id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.affectedRows);
            result(null, res.affectedRows + " record(s) updated");
        }
    });
}

function createDeposit(newDeposit, result) {
    connection.query("INSERT INTO " + WALLET_INFO_HISTORY_TABLE + " set ?", newDeposit, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

function createWithdrawal(newWithdrawal, result) {
    connection.query("INSERT INTO " + WALLET_INFO_HISTORY_TABLE + " set ?", newWithdrawal, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

//update deposit withdrawal api incomplete not sure if using api or directly from cron. 
function updateDeposit(deposit, result) {
    connection.query("UPDATE " + WALLET_INFO_HISTORY_TABLE + " set status='"+deposit.status+"',trx_hash='"+deposit.trx_hash+"',lm_time='"+deposit.lm_time+"'  WHERE id='" + deposit.transaction_id + "'", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null)
        }
        else {
            console.log(res.affectedRows);
            result(null, res.affectedRows);
        }
    });
};

function updateWithdrawal(walletTransaction, result) {
    connection.query("UPDATE " + WALLET_INFO_HISTORY_TABLE + " set status='Completed' WHERE id='" + walletTransaction.transaction_id + "'", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null)
        }
        else {
            console.log(res.affectedRows);
            result(null, res.affectedRows);
        }
    });
};

function getTransactionHistoryById(userId, result) {
    console.log(userId);
    connection.query("SELECT * FROM " + WALLET_INFO_HISTORY_TABLE + " WHERE user_id=? ", userId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

// ----------- Controller ------------------
app.use(bodyParser.json({ strict: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(cors());
app.get('/crypto/:crypt', function (req, res) {
    crypto.getCryptoPrice("USD", req.params.crypt)
    .then(obj => {
    res.json({ message: obj.price });
    })
    .catch(err => {
    res.json({ error: err });
    })
})
// Get by walletId endpoint
app.get('/wallet/:walletId', function (req, res) {
    getWalletById(req.params.walletId, function (err, wallet) {
        if (err) {
            res.status(400).json({ error: 'Could not get wallet info' });
        } else {
            res.json({ wallet });
        }
    });
})

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.get('/wallet/depositInfo/:id', function (req, res) {
    getDepositById(req.params.id, function (err, wallet) {
        if (err) {
            res.status(400).json({ error: 'Could not get deposit info' });
        } else {
            res.json({ wallet });
        }
    });
})

app.get('/wallet/withdrawalInfo/:id', function (req, res) {
    getDepositById(req.params.id, function (err, wallet) {
        if (err) {
            res.status(400).json({ error: 'Could not get withdrawal info' });
        } else {
            res.json({ wallet });
        }
    });
})

//not working yet , small fix needed.
app.get('/wallet/deposit/:walletId', function (req, res) {
    getDepositList(req.params.walletId, function (err, transaction) {
        if (err) {
            res.status(400).json({ error: 'No deposits found' });
        } else {
            res.json({ deposits });
        }
    });
})

app.get('/wallet/withdrawal/:walletId', function (req, res) {
    getWithdrawalList(req.params.walletId, function (err, transaction) {
        if (err) {
            res.status(400).json({ error: 'No withdrawals found' });
        } else {
            res.json({ withdrawals });
        }
    });
})

// TODO test this
// Create wallet endpoint
app.post('/wallet/deposit', function (req, res) {
    var crx_public_key = null;
    var crx_private_key = null;
    const { userId,usd_amount,from_address,package,eth_amount,crx_token} = req.body;
    if(usd_amount<500)
    {
        res.status(400).json({ "error":"Minimum 500USD for deposit" });
            }
    var currency='ETH';
    const stage = '1';

    checkWalletExists(from_address,function(err,result)
    {
        if (err) {
            res.status(400).json({ err }); 
        }
        console.log(result);
        if (isEmptyObject(result)) {
            // There are no queries.
            var newWallet = {
                user_id: userId,
                crx_private_key: crx_private_key,
                crx_public_key: crx_public_key,
                crx_balance: '0',
                eth_public_key:from_address,
                btc_public_key:null,
                lm_time: new Date()
            }
            createWallet(newWallet, function (err, insertId) {
                if (err) {
                    res.status(400).json({ err });
                } else {
                    // res.json({ insertId });
                    var newDeposit = {
                        wallet_id: insertId,
                        user_id: userId,
                        currency: currency,
                        transaction_type: "DEPOSIT",
                        status: "PENDING",
                        confirmed: "N",
                        usd_amount:usd_amount,
                        package:package,
                        amount: eth_amount,
                        crx_amount: crx_token,
                        trx_hash: "",
                        from_address: from_address,
                        stage: stage,
                        requested_datetime: new Date(),
                        completed_datetime: new Date(),
                        lm_time: new Date()
                    }
                    createDeposit(newDeposit, function (err, insertId) {
                        if (err) {
                            res.status(400).json({ err });
                        } else {
                            res.json({ insertId });
                        }
                    });
                }
                
            });
          } else {
            // There is at least one query,
            // or at least the query object is not empty.
            var newDeposit = {
                wallet_id: result[0].id,
                user_id: userId,
                currency: currency,
                transaction_type: "DEPOSIT",
                status: "PENDING",
                confirmed: "N",
                usd_amount:usd_amount,
                package:package,
                amount: eth_amount,
                crx_amount: crx_token,
                trx_hash: "",
                from_address: from_address,
                stage: stage,
                requested_datetime: new Date(),
                completed_datetime: new Date(),
                lm_time: new Date()
            }
            createDeposit(newDeposit, function (err, insertId) {
                if (err) {
                    res.status(400).json({ err });
                } else {
                    res.json({ insertId });
                }
            });
          }
         
    });

    
})

app.put('/wallet', function (req, res) {
    const { walletId, btc_public_key, eth_public_key } = req.body;
    var params = {
        wallet_id: walletId,
        btc_public_key: btc_public_key,
        eth_public_key: eth_public_key,
        lm_time: new Date()
    }
    add_public_key(params, function (err, affectedRows) {
        if (err) {
            res.status(400).json({ err });
        } else {
            res.json({ affectedRows });
        }
    });
})
app.put('/wallet/completeDeposit', function (req, result) {
    const { transaction_id,trx_hash } = req.body;
    const status="COMPLETED";
    connection.query("Select * from " + WALLET_INFO_HISTORY_TABLE + " where id= '"+transaction_id+"' LIMIT 1", function (err, res,fields) {
        console.log(res);
        if (err) {
            console.log("error: ", err);
        }
               else {
           var crx_amount=res[0].crx_amount;
        //    console.log("crx:"+crx_amount);
            var params = {
                transaction_id:transaction_id,
                status:status,
                trx_hash:trx_hash,
                lm_time: new Date()
            }

            connection.query("UPDATE " + WALLET_INFO_TABLE + " set crx_balance='"+crx_amount+"' WHERE id='" + res[0].wallet_id + "'", function (err, res) {
                if (err) {
                    console.log("error: ", err);
                   
                }
                
            });
            updateDeposit(params, function (err, updateId) {
                if (err) {
                    res.status(400).json({ err });
                } else {
                
                    var json = {
                        "trader_id" : res[0].user_id,
                        "package": res[0].package,
                        "amount_usd": res[0].usd_amount,
                        "amount_eth" :res[0].amount
                      };
                   
                    var data = {
                        url:  'http://18.136.101.29/api/referral_records',
                        body: json,
                        json: true
                        
                    }
                   
                    request.post(data, function(error, httpResponse, body){
                        if(error){ console.log(error);}
                        if(body.status==true)
                        {
                            result.status(200).json(body);
                        }
                       

                    });
            
                }
            });
            

        }
    });
    
    
})

app.post('/wallet/withdrawal', function (req, res) {
    //front end params - (walletId,userId,currency, ,crx_amount,amount, trx_hash, from_address)
    const { walletId, userId, currency, crx_amount, amount, trx_hash, from_address } = req.body; //from front end walletID, userId, currency, transaction_type, amount
    const stage = '1';
    var newWithdrawal = {
        wallet_id: walletId,
        user_id: userId,
        currency: currency,
        transaction_type: "WITHDRAWAL",
        status: "PENDING",
        confirmed: "N",
        amount: amount,
        crx_amount: crx_amount,
        trx_hash: trx_hash,
        from_address: from_address,
        stage: stage,
        requested_datetime: new Date(),
        completed_datetime: new Date(),
        lm_time: new Date()
    }
    createDeposit(newWithdrawal, function (err, insertId) {
        if (err) {
            res.status(400).json({ err });
        } else {
            res.json({ insertId });
        }
    });
})

app.put('/wallet/deposit', function (req, res) {
    var param = { transaction_id: req.body.transaction_id };
    updateDeposit(param, function (err, affectedRows) {
        if (err) {
            res.status(400).json({ err });
        } else {
            res.json({ affectedRows });
        }
    });
})

app.put('/wallet/withdrawal', function (req, res) {
    var param = { transaction_id: req.body.transaction_id };
    updateWithdrawal(param, function (err, affectedRows) {
        if (err) {
            res.status(400).json({ err });
        } else {
            res.json({ affectedRows });
        }
    });
})

// get transaction history 
app.get('/wallet/transactionHistory/:id', function (req, res) {
    getTransactionHistoryById(req.params.id, function (err, transactioninfo) {
        if (err) {
            res.status(400).json({ error: 'Could not get transaction history' });
        } else {
            res.json({ transactioninfo });
        }
    });
})

// TODO create endpoint to get paginated wallets

// TODO create endpoint to update wallet

// TODO create endpoint to delete wallet

module.exports.handler = serverless(app);