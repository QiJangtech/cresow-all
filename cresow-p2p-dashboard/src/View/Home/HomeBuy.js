import React, { Component } from 'react';
import {Bar} from 'react-chartjs';

//Component
import Box from '../../Components/Box/Box';
import BoxHeader from '../../Components/Box/BoxHeader';
import BoxBody from '../../Components/Box/BoxBody';

export default class HomeBuy extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartData: {
                labels: ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9", "#10", "#11", "#12", "#13"],
                datasets: [
                    {
                        fillColor: "#95BBFA",
                        strokeColor: "#95BBFA",
                        pointColor: "#95BBFA",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "#95BBFA",
                        data: [28, 48, 40, 19, 86, 27, 90, 40, 23, 95, 67, 49, 23]
                    }
                ]
            },
            chartOptions: {
                showScale: false,
                responsive: true
            }
        };
    }
    render() {
        return (
            <Box boxType="box">
                <BoxHeader title="Buy">
                    <span className="pull-right">Ethereum (ETH)</span>
                </BoxHeader>
                <BoxBody>
                    <div className="row">
                        <div className="col-sm-8">
                            <Bar data={this.state.chartData} options={this.state.chartOptions} />
                        </div>
                        <div className="col-sm-4"></div>
                    </div>
                </BoxBody>
            </Box>
        );
    }
}