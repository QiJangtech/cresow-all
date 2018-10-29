import React, { Component } from 'react';
// import './Box.scss';

export default class BoxTabPanelItem extends Component {

  render(){
      return(
        <div className="col-xs-3">
            <ul className="nav nav-tabs tabs-left">        
                {this.props.children}
            </ul>
        </div>
      );
  }
}