/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../components';

const AuthLayout = ({ children, ...rest }) => (
  <div>
    <Navbar />
    <br />
    <div>{ children }</div>
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default AuthLayout;
