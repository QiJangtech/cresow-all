import React, { Component } from 'react';
// import './Box.scss';

export default class BoxTabPanelContent extends Component {

  render(){
      return(
        <div className="col-xs-9">
            <div className="tab-content">      
                {this.props.children}
            </div>
        </div>
        /* <div class="col-xs-9">
                    <div class="tab-content">
                        <div class="tab-pane active" id="home">Home Tab.</div>
                        <div class="tab-pane" id="profile">Profile Tab.</div>
                        <div class="tab-pane" id="messages">Messages Tab.</div>
                        <div class="tab-pane" id="settings">Settings Tab.</div>
                    </div>
                </div> */
      );
  }
}