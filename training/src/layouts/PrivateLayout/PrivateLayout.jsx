/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components/index';

const PrivateLayout = ({ children, ...rest }) => (
  <div>
    <div className="main">{children}</div>
  &nbsp;
    <Footer />
  </div>
);

PrivateLayout.propTypes = {
  children: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default PrivateLayout;
