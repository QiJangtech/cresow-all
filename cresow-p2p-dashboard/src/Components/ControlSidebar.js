import React, { Component } from 'react';
import HeaderSelectDropdown from './Header/HeaderSelectDropdown.js';
import { Link } from 'react-router-dom';
import Auth0Popup from './Auth0Popup/Auth0Popup.js';
import Popup from "reactjs-popup";

export default class ControlSidebar extends Component {
    logout() {
        this.props.auth.logout();
    }
    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                <aside className="control-sidebar control-sidebar-dark">
                    <div className="tab-content">
                        <div className="tab-pane active" id="control-sidebar-home-tab">
                            <h3 className="control-sidebar-heading">Choose Country</h3>
                            <HeaderSelectDropdown 
                                content={
                                    [
                                        {'title' : 'Singapore', 'image' : '/img/Cresow-Assets-20.png'},
                                        {'title' : 'Malaysia', 'image' : '/img/Cresow-Assets-21.png'},
                                    ]} />
                            <h3 className="control-sidebar-heading">Choose Currency</h3>
                            <HeaderSelectDropdown 
                                content={
                                    [
                                        {'title' : 'Ethereum', 'image' : '/img/Cresow-Assets-04.png'},
                                        {'title' : 'BTC', 'image' : '/img/Cresow-Assets-23.png'},
                                        {'title' : 'CRX', 'image' : '/img/Cresow-Assets-24.png'}
                                    ]} />
                            <hr />
                            {
                                !isAuthenticated() && (
                                    <ul className="control-sidebar-menu">
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
                                    </ul>
                                )
                            }
                            {
                                isAuthenticated() && (
                                    <ul className="control-sidebar-menu">
                                        <li>
                                            <Link to="/profile">
                                            <i className="menu-icon fa fa-gear bg-red"></i>

                                            <div className="menu-info">
                                                <h4 className="control-sidebar-subheading">Settings</h4>
                                            </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" onClick={this.logout.bind(this)}>
                                            <i className="menu-icon fa fa-envelope-o bg-yellow"></i>

                                            <div className="menu-info">
                                                <h4 className="control-sidebar-subheading">Logout</h4>
                                            </div>
                                            </Link>
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                </aside>
                <div className="control-sidebar-bg"></div>
            </div>
        );
    }
}