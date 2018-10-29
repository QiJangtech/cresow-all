import React, { Component } from 'react';

export default class BoxTools extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {
              position : this.props.position,
            }
         };
    }

  render() {
    return(
        <div className={"box-tools pull-" + this.state.data.position }>
            {this.props.children}
        </div>
    )
  }
}