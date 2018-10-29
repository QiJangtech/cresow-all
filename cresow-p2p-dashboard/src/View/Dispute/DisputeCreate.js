import React, { Component } from 'react';

//Component
import Content from '../../Components/Content/Content';
import ContentHeader from '../../Components/Content/ContentHeader';
import ContentBody from '../../Components/Content/ContentBody';
import Box from '../../Components/Box/Box';
import BoxHeader from '../../Components/Box/BoxHeader';
import BoxBody from '../../Components/Box/BoxBody';
import Form from '../../Components/Form/Form';
import FormInput from '../../Components/Form/FormInput';
import FormRadio from '../../Components/Form/FormRadio';
import FormTextarea from '../../Components/Form/FormTextarea';

import './Dispute.scss'


class DisputeCreate extends Component {
    constructor(props) {
		super(props);
		this.state = {
			disputeEmailAddressInput: '',
			disputePasswordInput: '',
			disputeFileInput: '',
			disputeCategoryRadio: '',
			disputeSubjectInput: '',
			disputeDescriptionInput: '',
        };
        
        this.handleDisputeEmailAddressInput = this.handleDisputeEmailAddressInput.bind(this);
        this.handleDisputePasswordInput = this.handleDisputePasswordInput.bind(this);
        this.handleDisputeFileInput = this.handleDisputeFileInput.bind(this);
        this.handleDisputeCategoryRadioChange = this.handleDisputeCategoryRadioChange.bind(this);
        this.handleDisputeSubjectInput = this.handleDisputeSubjectInput.bind(this);
        this.handleDisputeDescriptionInput = this.handleDisputeDescriptionInput.bind(this);
    }
    handleDisputeEmailAddressInput(e) {
		this.setState({ disputeEmailAddressInput: e.target.value }, () => console.log('Email Address', this.state.disputeEmailAddressInput));
    }
    handleDisputePasswordInput(e) {
		this.setState({ disputePasswordInput: e.target.value }, () => console.log('Password', this.state.disputePasswordInput));
    }
    handleDisputeFileInput(e) {
		this.setState({ disputeFileInput: e.target.value }, () => console.log('File', this.state.disputeFileInput));
    }
    handleDisputeCategoryRadioChange(e) {
		this.setState({ disputeCategoryRadio: e.target.value }, () => console.log('Category', this.state.disputeCategoryRadio));
    }
    handleDisputeSubjectInput(e) {
		this.setState({ disputeSubjectInput: e.target.value }, () => console.log('Subject', this.state.disputeSubjectInput));
    }
    handleDisputeDescriptionInput(e) {
		this.setState({ disputeDescriptionInput: e.target.value }, () => console.log('Description', this.state.disputeDescriptionInput));
    }
    render() {
        return (
            <div>
                <Content>
                    <ContentHeader section="dispute-header content">
                        <div className="row">
                            <div className="col-md-6 col-xs-12 column-header">                
                                <h3>Create New Ticket</h3>
                            </div>
                        </div>
                    </ContentHeader>
                    <ContentBody
                        section="dispute-body content"
                        row="row"
                        column="col-md-12 column-body">
                        <Box boxType="box">
                            <BoxHeader>
                                <h3 className="box-title">Select Ticket Category</h3>
                            </BoxHeader>
                            <BoxBody>
                                <Form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormInput
                                                label="Email Address"
                                                type="text"
                                                class="form-control"
                                                name="emailAddress"
                                                id="email-address"
                                                placeholder="Email Address"
                                                labelColClass="col-sm-12"
                                                inputColClass="col-sm-12"
                                                onChange={this.handleDisputeEmailAddressInput}
                                            />
                                            <FormInput
                                                label="Password"
                                                type="password"
                                                class="form-control"
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                labelColClass="col-sm-12"
                                                inputColClass="col-sm-12"
                                                onChange={this.handleDisputePasswordInput}
                                            />
                                            <FormInput
                                                label="Input Files"
                                                type="file"
                                                name="file"
                                                id="file"
                                                labelColClass="col-sm-12"
                                                inputColClass="col-sm-12"
                                                onChange={this.handleDisputeFileInput}
                                                additional={
                                                    <div>
                                                        <p className="help-block">*Image or Document size less than 4MB</p>
                                                        <p className="help-block">*Format (*.jpg, *.jpeg, .*png, *.gif, *.pdf, *.doc)</p>
                                                    </div>
                                                }
                                            />
                                            <FormRadio
                                                label="Select Category"
                                                onChange={this.handleDisputeCategoryRadioChange}
                                                radioName="category"
                                                radios={[
                                                    {"id" : "disputeCategory1", "value" : "Technical Support", "text" : "Technical Support"},
                                                    {"id" : "disputeCategory2", "value" : "Sales & Billing", "text" : "Sales & Billing"},
                                                    {"id" : "disputeCategory3", "value" : "Transactions", "text" : "Transactions"},
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <FormInput
                                                label="Subject"
                                                type="text"
                                                class="form-control"
                                                name="subject"
                                                id="subject"
                                                placeholder="Subject"
                                                labelColClass="col-sm-12"
                                                inputColClass="col-sm-12"
                                                onChange={this.handleDisputeSubjectInput}
                                            />
                                            <FormTextarea
                                                label="Description"
                                                class="form-control"
                                                row="3"
                                                placeholder="Description"
                                                onChange={this.handleDisputeDescriptionInput}
                                            />
                                        </div>
                                    </div>
                                </Form>
                            </BoxBody>
                        </Box>
                    </ContentBody>
                </Content>
            </div>
        );
    }
}

export default DisputeCreate;
