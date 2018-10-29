import React, { Component } from 'react';
import './Form.scss';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {
                class : this.props.class,
            }
        };
    }
    render() {
        return(
            <form className={this.state.data.class}>
                {this.props.children}
                <div className="text-right">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}