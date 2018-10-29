import React, { Component } from 'react';
import ContentHeader from '../../Components/Content/ContentHeader';
import ContentBody from '../../Components/Content/ContentBody';
import TableBuyAdvertisement from './TableBuyAdvertisement';
import TableSellAdvertisement from './TableSellAdvertisement';
import axios from 'axios';

import './Advertisement.scss'

class Advertisement extends Component {
    state = {
        isLoaded: false
    }
    componentWillMount() {
        axios.get('https://on701i3961.execute-api.us-east-1.amazonaws.com/dev/getAdvertisements')
          .then(res => {
            const datas = res.data;
            this.setState({ 
                sellHistory: datas.sell_ads,
                buyingHistory: datas.buy_ads,
                isLoaded: true
            });
          })
    }

    render() {
        return(
            <div>
                <ContentHeader
                section="content-header header-advertisements">
                    <h3>Ongoing Advertisement</h3>
                    <a href="/advertisement/create" className="btn pull-right text-uppercase">create new advertisement</a>                    
                </ContentHeader>
                <ContentBody
                    section="advertisement-body content"
                    row="row"
                    column="col-md-12 column-body"
                >
                {this.state.isLoaded ? 
                <TableBuyAdvertisement
                title="buy advertisement"
                data={this.state.buyingHistory}/>
                : ''}
                {this.state.isLoaded ? 
                <TableSellAdvertisement
                title="sell advertisement"
                data={this.state.sellHistory}/>
                : ''}
                </ContentBody>
            </div>
        )
    }
}

export default Advertisement;