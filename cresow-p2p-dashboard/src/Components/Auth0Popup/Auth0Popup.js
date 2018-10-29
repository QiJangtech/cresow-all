import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Auth0Popup.scss';

export default class CustomPopup extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {
                logo : this.props.logo,
                title : this.props.title,
                emailContent : this.props.emailContent,
                emailCodeContent : this.props.emailCodeContent,
                emailAlternativeText : this.props.emailAlternativeText,
                smsContent : this.props.smsContent,
                smsCodeContent : this.props.smsCodeContent,
                smsAlternativeText : this.props.smsAlternativeText,
                footer : this.props.footer,
            },
            error: '',
            emailValue: '',
            emailVerification: false,
            emailVerificationCode: '',
            smsForm: false,
            phoneNumberValue: '',
            phoneNumberVerification: false,
            phoneNumberVerificationCode: '',
        };
    }
    handleEmailValueChange(event) {
        this.setState({emailValue: event.target.value});
    }
    handlePhoneNumberValueChange(event) {
        this.setState({phoneNumberValue: event.target.value});
    }
    handleEmailVerificationCodeValueChange(event) {
        this.setState({emailVerificationCode: event.target.value});
    }
    handlePhoneNumberVerificationCodeValueChange(event) {
        this.setState({phoneNumberVerificationCode: event.target.value});
    }
    handleChangeToSmsForm(flag) {
        this.setState({
            error: '',
            smsForm: flag
        })
    }

    handleEmailValidation(){
        let formIsValid = true;

        if(!this.state.emailValue){
            formIsValid = false;
            this.setState({error: "Cannot be empty"});
        }
        
        if(typeof this.state.emailValue !== "undefined"){
            let lastAtPos = this.state.emailValue.lastIndexOf('@');
            let lastDotPos = this.state.emailValue.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.emailValue.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.emailValue.length - lastDotPos) > 2)) {
                formIsValid = false;
                this.setState({error: "Email is not valid"});
            }
        }  
        return formIsValid;
    }

    handleSmsValidation(){
        let formIsValid = true;

        if(!this.state.phoneNumberValue){
            formIsValid = false;
            this.setState({error: "Cannot be empty"});
        }else if(typeof this.state.phoneNumberValue !== "undefined"){

            if (isNaN(this.state.phoneNumberValue)) {
                formIsValid = false;
                this.setState({error: "Input must be numbers"});
            }
        }  
        return formIsValid;
    }

    handleFormBack() {
        this.setState({
            data:{
                logo : this.props.logo,
                title : this.props.title,
                emailContent : this.props.emailContent,
                emailCodeContent : this.props.emailCodeContent,
                emailAlternativeText : this.props.emailAlternativeText,
                smsContent : this.props.smsContent,
                smsCodeContent : this.props.smsCodeContent,
                smsAlternativeText : this.props.smsAlternativeText,
                footer : this.props.footer,
            },
            emailVerification : false,
            phoneNumberVerification : false,
            error: ''
        });
    }
    
    handleFormSubmit(event) {
        if(!this.state.smsForm){
            if(!this.state.emailVerification){
                if(this.handleEmailValidation()){
                    this.props.auth.passwordlessSendEmailCode(this.state.emailValue);
                    this.setState({
                        data:{
                            logo : this.props.logo,
                            title : this.props.title,
                            emailCodeContent : this.props.emailCodeContent,
                            footer : this.props.footer,
                        },
                        emailVerification : true,
                        error: ''
                    })
                }
            }else{
                this.props.auth.passwordlessVerifyEmailCode(this.state.emailValue, this.state.emailVerificationCode);
            }
        }else{
            if(!this.state.phoneNumberVerification){
                if(this.handleSmsValidation()){
                    this.props.auth.passwordlessSendSmsCode(this.state.phoneNumberValue);
                    this.setState({
                        data:{
                            logo : this.props.logo,
                            title : this.props.title,
                            smsCodeContent : this.props.smsCodeContent,
                            footer : this.props.footer,
                        },
                        phoneNumberVerification : true,
                        error: ''
                    })
                }
            }else{
                this.props.auth.passwordlessVerifySmsCode(this.state.phoneNumberValue, this.state.phoneNumberVerificationCode);
            }
        }
        event.preventDefault();
    }

    render(){
        return (
            <div className="modal fade in" id="modal-default">
                <div className="modal-content">
                    {
                        (this.state.emailVerification || this.state.phoneNumberVerification) && (
                            <button type="button" className="back" data-dismiss="modal" aria-label="Close" onClick={this.handleFormBack.bind(this)}>
                                <span aria-hidden="true"><i className="fa fa-arrow-left"></i></span>
                            </button>
                        )
                    }
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.close}>
                        <span aria-hidden="true">×</span>
                    </button>
                    <div className="modal-header">
                        <img src={this.state.data.logo} alt="img-logo"></img>
                    </div>
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                            {
                                !this.state.phoneNumberVerification && this.state.smsForm && (
                                    <div className="modal-body">
                                        <p>{this.state.data.smsContent}</p>
                                        <div className={this.state.error !== '' ? "form-group has-error" : "form-group"}>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                                <input type="text" className="form-control" placeholder="Phone Number" value={this.state.phoneNumberValue} onChange={this.handlePhoneNumberValueChange.bind(this)} />
                                            </div>
                                            {
                                                this.state.error !== '' && (
                                                    <span className="help-block">{this.state.error}</span>
                                                )
                                            }
                                        </div>
                                        <Link to="#" onClick={this.handleChangeToSmsForm.bind(this, false)}>{this.state.data.emailAlternativeText}</Link>
                                    </div>
                                )
                            }
                            {
                                this.state.phoneNumberVerification && this.state.smsForm && (
                                    <div className="modal-body">
                                        <p>{this.state.data.smsCodeContent}</p>
                                        <div className={this.state.error !== '' ? "form-group has-error" : "form-group"}>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                                                <input type="text" className="form-control" placeholder="Verification Code" value={this.state.phoneNumberVerificationCode} onChange={this.handlePhoneNumberVerificationCodeValueChange.bind(this)} />
                                            </div>
                                            {
                                                this.state.error !== '' && (
                                                    <span className="help-block">{this.state.error}</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            {
                                !this.state.emailVerification && !this.state.smsForm && (
                                    <div className="modal-body">
                                        <p>{this.state.data.emailContent}</p>
                                        <div className={this.state.error !== '' ? "form-group has-error" : "form-group"}>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                                                <input type="email" className="form-control" placeholder="Email" value={this.state.emailValue} onChange={this.handleEmailValueChange.bind(this)} />
                                            </div>
                                            {
                                                this.state.error !== '' && (
                                                    <span className="help-block">{this.state.error}</span>
                                                )
                                            }
                                        </div>
                                        <Link to="#" onClick={this.handleChangeToSmsForm.bind(this, true)}>{this.state.data.smsAlternativeText}</Link>
                                    </div>
                                )
                            }
                            {
                                this.state.emailVerification && !this.state.smsForm && (
                                    <div className="modal-body">
                                        <p>{this.state.data.emailCodeContent}</p>
                                        <div className={this.state.error !== '' ? "form-group has-error" : "form-group"}>
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                                                <input type="text" className="form-control" placeholder="Verification Code" value={this.state.emailVerificationCode} onChange={this.handleEmailVerificationCodeValueChange.bind(this)} />
                                            </div>
                                            {
                                                this.state.error !== '' && (
                                                    <span className="help-block">{this.state.error}</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        <div className="modal-actions">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}