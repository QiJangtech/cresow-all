import React, { Component } from 'react';
import Form from '../../Components/Form/Form';
import FormInput from '../../Components/Form/FormInput';
import FormRadio from '../../Components/Form/FormRadio';
import FormSelect from '../../Components/Form/FormSelect';
import FormSwitch from '../../Components/Form/FormSwitch';
import FormText from '../../Components/Form/FormText';

class BuyAdvertisement extends Component {
    constructor(props) {
		super(props);
		this.state = {
			buyBankNameSelection: '',
			buyTuningPercentInput: '',
			buyTuningPercentAdditional: 'Market Price 0%',
			buyMaximumPriceInput: '',
			buyTotalETHInput: '',
			buyMinimumETHInput: '',
            buyAutoTuningSwitch: false,
            buyWalletRadio: '',
            buyCresowWalletInput: '',
            buyOtherWalletInput: '',
        };
        
        this.handleBuyBankNameSelect = this.handleBuyBankNameSelect.bind(this);
        this.handleBuyTuningPercentInput = this.handleBuyTuningPercentInput.bind(this);
        this.handleBuyTuningPercentButtonClick = this.handleBuyTuningPercentButtonClick.bind(this);
        this.handleBuyMaximumPriceInput = this.handleBuyMaximumPriceInput.bind(this);
        this.handleBuyMaximumPriceButtonClick = this.handleBuyMaximumPriceButtonClick.bind(this);
        this.handleBuyTotalETHInput = this.handleBuyTotalETHInput.bind(this);
        this.handleBuyTotalETHButtonClick = this.handleBuyTotalETHButtonClick.bind(this);
        this.handleBuyMinimumETHInput = this.handleBuyMinimumETHInput.bind(this);
        this.handleBuyMinimumETHButtonClick = this.handleBuyMinimumETHButtonClick.bind(this);
        this.handleBuyAutoTuningSwitchToggled = this.handleBuyAutoTuningSwitchToggled.bind(this);
        this.handleBuyWalletRadioChange = this.handleBuyWalletRadioChange.bind(this);
        this.handleBuyCresowWalletAddressInput = this.handleBuyCresowWalletAddressInput.bind(this);
        this.handleBuyOtherWalletAddressInput = this.handleBuyOtherWalletAddressInput.bind(this);
	}
    handleBuyBankNameSelect(e) {
		this.setState({ buyBankNameSelection: e.target.value }, () => console.log('Bank Name', this.state.buyBankNameSelection));
    }
    handleBuyTuningPercentInput(e) {
        this.setState({ buyTuningPercentInput: e.target.value, buyTuningPercentAdditional: 'Market Price '+e.target.value+'%' }, () => console.log('Tuning Percent', this.state.buyTuningPercentInput));
    }
    handleBuyTuningPercentButtonClick(e) {
        e.preventDefault();
		alert('Tuning Percent ' +  this.state.buyTuningPercentInput);
    }
    handleBuyMaximumPriceInput(e) {
		this.setState({ buyMaximumPriceInput: e.target.value }, () => console.log('Maximum Price', this.state.buyMaximumPriceInput));
    }
    handleBuyMaximumPriceButtonClick(e) {
        e.preventDefault();
		alert('Maximum Price ' + this.state.buyMaximumPriceInput);
    }
    handleBuyTotalETHInput(e) {
		this.setState({ buyTotalETHInput: e.target.value }, () => console.log('Total ETH', this.state.buyTotalETHInput));
    }
    handleBuyTotalETHButtonClick(e) {
        e.preventDefault();
		alert('Total ETH ' + this.state.buyTotalETHInput);
    }
    handleBuyMinimumETHInput(e) {
		this.setState({ buyMinimumETHInput: e.target.value }, () => console.log('Minimum ETH', this.state.buyMinimumETHInput));
    }
    handleBuyMinimumETHButtonClick(e) {
        e.preventDefault();
		alert('Minimum ETH ' + this.state.buyMinimumETHInput);
    }
    handleBuyAutoTuningSwitchToggled(e) {
		this.setState({ buyAutoTuningSwitch: !this.state.buyAutoTuningSwitch }, () => console.log('Auto Tuning', this.state.buyAutoTuningSwitch));
    }
    handleBuyWalletRadioChange(e) {
		this.setState({ buyWalletRadio: e.target.value }, () => console.log('Wallet Address', this.state.buyWalletRadio));
    }
    handleBuyCresowWalletAddressInput(e) {
		this.setState({ buyCresowWalletInput: e.target.value }, () => console.log('Cresow Wallet Address', this.state.buyCresowWalletInput));
    }
    handleBuyOtherWalletAddressInput(e) {
		this.setState({ buyOtherWalletInput: e.target.value }, () => console.log('Other Wallet Address', this.state.buyOtherWalletInput));
    }
    render() {
        return(
            <Form class="form-horizontal">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Pricing</h3>
                        <FormText 
                            label="Current Price"
                            text="316.46 SGD/ETH"
                            tooltip="The actual market price"
                        />
                        <FormSwitch
                            label="Auto Tuning Price"
                            switchStatus={this.state.buyAutoTuningSwitch}
                            onText="Enabled"
                            offText="Disabled"
                            onSwitchToggled={this.handleBuyAutoTuningSwitchToggled}
                        />
                        { 
                            this.state.buyAutoTuningSwitch && (
                                <FormInput
                                    label="Tuning Percent"
                                    type="number"
                                    class="form-control"
                                    name="tuningPercent"
                                    id="tuning-percent"
                                    placeholder="Tuning Percent"
                                    labelColClass="col-sm-3"
                                    inputColClass="col-sm-6"
                                    onChange={this.handleBuyTuningPercentInput}
                                    backAddon="%"
                                    buttonText="Apply"
                                    onButtonClick={this.handleBuyTuningPercentButtonClick}
                                    additional={
                                        <p className="help-block">{this.state.buyTuningPercentAdditional}</p>
                                    }
                                />
                            )
                        }
                        
                        <FormInput
                            label="Maximum Price"
                            type="number"
                            class="form-control"
                            name="macimumPrice"
                            id="maximum-price"
                            placeholder="Maximum Price"
                            labelColClass="col-sm-3"
                            inputColClass="col-sm-6"
                            onChange={this.handleBuyMaximumPriceInput}
                            backAddon="SGD/ETH"
                            buttonText="Apply"
                            onButtonClick={this.handleBuyMaximumPriceButtonClick}
                        />

                        <h3>Limitation</h3>
                        <FormInput
                            label="Total ETH to buy"
                            type="number"
                            class="form-control"
                            name="totalETH"
                            id="total-eth"
                            placeholder="Total ETH"
                            labelColClass="col-sm-3"
                            inputColClass="col-sm-6"
                            onChange={this.handleBuyTotalETHInput}
                            backAddon="ETH"
                            buttonText="Apply"
                            onButtonClick={this.handleBuyTotalETHButtonClick}
                            additional={
                                <div>
                                    <span className="help-block">Actual Buy</span>
                                    <p className="help-block">31.68000000 ETH</p>
                                    <span className="help-block">Crescow Fee</span>
                                    <p className="help-block">0.32000000 ETH</p>
                                </div>
                            }
                        />
                        <FormInput
                            label="Minimum ETH Amount"
                            type="number"
                            class="form-control"
                            name="minimumETH"
                            id="minimum-eth"
                            placeholder="Minimum ETH"
                            labelColClass="col-sm-3"
                            inputColClass="col-sm-6"
                            onChange={this.handleBuyMinimumETHInput}
                            backAddon="ETH"
                            buttonText="Apply"
                            onButtonClick={this.handleBuyMinimumETHButtonClick}
                            additional={
                                    <p className="help-block">Minimum 0.01 ETH</p>
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <h3>Bank Details</h3>
                        <FormSelect
                            label="Bank Name"
                            name="bankName"
                            placeholder="- Select -"
                            options={[
                                {"value":"1", "text":"one"},
                                {"value":"2", "text":"two"},
                                {"value":"3", "text":"three"}
                            ]}
                            onChange={this.handleBuyBankNameSelect} />
                        <h3>ETH Wallet Address</h3>
                        <FormRadio
                            onChange={this.handleBuyWalletRadioChange}
                            radioName="options"
                            radios={[
                                {"id" : "optionsRadio1", "value" : "Cresow", "text" : "Cresow Wallet Address"},
                                {"id" : "optionsRadio2", "value" : "Other", "text" : "Other Wallet Address"},
                            ]}
                        />
                        {this.state.buyWalletRadio === "Cresow" && (
                            <FormInput
                                type="text"
                                class="form-control"
                                name="BankAccountNumber"
                                id="cresow-wallet-address"
                                placeholder="Cresow Wallet Address"
                                inputColClass="col-sm-12"
                                onChange={this.handleBuyCresowWalletAddressInput}
                            />
                        )}
                        {this.state.buyWalletRadio === "Other" && (
                            <FormInput
                                type="text"
                                class="form-control"
                                name="otherWalletAddress"
                                id="other-wallet-address"
                                placeholder="Other Wallet Address"
                                inputColClass="col-sm-12"
                                onChange={this.handleBuyOtherWalletAddressInput}
                            />
                        )}
                    </div>
                </div>
            </Form>
        )
    }
}

export default BuyAdvertisement;