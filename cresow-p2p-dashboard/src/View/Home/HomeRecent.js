import React, { Component } from 'react';

//Component
import Box from '../../Components/Box/Box';
import BoxHeader from '../../Components/Box/BoxHeader';
import BoxBody from '../../Components/Box/BoxBody';

export default class HomeRecent extends Component {  
    constructor(props) {
        super(props);
        this.state= {
            data: {
              recentTransaction : this.props.recentTransaction,
            }
        };
    }

    render() {
        return (
            <Box boxType="box">
                <BoxHeader title="Recent Transactions" />
                <BoxBody>
                    <div className="home-recent-widget">
                        { this.state.data.recentTransaction.map((data,index) => (
                            <div className="row" key={index}>
                                <div className={ data.type === 'BUY' ? "col-sm-4 buy" : 'col-sm-4 sell'}>{data.type}</div>
                                <div className={ data.type === 'BUY' ? "col-sm-5 buy" : 'col-sm-5 sell'}>{data.amount}<p className="time">lorem</p></div>
                                <div className="col-sm-3">{data.currency}</div>
                            </div>
                        ))}
                    </div>
                </BoxBody>
            </Box>
        );
    }
}