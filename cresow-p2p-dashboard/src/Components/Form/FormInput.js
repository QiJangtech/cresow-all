import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

export default class FormInput extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {
                label : this.props.label,
                type : this.props.type,
                class : this.props.class,
                name : this.props.name,
                value : this.props.value,
                id : this.props.id,
                placeholder : this.props.placeholder,
                inputColClass : this.props.inputColClass,
                labelColClass : this.props.labelColClass,
                onChange : this.props.onChange,
                backAddon : this.props.backAddon,
                buttonText : this.props.buttonText,
                onButtonClick : this.props.onButtonClick,
                additional : this.props.additional,
                tooltip : this.props.tooltip,
            }
        };
        this.handleButtonClicked = this.handleButtonClicked.bind(this);
    }
    handleButtonClicked(e) {
        this.setState({ data: {
            label : this.props.label,
            type : this.props.type,
            class : this.props.class,
            name : this.props.name,
            value : this.props.value,
            id : this.props.id,
            placeholder : this.props.placeholder,
            inputColClass : this.props.inputColClass,
            labelColClass : this.props.labelColClass,
            onChange : this.props.onChange,
            backAddon : this.props.backAddon,
            buttonText : this.props.buttonText,
            onButtonClick : this.props.onButtonClick,
            additional : this.props.additional,
            tooltip : this.props.tooltip
        }});
        this.state.data.onButtonClick(e);
    }
    render() {
        return(
            <div className="form-group">
                {
                    this.state.data.label && (
                        <label htmlFor={this.state.data.id} className={"control-label " +  (this.state.data.labelColClass ? this.state.data.labelColClass : "col-sm-12")}>{this.state.data.label}
                            { this.state.data.tooltip && (
                                <span className="form-tooltip" data-tip={this.state.data.tooltip}>
                                    <i className="fa fa-question-circle"></i>
                                    <ReactTooltip />
                                </span>
                            )
                            }
                        </label>
                    )
                }
                <div className={this.state.data.inputColClass ? this.state.data.inputColClass : "col-sm-12"}>
                    <div className={this.state.data.backAddon ? "input-group" : ""}>
                        <input 
                            type={this.state.data.type}
                            className={this.state.data.class}
                            name={this.state.data.name}
                            value={this.state.data.value}
                            id={this.state.data.id}
                            onChange={this.state.data.onChange}
                            placeholder={this.state.data.placeholder} />
                        {
                            this.state.data.backAddon && (
                                <span className="input-group-addon">{this.state.data.backAddon}</span>
                            )
                        }
                    </div>
                    {
                        this.state.data.additional && (
                            <div>{this.state.data.additional}</div>
                        )
                    }
                </div>
                {this.state.data.buttonText && (
                    <div className="col-sm-3">
                        <button className="btn btn-primary" onClick={this.handleButtonClicked}>{this.state.data.buttonText}</button>
                    </div>
                )}
            </div>
        )
    }
}