import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sematable, { PaginationContainer } from 'sematable';
import { Link } from 'react-router-dom';

import Box from '../../Components/Box/Box';
import BoxHeader from '../../Components/Box/BoxHeader';
import BoxBody from '../../Components/Box/BoxBody';
import BoxTools from '../../Components/Box/BoxTools';

const columns = [
  { key: 'id', header: 'ID', searchable: true, sortable: false, primaryKey: true },
  { key: 'price', header: 'Price', searchable: true, sortable: false },
  { key: 'coinLeft', header: 'Coin Left', searchable: true, sortable: false },
  { key: 'from', header: 'from', searchable: true, sortable: false },
  { key: 'bankTransfer', header: 'Bank Transfer', searchable: true, sortable: false },
  { key: 'action', header: 'Action', searchable: true, sortable: false },
];

const propTypes = {
  headers: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

const configs = {
  plain:true,
  autoHidePagination:false,
  showPageSize: false,
  showFilter:false,
  showPagination:false
}

class HomeTableBuy extends Component {
  render() {
    const {
    //   headers: { select, id, tickerNumber, subject, status, submitted, lastReply },
      data, title, subTitle
    } = this.props;
    return (
    <Box
        boxType="box"
    >
        <BoxHeader title={title}>
            <BoxTools
            position="right">
                <div className="sub-title">{subTitle}</div>
                <div className="btn refresh-btn"><i className="fa fa-refresh" aria-hidden="true"></i></div>
            </BoxTools>
        </BoxHeader>
        <BoxBody>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Coin Left</th>
                  <th>From</th>
                  <th>Bank Transfer</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((app,index) => (
                  <tr
                    key={index}
                  >
                    <td><span className="buy-price">{app.conversion_rate}</span></td>
                    <td>{app.coins_wanted}</td>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="buy-action"><Link to={`/buy/${app.id}`}>Buy Now</Link></span>
                    </td> 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationContainer tableName="HomeTableBuy"/>
        </BoxBody>
      </Box>
    );
  }
}
HomeTableBuy.propTypes = propTypes;
export default sematable('HomeTableBuy', HomeTableBuy, columns, configs);