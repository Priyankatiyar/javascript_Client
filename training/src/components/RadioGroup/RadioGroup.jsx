import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const {
    options, onChange,
  } = props;
  return (
    <>
      {
        options && options.length && options.map(({ value, label }) => (
          <Fragment key={label}>
            <input type="radio" name="game" value={value} onChange={(event) => onChange(event)} />
            {label}
            <br />
          </Fragment>
        ))
      }
    </>
  );
};
RadioGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
RadioGroup.defaultProps = {
};
export default RadioGroup;
