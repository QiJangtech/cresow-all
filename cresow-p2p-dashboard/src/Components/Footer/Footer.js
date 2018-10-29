import React, { Component } from 'react';
import './Footer.scss';

export default class Footer extends Component{
    render(){
        return(
            <footer className="main-footer">
                Copyright &copy; 2018 <strong>Cresow</strong> All rights
                reserved.
            </footer>
        )
    }
}