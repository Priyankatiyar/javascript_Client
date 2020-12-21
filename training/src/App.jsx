/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
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
            <AuthRoute component={Trainee} />
          </Route>
          <AuthRoute path="/login" component={Login} />
          <PrivateRoute path="/text-field" component={TextFieldDemo} />
          <PrivateRoute path="/childrenDemo" component={ChildrenDemo} />
          <PrivateRoute path="/inputDemo" component={InputDemo} />
          <PrivateRoute component={NoMatch} />

        </Switch>
      </Router>
    );
  }
}

export default App;
