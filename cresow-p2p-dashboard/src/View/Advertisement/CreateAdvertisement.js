import React, { Component } from 'react';
import ContentHeader from '../../Components/Content/ContentHeader';
import ContentBody from '../../Components/Content/ContentBody';
import Tab from '../../Components/Tab/Tab';
import TabHeader from '../../Components/Tab/TabHeader';
import TabContent from '../../Components/Tab/TabContent';
import BuyAdvertisement from './BuyAdvertisement';
import SellAdvertisement from './SellAdvertisement';

class CreateAdvertisement extends Component {
    render() {
        return(
        <div>
            <ContentHeader section="content-header header-advertisements">
                <h3>Create Advertisement</h3>
            </ContentHeader>
            <ContentBody
                section="advertisement-body content"
                row="row"
                column="col-md-12 column-body"
            >
                <Tab>
                    <TabHeader 
                        title="Create New Advertisement"
                        navs={[
                            {"targetId" : "sell", 'title' : "Sell"},
                            {"targetId" : "buy", 'title' : "Buy", 'isActive' : true},
                        ]}
                    />
                    <TabContent>
                        <div className="tab-pane active" id="buy">
                            <BuyAdvertisement />
                        </div>
                        <div className="tab-pane" id="sell">
                            <SellAdvertisement />
                        </div>
                    </TabContent>
                </Tab>
            </ContentBody>
        </div>
        )
    }
}

export default CreateAdvertisement;