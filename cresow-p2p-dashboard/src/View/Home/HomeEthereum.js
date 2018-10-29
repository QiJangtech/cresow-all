import React, { Component } from 'react';
import {Line} from 'react-chartjs';

//Component
import Box from '../../Components/Box/Box';
import BoxHeader from '../../Components/Box/BoxHeader';
import BoxBody from '../../Components/Box/BoxBody';

export default class HomeEthereum extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartData: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        fillColor: "#25BDFF",
                        strokeColor: "#25BDFF",
                        pointColor: "#25BDFF",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "#25BDFF",
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            },
            chartOptions: {
                showScale: false,
                responsive: true,
            }
        };
    }

    render() {
        return (
            <Box boxType="box">
                <BoxHeader title="Ethereum">
                    <i className="fa fa-diamond pull-left"></i>
                </BoxHeader>
                <BoxBody>
                    <Line data={this.state.chartData} options={this.state.chartOptions} />
                </BoxBody>
            </Box>
        );
    }
}