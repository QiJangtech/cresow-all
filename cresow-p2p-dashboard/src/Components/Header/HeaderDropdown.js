import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HeaderDropdown extends Component {
    render() {
        return (
            <li className="dropdown messages-menu">
                <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                    <img src={this.props.image} alt="" className="user-image img-circle"/>
                    <span>{this.props.menuText}</span>
                </Link>
                <ul className="dropdown-menu">
                    <li>
                        <ul className="menu">
                        {
                            this.props.content && this.props.content.map(((element, i) => {
                                return(
                                <li key={i}>
                                    <Link to={element.url} onClick={element.onClick}>
                                        <div className="pull-left">
                                            <i className={element.icon}></i>
                                        </div>
                                        <h4>
                                            {element.title}
                                        </h4>
                                    </Link>
                                </li>
                                )
                            }))
                        }
                        </ul>
                    </li>
                </ul>
            </li>
        );
    }
}