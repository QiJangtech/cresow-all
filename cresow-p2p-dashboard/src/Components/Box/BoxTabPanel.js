import React, { Component } from 'react';
import BoxTabPanelItem from './BoxTabPaneItem';
import BoxTabPanelContent from './BoxTabPanelContent';
import BoxTabPanelItemList from './BoxTabPanelItemList';
import './Box.scss';

export default class BoxTabPanel extends Component {
    constructor(props) {
        super(props);
        this.state= {
           data: {
             title: this.props.title,
             navTabs: this.props.navTabs,
             content : this.props.content,
           }
        };        
    }

    getInitialState() {
        return { selectedTabId: '' }
    }
      
    isActive(href) {
        return this.state.selectedTabId === href;
    }
      
    setActiveTab(selectedTabId) {
        this.setState({ selectedTabId });
    }

    render() {
        return(
            <div className="row">
                <div className="col-sm-6">
                    <h3>{this.state.data.title}</h3>
                    <hr/>
                        <BoxTabPanelItem>
                            {this.state.data.navTabs.map (((el,i) => {
                                return <BoxTabPanelItemList
                                    key={ i }
                                    tabName={ el.tabName }
                                    href= {el.href}
                                    isActive={ this.isActive(el.href) } 
                                    onActiveTab={ this.setActiveTab.bind(this, el.href) }
                                />
                            }))}
                        </BoxTabPanelItem>
                        <BoxTabPanelContent>
                            {
                            this.state.data.content.map(((element, i) => {
                                return(
                                <div key={i} className="tab-pane" id={element.id}>
                                    {element.content}
                                </div>
                                )
                            }))
                            }
                        </BoxTabPanelContent>
                    <div className="clearfix"></div>
                </div>
            </div>
    )
  }
}