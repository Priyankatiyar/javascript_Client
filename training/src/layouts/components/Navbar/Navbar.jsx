import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  logout: {
    flexGrow: 0.05,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trainee Portal
          </Typography>
          <Button component={Link} to="/" color="inherit">TRAINEE</Button>
          <Button component={Link} to="/text-field" color="inherit">TEXTFIELD DEMO</Button>
          <Button component={Link} to="/inputDemo" color="inherit">INPUT DEMO</Button>
          <Button component={Link} to="/childrenDemo" color="inherit">CHILDREN DEMO</Button>
          &nbsp;&nbsp;
          <Button color="inherit" className={classes.logout}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
