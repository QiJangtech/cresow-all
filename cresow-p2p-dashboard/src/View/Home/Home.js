import React, { Component } from 'react';
import axios from 'axios';

//Component
import ContentBody from '../../Components/Content/ContentBody';
import HomeTableSell from './HomeTableSell';
import HomeTableBuy from './HomeTableBuy';
import HomeIntro from './HomeIntro';
import HomeEthereum from './HomeEthereum';
import HomeRecent from './HomeRecent';
import HomeBuy from './HomeBuy';
import HomeSell from './HomeSell';

import './Home.scss'


class Home extends Component {
  state = {
    isLoaded: false,
  }

  componentWillMount() {
    axios.get('https://aalmztzzsf.execute-api.us-east-1.amazonaws.com/dev/dashboard')
      .then(res => {
        const datas = res.data;
        this.setState({ 
            sellers: datas.sellers,
            buyers: datas.buyers,
            recentTransaction: datas.recent_transactions,
            isLoaded: true
        });
      })
      .catch(error => alert('please try again'))
  }
  
  render() {
    return (
      <ContentBody
          section="dashboard-body content"
          row="row"
          column="col-md-12"
      >
        <div className="col-md-8 left-content">
          <HomeIntro/>
          {this.state.isLoaded ? 
            <HomeTableSell
            data={this.state.sellers}
            title="List of Seller"
            subTitle="Sell Advertisement"/>
          : ''}
          {this.state.isLoaded ? 
            <HomeTableBuy 
            data={this.state.buyers}
            title="List of Buyers"
            subTitle="Buy Advertisement"/>
          : ''}
        </div>
        <div className="col-md-4 right-content">
          <HomeEthereum />
          {this.state.isLoaded ? 
            <HomeRecent recentTransaction={this.state.recentTransaction}/>
          : ''}
          <HomeBuy />
          <HomeSell />
        </div>
      </ContentBody>
    );
  }
}

export default Home;
