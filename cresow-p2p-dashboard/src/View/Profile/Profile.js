import React, { Component } from 'react';
import ContentHeader from '../../Components/Content/ContentHeader';
import ContentBody from '../../Components/Content/ContentBody';
import ProfilePersonalData from './ProfilePersonalData';
import ProfileIdentifyInformation from './ProfileIdentifyInformation';
import ProfileResetPassword from './ProfileResetPassword';
import './Profile.scss';

export default class Profile extends Component {
    render(){
        return(
            <div>
                <ContentHeader section="content-header profile-header">
                    <h3>Account Setting</h3>
                </ContentHeader>
                <ContentBody section="content profile-body" row="row" column="col-md-12 column-body">
                    <ProfilePersonalData
                    status={false}
                    userCode="123132xxx"
                    userEmail="test@test.com"
                    userName="Tester"/>
                    <ProfileIdentifyInformation/>
                    <ProfileResetPassword/>
                </ContentBody>   
            </div>   
        )
    }
}