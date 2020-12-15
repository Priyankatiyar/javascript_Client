import React from 'react';
import PropTypes from 'prop-types';
import { Error, Input } from './style';

const TextField = (props) => {
  const {
    disabled, value, error, onChange, onBlur,
  } = props;

  return (
    <>
      <Input type="text" onChange={onChange} onBlur={onBlur} value={value} disabled={disabled} />
      <Error>{error}</Error>
    </>
  );
};

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.string.isRequired,

};

TextField.defaultProps = {
  disabled: false,
  error: '',
};

export default TextField;
