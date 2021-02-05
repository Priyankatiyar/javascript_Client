import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: '20px',
    textAlign: 'center',
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      &#169;Successive Technologies
    </div>
  );
}
