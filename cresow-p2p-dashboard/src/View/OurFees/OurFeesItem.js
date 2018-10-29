import React, { Component } from 'react';
import BoxBody from '../../Components/Box/BoxBody';
import axios from 'axios';


class OurFeesItem extends Component {
    state = {
        isLoaded: false
    }

    async componentWillMount() {
        await axios.get('https://enolol12g9.execute-api.us-east-1.amazonaws.com/dev/getFeesInfo')
        .then(res => {
          const data = res.data;
          this.setState({ 
            transactionFee: data.transaction_fee,
            depositFee: data.deposit_fee,
            withdrawalFee: data.withdrawal_fee,
            isLoaded: true
          })
        })
        .catch(error => alert('please try again'))
    }

    render(){
        return(
            <BoxBody>
                { this.state.isLoaded ? 
                    <div className="our-fees-content">
                        <div>
                            <h3>Fee For Transaction</h3>
                            <span className="our-fees-item-desc">Buyer and Seller will be charged {this.state.transactionFee}% ETH processing fee whichever is higher for any transaction.</span>
                        </div>
                        <div>
                            <h3>Fee For Deposit</h3>
                            <span className="our-fees-item-desc">{this.state.depositFee}</span>
                        </div>
                        <div>
                            <h3>Fee For Withdrawal</h3>
                            <span className="our-fees-item-desc">{this.state.withdrawalFee}</span>
                        </div>
                        <div>
                            <h3>Fee Transaction</h3>
                            <span className="our-fees-item-desc">This is the standard transaction fee paid to miners to verify transactions. We can identify your wallet type based on the wallet address.<br/>
                                - Normal Wallet Address – Wallets such as prepared by Exqube, Metamask, Myether Wallet are standard wallets with no contract.<br/>
                                We will use the standard gas fee with 21,000 gas to send the transaction.<br/><br/>

                                Contractual Wallet Address.<br/>

                                Wallets from Exchanges like Binance, Bittrex, ICOs or others which are not mentioned would require a much higher gas fee and gas limit to send.<br/>
                                We will adjust the gas limit from time to time based on traffic.<br/><br/>

                                We strongly advice user to use non-contractual wallet address to lower the transaction fee which may occur.
                            </span>
                        </div>
                    </div>
                : '' }
            </BoxBody>
        )
    }
}

export default OurFeesItem;