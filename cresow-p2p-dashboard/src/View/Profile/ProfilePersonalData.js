import React, { Component } from 'react';
import Box from '../../Components/Box/Box'
import BoxHeader from '../../Components/Box/BoxHeader';
import BoxTools from '../../Components/Box/BoxTools'
import BoxBody from '../../Components/Box/BoxBody';

export default class ProfilePersonalData extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                status : this.props.status,
                userCode : this.props.userCode,
                userEmail : this.props.userEmail,
                userName : this.props.userName
            }
        }
    }
    render(){
        return(
            <Box boxType="box">
                <BoxHeader title="Personal Data">
                    <BoxTools position="right">
                        <button type="button" className="btn btn-tool-box" data-widget="collapse">
                            <i className="fa fa-minus"></i>
                        </button>
                    </BoxTools>
                </BoxHeader>
                <BoxBody>
                        <div className="form-group">
                            <label>Status</label>
                            <p className={ this.state.data.status ? 'approved' : 'unapproved' }>{this.state.data.status ? 'Account verified' : 'Account unverified'}</p>
                        </div>
                        <div className="form-group">
                            <label>User Code</label>
                            <p>{this.state.data.userCode}</p>
                        </div>
                        <div className="form-group">
                            <label>User Email</label>
                            <p>{this.state.data.userEmail}</p>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <p>{this.state.data.userName}</p>
                        </div>
                </BoxBody>
            </Box>
        )
    }
}