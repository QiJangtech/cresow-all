import React, { Component } from 'react';
import axios from 'axios';

//Component
import ContentHeader from '../../Components/Content/ContentHeader';
import ContentBody from '../../Components/Content/ContentBody';
import Tab from '../../Components/Tab/Tab';
import TabHeader from '../../Components/Tab/TabHeader';
import TabContent from '../../Components/Tab/TabContent';
import TransactionTableBuy from './TransactionTableBuy';
import TransactionTableSell from './TransactionTableSell';

import './Transaction.scss'


class Home extends Component {
  state = {
    isLoaded: false,
  }

  componentWillMount() {
    axios.get('https://ucucu9yook.execute-api.us-east-1.amazonaws.com/dev/getTransactionInfo')
      .then(res => {
        const datas = res.data;
        this.setState({ 
            sellHistory: datas.selling_history,
            buyingHistory: datas.buying_history,
            isLoaded: true
        });
      })
}
  render() {
    const {
        sellHistory, buyingHistory, isLoaded
    } = this.state
    return (
      <div>
        <ContentHeader
        section="transaction-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 column-header">                
                        <h3>Transaction</h3>
                    </div>
                </div>
            </div>
        </ContentHeader>
        <ContentBody
            section="transaction-body content"
            row="row"
            column="col-md-12 column-body"
        >
        <Tab>
            <TabHeader 
                title="Ethereum Transactions History"
                navs={[
                    {"targetId" : "sell", 'title' : "Sell History"},
                    {"targetId" : "buy", 'title' : "Buy History", 'isActive' : true},
                ]}
            />
            <TabContent>
                <div className="tab-pane active" id="buy">
                { isLoaded ? 
                    <TransactionTableBuy data={buyingHistory}/>
                    : ''
                }
                    </div>
                <div className="tab-pane" id="sell">
                { isLoaded ? 
                    <TransactionTableSell data={sellHistory}/>
                    : ''
                }
                </div>
            </TabContent>
        </Tab>
        </ContentBody>
      </div>
    );
  }
}

export default Home;
