import React, { Component } from 'react';

// Component
import Box from '../../Components/Box/Box';
import BoxHeader from '../../Components/Box/BoxHeader';
import BoxBody from '../../Components/Box/BoxBody';
import ContentBodyItem from '../../Components/Content/ContentBodyItem';

class HomeIntro extends Component {
    render() {
        return(
            <Box boxType="box">
                <BoxHeader title="Landing Cryptocurrency P2P Escrow Service">
                    <img src="./img/Cresow-Assets-01.png" alt="cresow-logo" className="pull-left" />
                </BoxHeader>
                <BoxBody>
                    <div className="row">
                        <ContentBodyItem column="col-md-4">
                            <div className="box-info-content">
                                <h3>Transparant Fee</h3>
                                <p>
                                There is no hidden cost in
                                using Cresow. Check out our
                                <a href="/ourfees"> Fees Structure</a>
                                </p>
                            </div>
                        </ContentBodyItem>
                        <ContentBodyItem column="col-md-4">
                            <div className="box-info-content">
                                <h3>Quick & Easy</h3>
                                <p>
                                You can Buy or Sell
                                Cryptocurrency within
                                few simple stops
                                </p>
                            </div>
                        </ContentBodyItem>
                        <ContentBodyItem column="col-md-4">
                            <div className="box-info-content">
                                <h3>Reliable Team</h3>
                                <p>
                                Professional support team
                                with an operating office
                                based in Singapore
                                </p>                
                            </div>
                        </ContentBodyItem>
                    </div>
                </BoxBody>
            </Box>
        )
    }
}

export default HomeIntro;
