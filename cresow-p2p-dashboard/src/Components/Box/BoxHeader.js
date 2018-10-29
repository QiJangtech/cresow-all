import React, { Component } from 'react';

export default class BoxHeader extends Component {
  constructor(props) {
    super(props);
    this.state= {
        data: {
          title : this.props.title,
        }
     };
}

  render() {
    return(
        <div className="box-header with-border">
            <h3 className="box-title">{this.state.data.title}</h3>
            {this.props.children}
        </div>
    )
  }
}