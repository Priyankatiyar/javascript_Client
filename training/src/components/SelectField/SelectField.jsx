import React from 'react';
import PropTypes from 'prop-types';
import Select from './style';

const SelectField = (props) => {
  const {
    options, defaultOptions, onChange, values,
  } = props;

  return (
    <>
      <Select defaultValue={values} onChange={onChange}>

        {defaultOptions && <option>{defaultOptions}</option>}

        {
          options && options.length && options.map(({ value, label }) => (
            <option key={label} value={value}>{label}</option>
          ))
        }

      </Select>
    </>
  );
};

SelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  defaultOptions: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.string,
};

SelectField.defaultProps = {
  values: 'Default values',
  options: [],
};

export default SelectField;
