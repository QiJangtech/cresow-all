import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sematable from 'sematable';
import moment from 'moment';

const columns = [
  { key: 'id', header: 'ID', searchable: true, sortable: false, primaryKey: true },
  { key: 'amount', header: 'Amount', searchable: true, sortable: false },
  { key: 'date', header: 'Date', searchable: true, sortable: false },
  { key: 'time', header: 'Time', searchable: true, sortable: false },
  { key: 'tradeWith', header: 'Trade With', searchable: true, sortable: false },
  { key: 'status', header: 'Status', searchable: true, sortable: false },
  { key: 'orderId', header: 'Order ID', searchable: true, sortable: false },
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

class TransactionTableSell extends Component {
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
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Trade With</th>
              <th>Status</th>
              <th>Order ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((app,index) => (
              <tr
                key={index}
              >
                <td>{moment(app.datetime).format("DD MMM YYYY")}</td>
                <td>{moment(app.datetime).format("H:M A")}</td>
                <td><span>{app.buy_amount ? app.buy_amount : app.deposit_amount}</span></td>
                <td></td>
                <td></td>
                <td>{app.id}</td> 
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
      
    );
  }
}
TransactionTableSell.propTypes = propTypes;
export default sematable('TransactionTableSell', TransactionTableSell, columns, configs);