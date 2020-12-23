/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
  Redirect,
} from 'react-router-dom';
import {
  Login, InputDemo, ChildrenDemo, Trainee, TextFieldDemo,
  NoMatch,
} from './pages';
import { AuthRoute, PrivateRoute } from './routes/index';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/trainee" />
          </Route>
          <PrivateRoute path="/login" component={Login} />
          <AuthRoute path="/text-field" component={TextFieldDemo} />
          <AuthRoute path="/childrenDemo" component={ChildrenDemo} />
          <AuthRoute path="/inputDemo" component={InputDemo} />
          <AuthRoute path="/trainee" component={Trainee} />
          <AuthRoute component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
