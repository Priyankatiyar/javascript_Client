import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

function Trainee(props) {
  const { match: { path } } = props;
  return (
    <Switch>
      <Route exact path={path} component={TraineeList} />
      <Route exact path={`${path}/:traineeId`} component={TraineeDetail} />
    </Switch>
  );
}
Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default Trainee;
