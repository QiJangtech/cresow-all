import React, { Component } from 'react';

export default class Box extends Component {
    constructor(props) {
        super(props);
        this.state= {
           data: {
             boxType : this.props.boxType,
           }
        };
    }

  render() {
    return(
      <div className={this.state.data.boxType}>
        {this.props.children}
      </div>
    )
  }
}