import React, { Component } from 'react';
import ContentHeader from '../../Components/Content/ContentHeader';
import ContentBody from '../../Components/Content/ContentBody';
import Box from '../../Components/Box/Box';
import BoxHeader from '../../Components/Box/BoxHeader';
import OurFeesItem from './OurFeesItem';
import './OurFees.scss';


class OurFees extends Component {
    render(){
        return(
            <div>
                <ContentHeader section="our-fees-header content-header">
                    <h3>Our Fees</h3>
                </ContentHeader>
                <ContentBody
                    section="our-fees-body content"
                    row="row"
                    column="col-md-12"
                >
                    <Box boxType="box">
                        <BoxHeader>
                            <h3 className="box-title">Fee Structure</h3>
                        </BoxHeader>
                        <OurFeesItem/>
                    </Box>
                </ContentBody>
            </div>
        )
    }
}

export default OurFees;