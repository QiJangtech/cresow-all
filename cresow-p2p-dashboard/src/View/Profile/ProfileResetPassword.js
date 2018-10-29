import React, { Component } from 'react';
import Box from '../../Components/Box/Box';
import BoxHeader from '../../Components/Box/BoxHeader';
import BoxTools from '../../Components/Box/BoxTools'
import BoxBody from '../../Components/Box/BoxBody';

export default class ProfileResetPassword extends Component {
    
    render(){
        return(
            <Box boxType="box collapsed-box">
                <BoxHeader title="Reset Password">
                    <BoxTools position="right">
                        <button type="button" className="btn btn-tool-box" data-widget="collapse">
                            <i className="fa fa-plus"></i>
                        </button>
                    </BoxTools>
                </BoxHeader>
                <BoxBody>
                    <div>
                        test
                    </div>
                </BoxBody>
            </Box>
        )
    }
}