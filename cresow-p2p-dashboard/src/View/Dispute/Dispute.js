import React, { Component } from 'react';
import axios from 'axios';

//Component
import ContentHeader from '../../Components/Content/ContentHeader';
import ContentBody from '../../Components/Content/ContentBody';
import Box from '../../Components/Box/Box';
import BoxHeader from '../../Components/Box/BoxHeader';
import BoxBody from '../../Components/Box/BoxBody';
import DisputeItem from './DisputeItem';

import './Dispute.scss'


class Dispute extends Component {
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
      .catch(error => alert('please try again'))
  }
  
  render() {
    return (
      <div>
        <ContentHeader
        section="dispute-header content">
                <div className="row">
                    <div className="col-md-6 col-xs-12 column-header">                
                        <h3>Dispute</h3>
                    </div>
                    <div className="col-md-6 col-xs-12 column-button">
                        <a href="/dispute/create" className="btn">Create New Ticket</a>
                    </div>
                </div>
        </ContentHeader>
        <ContentBody
            section="dispute-body content"
            row="row"
            column="col-md-12 column-body"
        >
          <Box
              boxType="box"
          >
              <BoxHeader>
                  <h3 className="box-title">My Ticket</h3>
              </BoxHeader>
              <BoxBody>
              {this.state.isLoaded ? 
                <DisputeItem data={this.state.sellHistory}/>
              : ''}
              </BoxBody>
          </Box>
        </ContentBody>
      </div>
    );
  }
}

export default Dispute;
