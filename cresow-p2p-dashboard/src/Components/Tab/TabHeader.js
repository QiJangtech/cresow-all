import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TabHeader extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {
                title : this.props.title,
                navs : this.props.navs,
            }
        };
    }
    render() {
        return(
            <ul className="nav nav-tabs pull-right">
                {this.props.children}
                {
                    this.state.data.navs && this.state.data.navs.map(((element, i) => {
                        return(
                            <li key={i} className={ element.isActive ? "active" : ""}>
                                <Link to={"#"+element.targetId} data-toggle="tab" aria-expanded="true">{element.title}</Link>
                            </li>
                        )
                    }))
                }
                <li className="pull-left header">{this.state.data.title}</li>
            </ul>
        )
    }
}