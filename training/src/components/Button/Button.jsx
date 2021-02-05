import React from 'react';
import PropTypes from 'prop-types';
import Buttons from './style';

const Button = (props) => {
  const {
    color, disabled, style, value, onClick,
  } = props;

  return (
    <>
      <Buttons
        type={value}
        color={color}
        style={style}
        disabled={disabled}
        onClick={onClick}
      >
        {value}
      </Buttons>
    </>

  );
};
Button.propTypes = {
  value: PropTypes.string.isRequired,
  color: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  color: 'default' || 'primary',
  disabled: false,
  style: {},
};

export default Button;
