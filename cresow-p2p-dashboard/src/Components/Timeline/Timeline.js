import React, {Component} from 'react';

export default class Timeline extends Component {
    render(){
        return (
            <ul className="timeline">
                {this.props.children}
            </ul>
        )
    }
}