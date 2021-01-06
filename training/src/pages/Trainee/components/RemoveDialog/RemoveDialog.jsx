import React, { Component } from 'react';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { DialogActions, DialogContentText, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import { MyContext } from '../../../../contexts';

const useStyles = () => ({
  buttonColor: {
    backgroundColor: 'red',
    color: 'white',
  },
});

class RemoveDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleChange = (prop) => (event) => {
    // eslint-disable-next-line no-console
    this.setState({ [prop]: event.target.value }, () => console.log(this.state));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSnackBarMessage = (data, openSnackBar) => {
    const date = '2019-02-14T18:15:11.778Z';
    const isAfter = (moment(data.createdAt).isAfter(date));
    if (isAfter) {
      this.setState({
        message: 'Trainee Deleted Successfully ',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        message: 'Error While Deleting Trainee',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  render() {
    const {
      classes, open, onClose, onSubmit, data,
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={() => this.handleClose()}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
        <DialogContentText style={{ marginLeft: 25 }}>
          Do you really want to remove the trainee?
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <MyContext.Consumer>
              {({ openSnackBar }) => (
                <Button
                  className={classes.buttonColor}
                  variant="contained"
                  onClick={() => {
                    onSubmit({ data });
                    this.handleSnackBarMessage(data, openSnackBar);
                  }}
                >
                  Delete
                </Button>
              )}
            </MyContext.Consumer>
          </DialogActions>
        </DialogContentText>
      </Dialog>
    );
  }
}

RemoveDialog.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(RemoveDialog);
