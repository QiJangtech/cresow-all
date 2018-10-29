import React, { Component } from 'react';

export default class BoxBody extends Component {

  render() {
    return(
        <div className="box-body">
            {this.props.children}
        </div>
    )
  }
}