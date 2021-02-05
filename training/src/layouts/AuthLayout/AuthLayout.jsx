/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';

const AuthLayout = ({ children, ...rest }) => (
  <div>
    <div className="main">{children}</div>
&nbsp;
    <Footer />
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default AuthLayout;
