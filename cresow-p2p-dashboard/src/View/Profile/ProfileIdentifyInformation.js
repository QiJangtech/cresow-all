import React, { Component } from 'react';
import Box from '../../Components/Box/Box'
import BoxHeader from '../../Components/Box/BoxHeader';
import BoxTools from '../../Components/Box/BoxTools'
import BoxBody from '../../Components/Box/BoxBody';
import Form from '../../Components/Form/Form';
import FormInput from '../../Components/Form/FormInput';

export default class ProfileIdentifyDocument extends Component {
    constructor(props) {
		super(props);
		this.state = {
			fullName: '',
            documentNumber: '',
            identifyFrontDocument: '',
            identifyBackDocument: '',
            residentialAddressDocument: '',
            FaceIdDocument: '',
        };
        this.handleDocumentNumber = this.handleDocumentNumber.bind(this);
        this.handleFullNameInput = this.handleFullNameInput.bind(this);
        this.handleIdentifyFrontDocument = this.handleIdentifyFrontDocument.bind(this);
        this.handleIdentifyBackDocument = this.handleIdentifyBackDocument.bind(this);
        this.handleResidentialAddressDocument = this.handleResidentialAddressDocument.bind(this);
        this.handleFaceIdDocument = this.handleFaceIdDocument.bind(this);
    }

    handleFullNameInput(e){
        this.setState({ fullName : e.target.value }, () => console.log('Full Name', this.state.fullName))
    }
    handleDocumentNumber(e){
        this.setState({ documentNumber : e.target.value }, () => console.log('Document Number', this.state.documentNumber))
    }
    handleIdentifyFrontDocument(e){
        this.setState({ identifyFrontDocument : e.target.value }, () => console.log('Front Document', this.state.identifyFrontDocument))
    }
    handleIdentifyBackDocument(e){
        this.setState({ identifyBackDocument : e.target.value }, () => console.log('Back Document', this.state.identifyBackDocument))
    }
    handleResidentialAddressDocument(e){
        this.setState({ residentialAddressDocument : e.target.value }, () => console.log('Address Document', this.state.residentialAddressDocument))
    }
    handleFaceIdDocument(e){
        this.setState({ FaceIdDocument : e.target.value }, () => console.log('Face Document', this.state.FaceIdDocument))
    }
    
    render(){
        return(
            <Box boxType="box">
                <BoxHeader title="Identify Verification">
                    <BoxTools position="right">
                        <button type="button" className="btn btn-tool-box" data-widget="collapse">
                            <i className="fa fa-minus"></i>
                        </button>
                    </BoxTools>
                </BoxHeader>
                <BoxBody>
                    <Form>
                        <div className="row">
                            <div className="col-md-6">
                                <FormInput
                                    label="Identify Document Number"
                                    type="text"
                                    class="form-control"
                                    name="documentNumber"
                                    id="document-number"
                                    placeholder="Input National ID, passport, or driving license number"
                                    labelColClass="col-sm-12"
                                    inputColClass="col-sm-12"
                                    onChange={this.handleDocumentNumber}
                                />
                            </div>
                            <div className="col-md-6">
                                <FormInput
                                    label="Full Name"
                                    type="text"
                                    class="form-control"
                                    name="fullName"
                                    id="full-name"
                                    placeholder="Your full name as displayed on your identity document"
                                    labelColClass="col-sm-12"
                                    inputColClass="col-sm-12"
                                    onChange={this.handleFullNameInput}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="control-label col-sm-12" htmlFor="file-front-side">Identify Document</label>                                                                    
                                </div>
                            </div>
                            <div className="col-md-6">
                                <FormInput
                                    type="file"
                                    name="fileFrontSide"
                                    id="file-front-side"
                                    labelColClass="col-sm-12"
                                    inputColClass="col-sm-12"
                                    onChange={this.handleIdentifyFrontDocument}
                                    additional={
                                        <div>
                                            <p className="help-block">Upload your front-side document*</p>
                                            <p className="help-block">*Image size less than 4MB</p>
                                            <p className="help-block">*Format (*.jpg, *.jpeg, .*png, *.gif)</p>
                                        </div>
                                    }
                                />
                                </div>
                                <div className="col-md-6">
                                <FormInput
                                    type="file"
                                    name="fileBackSide"
                                    id="file-back-side"
                                    labelColClass="col-sm-12"
                                    inputColClass="col-sm-12"
                                    onChange={this.handleIdentifyBackDocument}
                                    additional={
                                        <div>
                                            <p className="help-block">Upload your front-side document*</p>
                                            <p className="help-block">*Image size less than 4MB</p>
                                            <p className="help-block">*Format (*.jpg, *.jpeg, .*png, *.gif)</p>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="control-label col-sm-12" htmlFor="file-residential-address">Proof of Residential Address</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="col-sm-9">
                                        <p>A recent proof of residential address document should clearly show the following:</p>
                                        <ul>
                                            <li>Full name (matching your identity document), and</li>
                                            <li>Residential address, and</li>
                                            <li>The date of issue (not older than 3 months)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <FormInput
                                    type="file"
                                    name="fileRfesidentialAddress"
                                    id="file-residential-address"
                                    labelColClass="col-sm-12"
                                    inputColClass="col-sm-12"
                                    onChange={this.handleResidentialAddressDocument}
                                    additional={
                                        <div>
                                            <p className="help-block">*Image size less than 4MB</p>
                                            <p className="help-block">*Format (*.jpg, *.jpeg, .*png, *.gif)</p>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="control-label col-sm-12" htmlFor="file-face-id">Picture of your face and ID</label>                                            
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="col-sm-9">
                                        <p>Picture with your face and holding your Identity document.</p>
                                        <ul>
                                            <li>Your face image without wearing any sunglasses, or cap.</li>
                                            <li>Identity document you provide from previous step.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <FormInput
                                    type="file"
                                    name="fileFaceId"
                                    id="file-face-id"
                                    labelColClass="col-sm-12"
                                    inputColClass="col-sm-12"
                                    onChange={this.handleFaceIdDocument}
                                    additional={
                                        <div>
                                            <p className="help-block">*Image size less than 4MB</p>
                                            <p className="help-block">*Format (*.jpg, *.jpeg, .*png, *.gif)</p>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </Form>
                </BoxBody>
            </Box>
        )
    }
}