import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ResponsiveTable = ({ headers, tableData }) => {
  return (
    <table className={`table ${tableData.length === 0 ? 'table__loading' : ''}`}>
      <thead className="table__heading">
        <tr>
          {
            Object.values(headers).map((header, i) => <th key={i}>{header}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          tableData.map(data => {
            return (
              <tr key={data.id} className="table__row">
                {
                  Object.keys(headers).map((key, index) => {
                    return(
                      <td  key={index} className="table__content" data-heading={headers[key]}>
                        {Array.isArray(data[key]) ? data[key].toString() : data[key]}
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default ResponsiveTable;

ResponsiveTable.propTypes = {
  headers: PropTypes.object.isRequired,
  tableData: PropTypes.array.isRequired
};
