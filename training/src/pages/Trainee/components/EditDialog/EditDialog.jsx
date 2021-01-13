import React, { Component } from 'react';
import {
  TextField, Button, Dialog, DialogTitle,
  DialogActions, DialogContentText, DialogContent, CircularProgress,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { MyContext } from '../../../../contexts';
import callApi from '../../../../libs/utils/api';

const schema = yup.object().shape({
  name: yup.string().trim().required('Name is required field'),
  email: yup.string().trim().required('Email Address is required field').email(),
});

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
  input: {
    paddingRight: 5,
  },
});

class EditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      loading: false,
      error: {
        name: '',
        email: '',
      },
      hasError: false,
      touched: {
        name: false,
        email: false,
      },
    };
  }

  handleBlur = (field) => {
    const { touched } = this.state;
    touched[field] = true;
    this.setState({ touched }, () => this.handleValidate());
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  hasErrors = () => {
    const { hasError } = this.state;
    schema.isValid(this.state)
      .then((valid) => {
        if (!valid !== hasError) {
          this.setState({ hasError: !valid });
        }
      });
  }

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  getError = (field) => {
    const { error, touched } = this.state;
    if (touched[field]) {
      schema.validateAt(field, this.state).then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          });
        }
      }).catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          });
        }
      });
    }
    return error[field];
  }

  onEditHandler = async (Data, openSnackBar) => {
    const { onSubmit } = this.props;
    this.setState({
      loading: true,
    });
    const response = await callApi(Data, 'put', 'trainee');
    this.setState({ loading: false });
    if (response && response.status === 'success') {
      this.setState({
        message: 'Trainee Updated Successfully',
      }, () => {
        const { message } = this.state;
        onSubmit(Data);
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        message: 'Error while submitting',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  formReset = () => {
    this.setState({
      name: '',
      email: '',
      touched: {},
    });
  }

  render() {
    const {
      classes, open, onClose, data,
    } = this.props;
    const { name, email, loading } = this.state;
    const { originalId: id } = data;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="simple-dialog-title">Edit Trainee</DialogTitle>
        <DialogContent className={classes.root}>
          <DialogContentText className={classes.Details}>
            Enter your trainee details
          </DialogContentText>
          <TextField
            label="Name *"
            type="name"
            autoComplete="off"
            fullWidth
            defaultValue={data.name}
            helperText={this.getError('name')}
            onBlur={() => this.isTouched('name')}
            onChange={this.handleChange('name')}
            placeholder=""
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <PersonIcon className={classes.input} />
              ),
            }}
            variant="outlined"
          />
          <TextField
            label="Email Address"
            type="email"
            autoComplete="off"
            fullWidth
            defaultValue={data.email}
            helperText={this.getError('email')}
            onBlur={() => this.isTouched('email')}
            onChange={this.handleChange('email')}
            placeholder=""
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <EmailIcon className={classes.input} />
              ),
            }}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <MyContext.Consumer>
            {({ openSnackBar }) => (
              <Button
                onClick={() => {
                  this.onEditHandler({ name, email, id }, openSnackBar);
                  this.formReset();
                }}
                disabled={this.hasErrors()}
                color="primary"
                variant="contained"
              >
                {loading && (
                  <CircularProgress size={15} />
                )}
                {loading && <span>Submitting</span>}
                {!loading && <span>Submit</span>}
              </Button>
            )}
          </MyContext.Consumer>
        </DialogActions>
      </Dialog>
    );
  }
}
EditDialog.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(EditDialog);
