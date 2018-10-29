import React, { Component } from 'react';

export default class FormSelect extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {
                label : this.props.label,
                switchStatus : this.props.switchStatus,
                onText : this.props.onText,
                offText : this.props.offText,
                onSwitchToggled : this.props.onSwitchToggled,
            }
        };
        this.handleSwitchToggled = this.handleSwitchToggled.bind(this);
    }
    handleSwitchToggled(e) {
        this.setState({ data: {
            label : this.props.label,
            switchStatus : !this.props.switchStatus,
            onText : this.props.onText,
            offText : this.props.offText,
            onSwitchToggled : this.props.onSwitchToggled,
        }});
        this.state.data.onSwitchToggled();
    }
    render() {
        return(
            <div className="form-group">
                <label className="control-label col-sm-3">{this.state.data.label}</label>
                <div className="col-sm-6">
                    <label className="switch">
                        <input type="checkbox" onChange={this.handleSwitchToggled} />
                        <span className="slider round"></span>
                        <span>{this.state.data.switchStatus ? this.state.data.onText : this.state.data.offText}</span>
                    </label>
                </div>
            </div>
        )
    }
}