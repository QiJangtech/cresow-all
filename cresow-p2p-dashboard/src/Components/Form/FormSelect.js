import React, { Component } from 'react';

export default class FormSelect extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {
                label : this.props.label,
                name : this.props.name,
                value : this.props.value,
                placeholder : this.props.placeholder,
                options : this.props.options,
                onChange : this.props.onChange,
            }
        };
    }
    render() {
        return(
            <div className="form-group">
                <label className="control-label col-sm-3">{this.state.data.label}</label>
                <div className="col-sm-9">
                    <select 
                        className="form-control"
                        name={this.state.data.name}
                        value={this.state.data.value}
                        onChange={this.state.data.onChange} >
                        <option value="">{this.state.data.placeholder}</option>
                        {this.state.data.options.map((option, i) => {
                            return (
                                <option
                                    key={i}
                                    value={option.value}>{option.text}</option>
                            );
                        })}
                    </select>
                </div>
            </div>
        )
    }
}