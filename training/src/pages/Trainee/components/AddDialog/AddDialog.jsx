import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText,
} from '@material-ui/core';
import { Email, VisibilityOff, Person } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import schema from './DialogSchema';
import DialogField from './DialogField';

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
  Name: Person,
  Email,
  Password: VisibilityOff,
  'Confirm Password': VisibilityOff,
};

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
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
      if (key === 'Password' || key === 'Confirm Password') {
        return 'password';
      }
      return '';
    }

    render() {
      const {
        open, onClose, onSubmit, classes,
      } = this.props;
      const { name, email, password } = this.state;
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
              <div align="right">
                <Button onClick={onClose} color="primary">CANCEL</Button>
                <Button variant="contained" color="primary" disabled={this.hasErrors()} onClick={() => onSubmit()({ name, email, password })}>SUBMIT</Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    }
}
export default withStyles(stylePassword)(AddDialog);
AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
