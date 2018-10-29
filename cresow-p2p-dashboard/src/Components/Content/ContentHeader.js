import React, { Component } from 'react';

class ContentHeader extends Component {
  constructor(props){
    super(props);

    this.state= {
      data: {
        section: this.props.section
      }
    }
  }

  render() {
    return(
      <section className={this.state.data.section}>
        {this.props.children}
      </section>
    )
  }
}

export default ContentHeader;