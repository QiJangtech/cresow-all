import React, {Component} from 'react';

export default class TimelineLabel extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {
                date : this.props.date
            },
        };
    }
    render(){
        return (
            <li className="time-label">
                <span className="bg-blue">
                    {this.state.data.date}
                </span>
            </li>
        )
    }
}