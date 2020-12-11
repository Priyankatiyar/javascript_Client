import React from 'react';
import PropTypes from 'prop-types';
import { Error, Input } from './style';

const TextField = (props) => {
  const {
    disabled, error, onChange,
  } = props;

  return (
    <>
      <Input type="text" onChange={onChange} defaultValue="" disabled={disabled} />
      <Error>{error}</Error>
    </>
  );
};

TextField.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextField.defaultProps = {
  disabled: false,
  error: '',
};

export default TextField;
