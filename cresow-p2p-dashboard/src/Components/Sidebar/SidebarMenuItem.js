import React, { Component } from 'react';

class SidebarMenuItem extends Component {
  constructor(props){
    super(props);
    this.state= {
      data: {
        url: this.props.url,
        icon: this.props.icon,
        title: this.props.title
      }
   };
  }
  render() {
    const { url, icon, title } = this.state.data;
    return(
      <li>
        <a href={url}>
          <i className={icon}></i>
          <span>{title}</span>
        </a>
      </li>
    )
  }
}

export default SidebarMenuItem;