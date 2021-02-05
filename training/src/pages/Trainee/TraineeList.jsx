/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from '@apollo/react-components';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddDialog, RemoveDialog, EditDialog } from './components/index';
import trainees from './data/trainee';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import { GET_TRAINEE } from './query';
import { TableComponent } from '../../components';
import { MyContext } from '../../contexts/index';
import { getDateFormatted } from '../../libs/utils/getDateFormatted';
import { UPDATE_TRAINEE, CREATE_TRAINEE } from './mutation';

const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  dialog: {
    textAlign: 'right',
  },
});

class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      EditOpen: false,
      DeleteOpen: false,
      selected: '',
      orderBy: '',
      order: '',
      page: 0,
      rowsPerPage: 6,
      editData: {},
      deleteData: {},
      count: 0,
      limit: 10,
      skip: 0,
      dataObj: [],
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { open } = this.state;
    this.setState({ open: false });
    return open;
  };

  handleEditButton = (data) => {
    this.setState({ EditOpen: false }, () => { console.log('Edited Item ', data);
  });
  }

  handleDeleteButton = (data) => {
    this.setState({ DeleteOpen: false }, () => { console.log('Deleted Item ', data.data);
    const { page } = this.state;
    if (page > 0) {
      this.setState({ page: page - 1 });
    }
  });
  };

  handleSelect = (event, data) => {
    this.setState({ selected: event.target.value }, () => console.log('Data', data));
  };

  handleSort = (field) => () => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  }

  handleEditDialogOpen = (data) => {
    this.setState({ EditOpen: true, editData: data });
  }

  handleRemoveDialogOpen = (data) => {
    this.setState({ DeleteOpen: true, deleteData: data });
  }

  handleChangePage = (refetch) => (event, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({
      page: newPage,
    }, () => {
      refetch({ skip: newPage * (rowsPerPage.length), limit: rowsPerPage.length });
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

  onClickAdd = async (data, openSnackBar, createTrainee, refetch) => {
    try {
      const { name, email, password } = data;
      console.log('data in ckickaaadd:', name, email, password);
      await createTrainee({ variables: { name, email, password } });
      refetch();
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Trainee Created Successfully', 'success');
      });
    } catch (err) {
      console.log('err :', err);
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Creating', 'error');
      });
    }
  }

  onClickEdit = async (data, openSnackBar, updateTrainee, refetch) => {
    try {
      const { name, email, id } = data;
      console.log('editTraineelist==', data);
      await updateTrainee({ variables: { name, email, id } });
      refetch();
      this.setState({
        EditOpen: false,
      }, () => {
        openSnackBar('Trainee Updated Successfully', 'success');
      });
    } catch (err) {
      console.log('err :', err);
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Updating', 'error');
      });
    }
  };

  render() {
    const { open, order, orderBy, EditOpen,
      page, rowsPerPage, editData, DeleteOpen, deleteData, } = this.state;
      console.log('deleteData',deleteData);
    const { classes } = this.props;
    const {
      data: {
        getAllTrainees: { data = [], totalCount = 0 } = {},
        refetch,
        loading,
      },
    } = this.props;
    const variables = { skip: page * rowsPerPage.length, limit: rowsPerPage.length };
    console.log('dduygd', data[0]);
    return (
      <>
        <Mutation
          mutation={CREATE_TRAINEE}
          refetchQueries={[{ query: GET_TRAINEE, variables }]}
        >
          {(createTrainee, createrLoader = { loading }) => (
            <Mutation
              mutation={UPDATE_TRAINEE}
              refetchQueries={[{ query: GET_TRAINEE, variables }]}
            >
              {(updateTrainee, updateLoader = { loading }) => (
                <MyContext.Consumer>
                  {({ openSnackBar }) => (
                    <>
                      <div className={classes.root}>
                        <div className={classes.dialog}>
                          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                            ADD TRAINEELIST
                          </Button>
                        </div>
                        <AddDialog open={open} onClose={this.handleClose} onSubmit={
                              (data) => this.onClickAdd(
                                data, openSnackBar, createTrainee, refetch,
                              )
                            }
                            loading={createrLoader}
                        />
                        &nbsp;
                        &nbsp;
                        <EditDialog
                          onClose={this.handleEditButton}
                          open={EditOpen}
                          onSubmit={
                            (data) => this.onClickEdit(
                              data, openSnackBar, updateTrainee, refetch,
                            )
                          }
                          handleEdit={this.handleEditButton}
                          data={editData}
                          loading={updateLoader}
                        />
                        <RemoveDialog
                          data={deleteData}
                          onClose={this.handleDeleteButton}
                          onSubmit={this.handleDeleteButton}
                          open={DeleteOpen}
                          refetch={refetch}
                        />
                        <TableComponent
                          loader={loading}
                          id="id"
                          data={data[0]}
                          column={
                            [
                              {
                                field: 'name',
                                lable: 'Name',
                              },
                              {
                                field: 'email',
                                lable: 'Email Address',
                                format: (value) => value && value.toUpperCase(),
                              },
                              {
                                field: 'createdAt',
                                lable: 'Date',
                                align: 'right',
                                format: getDateFormatted,
                              },
                            ]
                          }
                          actions={[
                            {
                              icon: <EditIcon />,
                              handler: this.handleEditDialogOpen,
                            },
                            {
                              icon: <DeleteIcon />,
                              handler: this.handleRemoveDialogOpen,
                            },
                          ]}
                          orderBy={orderBy}
                          order={order}
                          onSort={this.handleSort}
                          onSelect={this.handleSelect}
                          count={totalCount}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          onChangePage={this.handleChangePage(refetch)}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                      </div>
                    </>
                  )}
                </MyContext.Consumer>
              )}
            </Mutation>
          )}
        </Mutation>
      </>
    );
  }
}
TraineeList.contextType = MyContext;
TraineeList.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default Compose (
  withStyles(useStyles),
  graphql(GET_TRAINEE, {
    options: { variables: { skip: 0, limit: 10, sort: 'email'}}
  }),
)(TraineeList);
