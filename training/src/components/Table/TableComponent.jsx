import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableCell, TableContainer, TableHead, TableRow, Paper, withStyles, TableBody,
  TableSortLabel,
} from '@material-ui/core';

const useStyles = (theme) => ({
  tableContainer: {
    marginLeft: 20,
    width: '97%',
  },
  table: {
    minWidth: 650,
  },
  tableHeader: {
    color: 'grey',
  },
  tableRow: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[100],
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    },
  },
});

function TableComponent(props) {
  const {
    classes, data, column, order, orderBy, onSort, onSelect,
  } = props;

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {
              column.length && column.map(({
                align, field, lable,
              }) => (
                <TableCell
                  align={align}
                  className={classes.tableHeader}
                >
                  <TableSortLabel
                    active={orderBy === field}
                    direction={orderBy === field ? order : 'asc'}
                    onClick={onSort(field)}
                  >
                    {lable}
                  </TableSortLabel>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data && data.length && data.map((item) => (
              <TableRow className={classes.tableRow}>
                {
                  column.length && column.map(({ align, field, format }) => (
                    <TableCell onClick={(event) => onSelect(event, item.name)} align={align}>
                      {format ? format(item[field]) : item[field]}
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
TableComponent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};
TableComponent.defaultProps = {
  order: '',
  orderBy: '',
};
export default withStyles(useStyles)(TableComponent);
