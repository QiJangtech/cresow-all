import React, { Component } from 'react';

export default class BoxTabPanelItemList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {
              isActive : this.props.isActive,
              onActiveTab : this.props.onActiveTab,
              tabName : this.props.tabName,
              href : this.props.href,
            }
         };
    }

  render(){
      return(

        <li className={ this.props.isActive ? 'active': '' } onClick={ this.props.onActiveTab }>
            <a href={"#"+this.props.href} data-toggle="tab">
                {this.props.tabName}
            </a>
        </li>
      );
  }
}