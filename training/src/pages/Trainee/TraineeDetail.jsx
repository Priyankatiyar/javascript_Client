import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import {
  withStyles, Card, CardContent, Typography, CardMedia, Button,
} from '@material-ui/core';
import trainees from './data/trainee';
import { NoMatch } from '../NoMatch';

const style = (theme) => ({
  root: {
    display: 'flex',
    height: 160,
    margin: theme.spacing(5),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 170,
    backgroundColor: '#545454',
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginLeft: theme.spacing(5),
  },
  back: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    color: 'black',
    marginLeft: theme.spacing(80),
  },
});

function TraineeDetail(props) {
  const { classes } = props;
  const { match } = props;
  const traineeData = trainees.find(({ id }) => id === match.params.traineeId);
  const getDateFormatted = () => moment(traineeData.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
  if (traineeData === undefined) {
    return (
      <Route component={NoMatch} />
    );
  }
  return (
    <>
      <Card className={classes.root}>
        <CardMedia className={classes.cover}>
          <div className={classes.text}>Thumbnail</div>
        </CardMedia>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {traineeData.name}
            </Typography>
            <Typography component="subtitle1" color="textSecondary">
              {getDateFormatted()}
            </Typography>
            <Typography component="h6" variant="h6">
              {traineeData.email}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <Button color="inherit" className={classes.back} component={Link} to="/trainee">
        Back
      </Button>
    </>
  );
}
TraineeDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(style)(TraineeDetail);
