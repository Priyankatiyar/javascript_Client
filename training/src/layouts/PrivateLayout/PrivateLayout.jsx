/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const PrivateLayout = ({ children, ...rest }) => (
  <div className="main">{children}</div>
);

PrivateLayout.propTypes = {
  children: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default PrivateLayout;
