import React from 'react';
import PropTypes from 'prop-types';
import { FaFilter } from 'react-icons/fa';
import './styles.scss';

const FilterInput = ({ onChange }) => {
  const filterOption = (e) => {
    const { value } = e.target;
    onChange([{
      "type": "all",
      "values": [value]
    }])
  }

  return (
    <div className="input-container">
      <FaFilter />
      <input type="text" onChange={filterOption} placeholder="Filter for books.." />
    </div>
  )
};

export default FilterInput;

FilterInput.propTypes = {
  onChange: PropTypes.func.isRequired
}
