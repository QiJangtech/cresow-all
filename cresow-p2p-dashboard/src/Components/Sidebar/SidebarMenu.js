import React, { Component } from 'react';

class SidebarMenu extends Component {
  
  render() {
    return(
      <ul className="sidebar-menu" data-widget="tree">
        {this.props.children}
      </ul>
    )
  }
}

export default SidebarMenu;