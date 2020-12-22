import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  main: {
    marginTop: theme.spacing.unit * 2,
  },
});

class TraineeDetail extends React.Component {
  getTrainee() {}

  render() {
    const classes = this.props;
    const match = this.props;
  }
};

TraineeDetail.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default withStyles(styles)(TraineeDetail);
