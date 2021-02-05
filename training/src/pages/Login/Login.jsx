/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button, InputAdornment,
  CardContent, Typography, Card, Avatar, CssBaseline, withStyles,
  CircularProgress,
} from '@material-ui/core';
import { Email, VisibilityOff, LockOutlined } from '@material-ui/icons';
import * as yup from 'yup';
import localStorage from 'local-storage';
import { Redirect } from 'react-router-dom';

import { MyContext } from '../../contexts';

const LoginStyle = (theme) => ({
  main: {
    width: 350,
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(62),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  icon: {
    background: 'red',
    marginLeft: theme.spacing(22),
    marginTop: theme.spacing(2),
  },
});

class Login extends React.Component {
  schema = yup.object().shape({
    email: yup.string()
      .trim().email().required('Email is a required field'),
    password: yup.string()
      .required('Password is a required field')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number'),
  });

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      redirect: false,
      hasError: true,
      touched: {
        Email: false,
        Password: false,
      },
    };
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  };

  hasErrors = () => {
    try {
      this.schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  getError = (field) => {
    const { email, password }= this.state;
    const data = { email: `${email}`, password: `${password}`}
    const { touched } = this.state;
    if (touched[field] && this.hasErrors()) {
      try {
        this.schema.validateSyncAt(field, this.state);
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

  handleRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/trainee" />;
    }
  }

  onClickHandler = async (data, openSnackBar) => {
    const { loginUser } = this.props;
    const { email, password } = data;
    console.log('Data is :', data);
    console.log('loginUser----', loginUser);
    this.setState({
      loading: true,
      hasError: true,
    });
    const response = await loginUser({ variables: { email, password }});
    console.log('ResponseToken', response);
    localStorage.set('token', response.data.loginUser);
    this.setState({ loading: false });
    const Token = localStorage.get('token');
    if (Token !== 'undefined') {
      this.setState({
        redirect: true,
        hasError: false,
        message: 'Successfully Login!',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        message: 'Login Failed, Record Not Found',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      email, password, loading,
    } = this.state;
    this.hasErrors();
    return (
      <>
        <div className={classes.main}>
          <CssBaseline />
          <Card open aria-labelledby="form-dialog-title">
            <Avatar className={classes.icon}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h4" align="center">Login</Typography>
            <CardContent>
              <form>
                <div>
                  <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Email Address"
                    variant="outlined"
                    helperText={this.getError('email')}
                    error={!!this.getError('email')}
                    onChange={this.handleChange('email')}
                    onBlur={() => this.isTouched('email')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <br />
                <div>
                  <TextField
                    required
                    type="password"
                    fullWidth
                    id="outlined-required"
                    label="Password"
                    variant="outlined"
                    helperText={this.getError('password')}
                    error={!!this.getError('password')}
                    onChange={this.handleChange('password')}
                    onBlur={() => this.isTouched('password')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VisibilityOff />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                &nbsp;&nbsp;
                <div>
                  <MyContext.Consumer>
                    {({ openSnackBar }) => (
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={this.hasErrors()}
                        onClick={() => {
                          this.onClickHandler({ email, password }, openSnackBar);
                        }}
                      >
                        {loading && (
                          <CircularProgress />
                        )}
                        {loading && <span>Signing in</span>}
                        {!loading && <span>Sign in</span>}
                        {this.handleRedirect()}
                      </Button>
                    )}
                  </MyContext.Consumer>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(LoginStyle)(Login);
