import React, {Component} from 'react';
import SidebarMenu from './SidebarMenu';
import SidebarMenuItem from './SidebarMenuItem';
import './Sidebar.scss';

export default class SideBar extends Component {
  render(){
    return (
      <aside className="main-sidebar">
        <section className="sidebar"> 
          <SidebarMenu>
            <SidebarMenuItem
              url="/"
              icon="fa fa-diamond"
              title="Ethereum"
            />
            <SidebarMenuItem
              url="/advertisement"
              icon="fa fa-book"
              title="Advertisement"
            />
            <SidebarMenuItem
              url="/wallet"
              icon="fa fa-credit-card"
              title="Wallet"
            />
            <SidebarMenuItem
              url="/transaction"
              icon="fa fa-list-alt"
              title="Transaction"
            />
            <SidebarMenuItem
              url="/ourfees"
              icon="fa fa-file-text-o"
              title="Our Fees"
            />
            <SidebarMenuItem
              url="/social"
              icon="fa fa-newspaper-o"
              title="Social"
            />
            <SidebarMenuItem
              url="/dispute"
              icon="fa fa-bookmark-o"
              title="Dispute"
            />
          </SidebarMenu>
        </section>
      </aside>
    )
  }
}