import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import sematable, {
  PaginationContainer
} from 'sematable';
import Box from '../../Components/Box/Box';
import BoxHeader from '../../Components/Box/BoxHeader';
import BoxBody from '../../Components/Box/BoxBody';

const columns = [
  { key: 'id', header: 'ID', searchable: true, sortable: false, primaryKey: true },
  { key: 'price', header: 'Price', searchable: true, sortable: false },
  { key: 'coinLeft', header: 'Coin Left', searchable: true, sortable: false },
  { key: 'currency', header: 'Currency', searchable: true, sortable: false },
  { key: 'bankTransfer', header: 'Bank Transfer', searchable: true, sortable: false },
  { key: 'status', header: 'Status', searchable: true, sortable: false },
  { key: 'editAds', header: 'Edit Ads', searchable: true, sortable: false },
  { key: 'action', header: 'action', searchable: true, sortable: false },
];

const propTypes = {
  headers: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

const configs = {
  plain: true,
  autoHidePagination:false,
  showPageSize: false,
  showFilter:false
}

class TableSellAdvertisement extends Component {
  render() {
    const {
      data, title
    } = this.props;
    return (
      <Box
          boxType="box no-border"
      >
        <BoxHeader>
            <h3 className="box-title text-uppercase">{title}</h3>
        </BoxHeader>
        <BoxBody>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Price</th>
              <th>Coin Left</th>
              <th>Currency</th>
              <th>Bank Transfer</th>
              <th>Status</th>
              <th>Edit Ads</th>              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((app,index) => (
              <tr
                key={index}
              >
                <td>{app.conversion_rate}</td>
                <td>{app.coins_left}</td>
                <td></td>
                <td></td>
                <td>
                  <span className={app.status === 'active' ? 'active': 'inactive'}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <span><Link to={`/edit/${app.id}`}>Edit</Link></span>
                </td>                
                <td>
                  <span className={app.status === 'active' ? 'active': 'deactive'}>
                      {app.status === 'active' ? 
                      'Active'
                      : 'Deactive'}
                  </span>
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationContainer tableName="TableSellAdvertisement"/>        
      </div>
      </BoxBody>
      </Box>
    );
  }
}
TableSellAdvertisement.propTypes = propTypes;
export default sematable('TableSellAdvertisement', TableSellAdvertisement, columns, configs);