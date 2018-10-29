import React, { Component } from 'react';

export default class FormTextarea extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {
                label : this.props.label,
                class : this.props.class,
                row : this.props.row,
                placeholder : this.props.placeholder,
                onChange : this.props.onChange,
            }
        };
        this.handleButtonClicked = this.handleButtonClicked.bind(this);
    }
    handleButtonClicked(e) {
        this.setState({ data: {
            label : this.props.label,
            class : this.props.class,
            row : this.props.row,
            placeholder : this.props.placeholder,
            onChange : this.props.onChange,
        }});
        this.state.data.onButtonClick(e);
    }
    render() {
        return(
            <div className="form-group">
                {
                    this.state.data.label && (
                        <label htmlFor={this.state.data.id} className="control-label col-sm-12">{this.state.data.label}</label>
                    )
                }
                <div className="col-sm-12">
                    <div className={this.state.data.backAddon ? "input-group" : ""}>
                        <textarea 
                            className={this.state.data.class}
                            row={this.state.data.row}
                            onChange={this.state.data.onChange}
                            placeholder={this.state.data.placeholder} />
                    </div>
                </div>
            </div>
        )
    }
}