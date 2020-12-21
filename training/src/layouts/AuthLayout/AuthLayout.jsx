/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const AuthLayout = ({ children, ...rest }) => (
  <div>{ children }</div>
);

AuthLayout.propTypes = {
  children: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default AuthLayout;
