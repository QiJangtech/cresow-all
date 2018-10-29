import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HeaderSelectDropdown extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {
                content : this.props.content,
                selectedImage : this.props.content[0].image,
                selectedTitle : this.props.content[0].title
            },
        };
    }
    
    change = (event) => {
        this.setState({data: {
            content : this.state.data.content,
            selectedImage : event.currentTarget.dataset.image,
            selectedTitle : event.currentTarget.dataset.text
        }});
    };

    render() {
        return (
            <li className="dropdown messages-menu">
                <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                    {
                        this.state.data.selectedImage === '/img/Cresow-Assets-04.png' && (
                            <img src='/img/Cresow-Assets-03.png' className="user-image img-circle" alt="User"></img>
                        )
                    }
                    {
                        this.state.data.selectedImage !== '/img/Cresow-Assets-04.png' && (
                            <img className="user-image" src={this.state.data.selectedImage} alt="User"></img>
                        )
                    }
                    <span>{this.state.data.selectedTitle}</span>
                    <span className="pull-right-container">
                        <i className="fa fa-angle-down pull-right"></i>
                    </span>
                </Link>
                <ul className="dropdown-menu">
                    <li>
                        <ul className="menu">
                        {
                            this.state.data.content.map(((element, i) => {
                                return(
                                <li key={i}>
                                    <Link to="#" onClick={this.change} data-text={element.title} data-image={element.image}>
                                        <div className="pull-left">
                                            <img src={element.image} className="dropdown-image" alt="User"></img>
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