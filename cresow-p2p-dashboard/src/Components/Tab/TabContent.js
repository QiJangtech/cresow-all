import React, { Component } from 'react';

export default class TabContent extends Component {
    render() {
        return(
            <div className="tab-content">
                {this.props.children}
            </div>
        )
    }
}