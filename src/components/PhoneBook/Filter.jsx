import React from 'react';
import PropTypes from 'prop-types';

import { FilterInput } from './Form.styled';

export const Filter = ({ filter, onChangeValue }) => {
  return (
    <div>
      <FilterInput
        type="text"
        name="filter"
        value={filter}
        onChange={onChangeValue}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func,
};
