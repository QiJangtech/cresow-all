import React, { Component } from 'react';
import Form from '../../Components/Form/Form';
import FormInput from '../../Components/Form/FormInput';
import FormSelect from '../../Components/Form/FormSelect';
import FormSwitch from '../../Components/Form/FormSwitch';
import FormText from '../../Components/Form/FormText';

class SellAdvertisement extends Component {
    constructor(props) {
		super(props);
		this.state = {
            sellBankNameSelection: '',
			sellTuningPercentInput: '',
			sellTuningPercentAdditional: 'Market Price 0%',
			sellMaximumPriceInput: '',
			sellTotalETHInput: '',
			sellMinimumETHInput: '',
            sellAutoTuningSwitch: false,
            sellBankAccountNumberInput: '',
            sellBankAccountNameInput: '',
        };

        this.handleSellBankNameSelect = this.handleSellBankNameSelect.bind(this);
        this.handleSellTuningPercentInput = this.handleSellTuningPercentInput.bind(this);
        this.handleSellTuningPercentButtonClick = this.handleSellTuningPercentButtonClick.bind(this);
        this.handleSellMaximumPriceInput = this.handleSellMaximumPriceInput.bind(this);
        this.handleSellMaximumPriceButtonClick = this.handleSellMaximumPriceButtonClick.bind(this);
        this.handleSellTotalETHInput = this.handleSellTotalETHInput.bind(this);
        this.handleSellTotalETHButtonClick = this.handleSellTotalETHButtonClick.bind(this);
        this.handleSellMinimumETHInput = this.handleSellMinimumETHInput.bind(this);
        this.handleSellMinimumETHButtonClick = this.handleSellMinimumETHButtonClick.bind(this);
        this.handleSellAutoTuningSwitchToggled = this.handleSellAutoTuningSwitchToggled.bind(this);
        this.handleSellBankAccountNumberInput = this.handleSellBankAccountNumberInput.bind(this);
        this.handleSellBankAccountNameInput = this.handleSellBankAccountNameInput.bind(this);
	}

    handleSellBankNameSelect(e) {
		this.setState({ sellBankNameSelection: e.target.value }, () => console.log('Bank Name', this.state.sellBankNameSelection));
    }
    handleSellTuningPercentInput(e) {
        this.setState({ sellTuningPercentInput: e.target.value, sellTuningPercentAdditional: 'Market Price '+e.target.value+'%' }, () => console.log('Tuning Percent', this.state.sellTuningPercentInput));
    }
    handleSellTuningPercentButtonClick(e) {
        e.preventDefault();
		alert('Tuning Percent ' +  this.state.sellTuningPercentInput);
    }
    handleSellMaximumPriceInput(e) {
		this.setState({ sellMaximumPriceInput: e.target.value }, () => console.log('Maximum Price', this.state.sellMaximumPriceInput));
    }
    handleSellMaximumPriceButtonClick(e) {
        e.preventDefault();
		alert('Maximum Price ' + this.state.sellMaximumPriceInput);
    }
    handleSellTotalETHInput(e) {
		this.setState({ sellTotalETHInput: e.target.value }, () => console.log('Total ETH', this.state.sellTotalETHInput));
    }
    handleSellTotalETHButtonClick(e) {
        e.preventDefault();
		alert('Total ETH ' + this.state.sellTotalETHInput);
    }
    handleSellMinimumETHInput(e) {
		this.setState({ sellMinimumETHInput: e.target.value }, () => console.log('Minimum ETH', this.state.sellMinimumETHInput));
    }
    handleSellMinimumETHButtonClick(e) {
        e.preventDefault();
		alert('Minimum ETH ' + this.state.sellMinimumETHInput);
    }
    handleSellAutoTuningSwitchToggled(e) {
		this.setState({ sellAutoTuningSwitch: !this.state.sellAutoTuningSwitch }, () => console.log('Auto Tuning', this.state.sellAutoTuningSwitch));
    }
    handleSellBankAccountNumberInput(e) {
		this.setState({ sellBankAccountNumberInput: e.target.value }, () => console.log('Bank Account Number', this.state.sellBankAccountNumberInput));
    }
    handleSellBankAccountNameInput(e) {
		this.setState({ sellBankAccountNameInput: e.target.value }, () => console.log('Bank Account Name', this.state.sellBankAccountNameInput));
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
                            switchStatus={this.state.sellAutoTuningSwitch}
                            onText="Enabled"
                            offText="Disabled"
                            onSwitchToggled={this.handleSellAutoTuningSwitchToggled}
                        />
                        { 
                            this.state.sellAutoTuningSwitch && (
                                <FormInput
                                    label="Tuning Percent"
                                    type="number"
                                    class="form-control"
                                    name="tuningPercent"
                                    id="tuning-percent"
                                    placeholder="Tuning Percent"
                                    labelColClass="col-sm-3"
                                    inputColClass="col-sm-6"
                                    onChange={this.handleSellTuningPercentInput}
                                    backAddon="%"
                                    buttonText="Apply"
                                    onButtonClick={this.handleSellTuningPercentButtonClick}
                                    additional={
                                        <p className="help-block">{this.state.sellTuningPercentAdditional}</p>
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
                            onChange={this.handleSellMaximumPriceInput}
                            backAddon="SGD/ETH"
                            buttonText="Apply"
                            onButtonClick={this.handleSellMaximumPriceButtonClick}
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
                            onChange={this.handleSellTotalETHInput}
                            backAddon="ETH"
                            buttonText="Apply"
                            onButtonClick={this.handleSellTotalETHButtonClick}
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
                            onChange={this.handleSellMinimumETHInput}
                            backAddon="ETH"
                            buttonText="Apply"
                            onButtonClick={this.handleSellMinimumETHButtonClick}
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
                            onChange={this.handleSellBankNameSelect} />
                        <FormInput
                            type="text"
                            class="form-control"
                            name="bankAccountNumber"
                            id="bank-account-number"
                            placeholder="Bank Account Number"
                            inputColClass="col-sm-12"
                            onChange={this.handleSellBankAccountNumberInput}
                        />
                        <FormInput
                            type="text"
                            class="form-control"
                            name="bankAccountName"
                            id="bank-account-name"
                            placeholder="Bank Account Name"
                            inputColClass="col-sm-12"
                            onChange={this.handleSellBankAccountNameInput}
                        />
                    </div>
                </div>
            </Form>
        )
    }
}

export default SellAdvertisement;