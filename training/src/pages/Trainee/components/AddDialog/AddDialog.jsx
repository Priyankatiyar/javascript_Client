import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, CircularProgress,
} from '@material-ui/core';
import { Email, VisibilityOff, Person } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import localStorage from 'local-storage';
import schema from './DialogSchema';
import DialogField from './DialogField';
import { MyContext } from '../../../../contexts';
import callApi from '../../../../libs/utils/api';

const stylePassword = () => ({
  passwordField: {
    display: 'flex',
    flexdirection: 'row',
  },
  passwordItem: {
    flex: 1,
  },
});

const constant = {
  name: Person,
  email: Email,
  password: VisibilityOff,
  'Confirm Password': VisibilityOff,
};

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      loading: false,
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  };

    hasErrors = () => {
      try {
        schema.validateSync(this.state);
      } catch (err) {
        return true;
      }
      return false;
    }

    getError = (field) => {
      const { touched } = this.state;
      if (touched[field] && this.hasErrors()) {
        try {
          schema.validateSyncAt(field, this.state);
          return '';
        } catch (err) {
          return err.message;
        }
      }
      return '';
    };

    isTouched = (field) => {
      const { touched } = this.state;
      this.setState({
        touched: {
          ...touched,
          [field]: true,
        },
      });
    }

    passwordType = (key) => {
      if (key === 'password' || key === 'Confirm Password') {
        return 'password';
      }
      return '';
    }

    onClickHandler = async (data, openSnackBar) => {
      this.setState({
        loading: true,
        hasError: true,
      });
      const { onClose } = this.props;
      await callApi(data, 'post', 'trainee');
      this.setState({ loading: false });
      const Token = localStorage.get('token');
      if (Token !== 'undefined') {
        this.setState({
          hasError: false,
          message: 'This is a successfully added trainee message',
        }, () => {
          const { message } = this.state;
          openSnackBar(message, 'success');
        });
      } else {
        this.setState({
          hasError: false,
          message: 'error in submitting',
        }, () => {
          const { message } = this.state;
          openSnackBar(message, 'error');
        });
      }
      onClose();
    }

    formReset = () => {
      this.setState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        touched: {},
      });
    }

    render() {
      const {
        open, onClose, classes,
      } = this.props;
      const {
        name, email, password, confirmPassword, loading,
      } = this.state;
      const textBox = [];
      Object.keys(constant).forEach((key) => {
        textBox.push(<DialogField
          label={key}
          onChange={this.handleChange(key)}
          onBlur={() => this.isTouched(key)}
          helperText={this.getError(key)}
          error={!!this.getError(key)}
          icons={constant[key]}
          type={this.passwordType(key)}
        />);
      });

      return (
        <>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your trainee details
              </DialogContentText>
              <div>
                {textBox[0]}
              </div>
              &nbsp;
              <div>
                {textBox[1]}
              </div>
              &nbsp;
              <div className={classes.passwordField}>
                <div className={classes.passwordItem}>
                  {textBox[2]}
                </div>
                &nbsp;
                &nbsp;
                <div className={classes.passwordItem}>
                  {textBox[3]}
                </div>
              </div>
          &nbsp;
            </DialogContent>
            <DialogActions>
              <div align="right">
                <Button onClick={onClose} color="primary">CANCEL</Button>
                <MyContext.Consumer>
                  {({ openSnackBar }) => (
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={this.hasErrors()}
                      onClick={() => {
                        this.onClickHandler({
                          name, email, password, confirmPassword,
                        }, openSnackBar);
                        this.formReset();
                      }}
                    >
                      {loading && (
                        <CircularProgress size={15} />
                      )}
                      {loading && <span>Submitting</span>}
                      {!loading && <span>Submit</span>}
                    </Button>
                  )}
                </MyContext.Consumer>
              </div>
            </DialogActions>
          </Dialog>
        </>
      );
    }
}
export default withStyles(stylePassword)(AddDialog);
AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
