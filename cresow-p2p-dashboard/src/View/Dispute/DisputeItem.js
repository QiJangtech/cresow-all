import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sematable from 'sematable';
import moment from 'moment';

const columns = [
  { key: 'id', header: 'ID', searchable: true, sortable: false, primaryKey: true },
  { key: 'ticketNumber', header: 'Ticket Number', searchable: true, sortable: false },
  { key: 'subject', header: 'Subject', searchable: true, sortable: false },
  { key: 'status', header: 'Status', searchable: true, sortable: false },
  { key: 'submitted', header: 'Submitted', searchable: true, sortable: false },
  { key: 'lastReply', header: 'Last Reply', searchable: true, sortable: false },
];

const propTypes = {
  headers: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

const configs = {
  autoHidePagination:false,
  showPageSize: true,
  showFilter:true,
  filterContainerClassName:'col-md-3',
  pageSizeContainerClassName:'col-md-9',
  pageSizeClassName:'select'
}

class DisputeItem extends Component {
  render() {
    const {
    //   headers: { select, id, tickerNumber, subject, status, submitted, lastReply },
      data,
    } = this.props;
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Ticket Number</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Last Reply</th>
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
                <td>{app.id}</td> 
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
      
    );
  }
}
DisputeItem.propTypes = propTypes;
export default sematable('DisputeItem', DisputeItem, columns, configs);