import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableCell, TableContainer, TableHead, TableRow, Paper, withStyles, TableBody,
} from '@material-ui/core';

const useStyles = () => ({
  table: {
    minWidth: 650,
  },
  header: {
    color: 'grey',
  },

});

function TableComponent(props) {
  const { classes, data, column } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {
              column.map(({ align, label }) => (
                <TableCell className={classes.header} align={align}>{label}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ name, email }) => (
            <TableRow>
              <TableCell align={column[0].align}>
                {name}
              </TableCell>
              <TableCell>{email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
TableComponent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default withStyles(useStyles)(TableComponent);
