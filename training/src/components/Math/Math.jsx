import React from 'react';
import PropTypes from 'prop-types';

const Math = (props) => {
  const {
    first, second, operator, children,
  } = props;
  let { result } = props;
  switch (operator) {
  case '+': result = first + second;
    break;
  case '-': result = first - second;
    break;
  case '/': result = first / second;
    break;
  case '*': result = first * second;
    break;
  default:
    result = 'Invalid Operator';
    break;
  }
  if (children) {
    return children(first, second, result);
  }

  return (
    <>
      <p>
        {' '}
        {first}
        {' '}
        {second}
        {' '}
        {operator}
        {' '}
        =
        {' '}
        {result}
      </p>
    </>
  );
};

Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
  result: PropTypes.number.isRequired,
};

Math.defaultProps = {
  children: undefined,
};

export default Math;
