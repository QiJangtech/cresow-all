import React, { Component } from 'react';
import './Content.scss';

export default class Content extends Component {

  render(){
    return (
      <div className="content-wrapper">
        {this.props.children}
      </div>
    )
  }
}