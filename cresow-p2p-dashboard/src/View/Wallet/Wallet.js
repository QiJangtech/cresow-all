import React, { Component } from 'react';
import ContentHeader from '../../Components/Content/ContentHeader'
import ContentBody from '../../Components/Content/ContentBody';
import Tab from '../../Components/Tab/Tab';
import TabHeader from '../../Components/Tab/TabHeader';
import TabContent from '../../Components/Tab/TabContent';
import WalletTableDeposit from './WalletTableDeposit';
import WalletTableWithdraw from './WalletTableWithdraw';
import WalletInfo from './WalletInfo';
import WalletBalance from './WalletBalance';
import axios from 'axios';
import './Wallet.scss';

class Wallet extends Component{
    state = {
        isLoaded: false
    }

    componentWillMount(){
        axios.get('https://ei6h9rgbhk.execute-api.us-east-1.amazonaws.com/dev/getWalletInfo')
        .then(res => {
            const datas = res.data;
            this.setState({ 
                deposits: datas.deposits,
                isLoaded: true
            });
        })
    }

    render(){
        const { isLoaded, deposits } = this.state;
        return(
            <div>
                <ContentHeader section="content-header wallet-header">
                    <h3>My Wallet</h3>
                </ContentHeader>
                <ContentBody 
                section="content wallet-body"
                row="row"
                column="col-md-12">
                    <div className="col-md-8 left-content">
                        <Tab>
                            <TabHeader 
                                title="Ethereum Wallet History"
                                navs={[
                                    {"targetId" : "withdraw", 'title' : "Withdraw"},                                    
                                    {"targetId" : "deposit", 'title' : "Deposit", 'isActive' : true},
                                ]}
                            />
                            <TabContent>
                                <div className="tab-pane" id="withdraw">
                                { isLoaded ? 
                                    <WalletTableDeposit data={deposits}/>
                                    : ''
                                }
                                </div>
                                <div className="tab-pane active" id="deposit">
                                { isLoaded ? 
                                    <WalletTableWithdraw data={deposits}/>
                                    : ''
                                }
                                </div>
                            </TabContent>
                        </Tab>
                    </div>
                    <div className="col-md-4 right-content">
                        <WalletInfo/>
                        <WalletBalance/>
                    </div>
                </ContentBody>
            </div>
        )
    }
}

export default Wallet;