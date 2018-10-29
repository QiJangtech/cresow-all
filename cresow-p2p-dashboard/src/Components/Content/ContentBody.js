import React, { Component } from 'react';

class ContentBody extends Component {
  constructor(props){
    super(props);

    this.state= {
      data: {
        section: this.props.section,
        row: this.props.row,
        column: this.props.column
      }
    }
  }

  render() {
    return(
      <section className={this.state.data.section}>
        <div className={this.state.data.row}>
          <div className={this.state.data.column}>
            {this.props.children}
          </div>
        </div>
      </section>
    )
  }
}

export default ContentBody;