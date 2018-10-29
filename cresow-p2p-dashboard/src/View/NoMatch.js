import React, {Component} from 'react';
import ContentHeader from '../Components/Content/ContentHeader';

export default class NoMatch extends Component {
    render(){
        return (
            <ContentHeader section="content-header">
                <h3>404</h3>
            </ContentHeader>
        )
    }
}