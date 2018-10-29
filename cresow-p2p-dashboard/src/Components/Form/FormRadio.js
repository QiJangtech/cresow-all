import React, { Component } from 'react';

export default class FormRadio extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {
                label : this.props.label,
                radios : this.props.radios,
                radioName : this.props.radioName,
                onChange : this.props.onChange,
            }
        };
    }
    render() {
        return(
            <div className="form-group">
                {
                    this.state.data.label && (
                        <label htmlFor={this.state.data.id} className={"control-label col-sm-12"}>{this.state.data.label}</label>
                    )
                }
                <div className="col-sm-12">
                    {this.state.data.radios.map((radio, i) => {
                        return (
                            <div className="radio" key={i}>
                                <label>
                                    <input 
                                        type="radio" 
                                        name={this.props.radioName} 
                                        id={radio.id} 
                                        value={radio.value} 
                                        onChange={this.state.data.onChange}
                                    />
                                    {radio.text}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}