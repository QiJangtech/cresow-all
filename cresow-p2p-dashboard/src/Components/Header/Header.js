import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import HeaderDropdown from './HeaderDropdown.js';
import HeaderSelectDropdown from './HeaderSelectDropdown.js';
import Auth0Popup from '../Auth0Popup/Auth0Popup.js';
import Popup from "reactjs-popup";
import './Header.scss';

export default class Header extends Component {
    logout() {
        this.props.auth.logout();
    }
    componentWillMount() {
        this.setState({ profile: {} });
        const { userProfile, getProfile, isAuthenticated } = this.props.auth;
        if (isAuthenticated() && !userProfile) {
            getProfile((err, profile) => {
                this.setState({ profile });
            });
        } else {
            this.setState({ profile: userProfile });
        }
    }
    render(){
        const { isAuthenticated } = this.props.auth;
        const { profile } = this.state;
        return (
            <header className="main-header">
                <Link to="/" className="logo">
                    <span className="logo-mini"><img className="brand-logoimage" src="/img/Cresow-Assets-01.png"></img></span>
                    <span className="logo-lg"><img className="brand-logoimage" src="/img/Cresow-Assets-01.png"></img></span>
                </Link>
                <nav className="navbar navbar-static-top">
                    <Link to="" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>                    
                    </Link>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <HeaderSelectDropdown 
                                content={
                                    [
                                        {'title' : 'Singapore', 'image' : '/img/Cresow-Assets-20.png'},
                                        {'title' : 'Malaysia', 'image' : '/img/Cresow-Assets-21.png'},
                                    ]} />
                            <HeaderSelectDropdown 
                                content={
                                    [
                                        {'title' : 'Ethereum', 'image' : '/img/Cresow-Assets-04.png'},
                                        {'title' : 'BTC', 'image' : '/img/Cresow-Assets-23.png'},
                                        {'title' : 'CRX', 'image' : '/img/Cresow-Assets-24.png'}
                                    ]} />
                            {
                                isAuthenticated() && (
                                    <HeaderDropdown 
                                        image={profile.picture}
                                        menuText={profile.nickname}
                                        content={
                                            [
                                                {'title' : 'Setting', 'icon' : 'fa fa-gear', 'url' : '/profile'},
                                                {'title' : 'Logout', 'icon' : 'fa fa-envelope-o', 'url' : '#', 'onClick' : this.logout.bind(this)}
                                            ]
                                        } />
                                )
                            }
                            {
                                !isAuthenticated() && (
                                    <li className="dropdown messages-menu">
                                        <Popup 
                                            trigger={<Link to="#"><span>Login</span></Link>} 
                                            modal
                                            closeOnDocumentClick >
                                            {close => (
                                                <Auth0Popup 
                                                    logo="/img/Cresow-Assets-01.png"
                                                    title="Cresow"
                                                    emailContent={"Enter your email address to sign in."}
                                                    emailCodeContent={"An email with the code has been sent."}
                                                    emailAlternativeText={"Otherwise, enter your email address to sign in"}
                                                    smsContent={"Enter your phone number to sign in."}
                                                    smsCodeContent={"An SMS with the code has been sent."}
                                                    smsAlternativeText={"Otherwise, enter your phone number to sign in"}
                                                    footer="submit"
                                                    auth={this.props.auth}
                                                    close={close}
                                                    />
                                            )}
                                        </Popup>
                                    </li>
                                )
                            }
                            <li>
                                <Link to="#" data-toggle="control-sidebar">
                                    <i className="fa fa-gears"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}