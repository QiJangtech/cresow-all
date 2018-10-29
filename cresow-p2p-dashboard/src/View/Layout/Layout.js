import React, { Component } from 'react';

import Header from '../../Components/Header/Header.js';
import Content from '../../Components/Content/Content.js';
import SideBar from '../../Components/Sidebar/MainSidebar';
import ControlSidebar from '../../Components/ControlSidebar';
import Footer from '../../Components/Footer/Footer';

class Layout extends Component {
  render(props){
    return(
      <div>
        <Header auth={this.props.auth} {...props}/>
        <SideBar />
        <Content>
          {this.props.children}
        </Content>
        <Footer/>
        <ControlSidebar auth={this.props.auth} {...props}/>
      </div>
    )
  }
}

export default Layout;