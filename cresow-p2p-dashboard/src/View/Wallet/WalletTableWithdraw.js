import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sematable from 'sematable';
import moment from 'moment';

const columns = [
  { key: 'id', header: 'ID', searchable: true, sortable: false, primaryKey: true },
  { key: 'price' , header:'Price', searchable:true, sortable:false },
  { key: 'amount', header: 'Amount', searchable: true, sortable: false },
  { key: 'date', header: 'Date', searchable: true, sortable: false },
];

const propTypes = {
  headers: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

const configs = {
  autoHidePagination:false,
  showPageSize: false,
  showFilter:false
}

class WalletTableWithdraw extends Component {
  render() {
    const {
      // headers: { select, id },
      data,
    } = this.props;
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Price</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((app,index) => (
              <tr
                key={index}
              >
                <td>{app.conversion_rate}</td>              
                <td>{app.deposit_amount}</td>
                <td>{moment(app.datetime).format("DD MMM YYYY")}</td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
      
    );
  }
}
WalletTableWithdraw.propTypes = propTypes;
export default sematable('WalletTableWithdraw', WalletTableWithdraw, columns, configs);