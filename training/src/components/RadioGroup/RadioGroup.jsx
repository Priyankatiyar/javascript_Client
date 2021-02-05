import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Err } from './style';

const RadioGroup = (props) => {
  const {
    options, onChange, error, onBlur,
  } = props;

  return (
    <>
      {
        options && options.length && options.map(({ value, label }) => (
          <Fragment key={label}>
            <Input type="radio" name="game" value={value} onChange={(event) => onChange(event)} onBlur={onBlur} error={error} />
            {label}
            <br />
          </Fragment>
        ))
      }
      <Err>{error}</Err>
    </>
  );
};

RadioGroup.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  onBlur: PropTypes.string.isRequired,
};

RadioGroup.defaultProps = {
  error: '',
  options: [],
};

export default RadioGroup;
