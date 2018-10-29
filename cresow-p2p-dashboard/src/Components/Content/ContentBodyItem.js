import React, { Component } from 'react';

class ContentBodyItem extends Component {
  constructor(props){
    super(props);

    this.state= {
      data: {
        column: this.props.column
      }
    }
  }

  render() {
    return(
      <div className={this.state.data.column}>
        {this.props.children}
      </div>
    )
  }
}

export default ContentBodyItem;