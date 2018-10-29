import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

export default class FormText extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {
                label : this.props.label,
                text : this.props.text,
                tooltip : this.props.tooltip,
            }
        };
    }
    render() {
        return(
            <div className="form-group">
                <label htmlFor={this.state.data.id} className="control-label col-sm-3">
                    {this.state.data.label}
                    {
                        this.state.data.tooltip && (
                            <span className="form-tooltip" data-tip={this.state.data.tooltip}>
                                <i className="fa fa-question-circle"></i>
                                <ReactTooltip />
                            </span>
                        )
                    }
                </label>
                <div className="col-sm-9">
                    <span>{this.state.data.text}</span>
                </div>
            </div>
        )
    }
}