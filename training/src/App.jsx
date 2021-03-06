/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
  Redirect,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-components';
import {
  Login, InputDemo, ChildrenDemo, Trainee, TextFieldDemo,
  NoMatch,
} from './pages';
import apolloClient from './libs/apollo-client';
import { AuthRoute, PrivateRoute } from './routes/index';
import { SnackBarProvider } from './contexts';

class App extends Component {
  render() {
    return (
      <Router>
        <SnackBarProvider>
          <ApolloProvider client={apolloClient}>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/trainee" />
              </Route>
              <AuthRoute path="/login" component={Login} />
              <PrivateRoute path="/text-field" component={TextFieldDemo} />
              <PrivateRoute path="/childrenDemo" component={ChildrenDemo} />
              <PrivateRoute path="/inputDemo" component={InputDemo} />
              <PrivateRoute path="/trainee" component={Trainee} />
              <PrivateRoute component={NoMatch} />
            </Switch>
          </ApolloProvider>
        </SnackBarProvider>
      </Router>
    );
  }
}

export default App;
