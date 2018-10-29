import React, { Component } from 'react';

//Component
import Box from '../../Components/Box/Box';
import BoxHeader from '../../Components/Box/BoxHeader';
import BoxBody from '../../Components/Box/BoxBody';
import Form from '../../Components/Form/Form';
import FormInput from '../../Components/Form/FormInput';
import ReactTooltip from 'react-tooltip'

export default class WalletBalance extends Component {  
    constructor(props) {
        super(props);
        this.state= {
            withdrawAmount: '',
            walletAddress: '',
            data: {
              recentTransaction : this.props.recentTransaction,
            }
        };
        this.handleWithdrawAmountInput = this.handleWithdrawAmountInput.bind(this);        
        this.handleWalletAddressInput = this.handleWalletAddressInput.bind(this);
    }

    handleWithdrawAmountInput(e) {
		this.setState({ withdrawAmount: e.target.value }, () => console.log('Amount', this.state.withdrawAmount));
    }
    handleWalletAddressInput(e) {
		this.setState({ walletAddress: e.target.value }, () => console.log('Wallet Address', this.state.walletAddress));
    }

    render() {
        return (
            <Box boxType="box">
                <BoxHeader title="Wallet Balance" />
                <BoxBody>
                    <Form class="form-horizontal">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="control-label col-md-6">
                                        Your Balance
                                    </label>
                                    <div className="col-md-6">
                                        <p>0.0000000<span>ETH</span></p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-md-6">
                                        Available Withdraw
                                        <span className="form-tooltip" data-tip="Available Withdraw">
                                            <i className="fa fa-exclamation-circle"></i>
                                            <ReactTooltip />
                                        </span>
                                    </label>
                                    <div className="col-md-6">
                                        <p>0.0000000<span>ETH</span></p>
                                    </div>
                                </div>
                                <FormInput
                                    label="Withdraw Amount"
                                    type="number"
                                    class="form-control"
                                    name="withdrawAmount"
                                    id="withdraw-amount"
                                    labelColClass="col-sm-6"
                                    inputColClass="col-sm-6"
                                    tooltip="Amount"
                                    onChange={this.handleWithdrawAmountInput}
                                />
                                <FormInput
                                    type="text"
                                    class="form-control"
                                    name="waletAddress"
                                    id="walet-address"
                                    placeholder="Your Walet Address"
                                    labelColClass="col-sm-12"
                                    inputColClass="col-sm-12"
                                    additional="Enter your wallet address"
                                    onChange={this.handleWalletAddressInput}
                                />
                            </div>
                        </div>
                    </Form>
                </BoxBody>
            </Box>
        );
    }
}