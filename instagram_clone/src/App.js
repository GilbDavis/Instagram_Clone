import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import authenticateToken from './utils/authenticateToken';

import Login from './pages/Login/index';
import Home from './pages/Home/index';
import Register from './pages/Signup/index';
import PrivateRoute from './components/PrivateRoute';

function App(props) {

  const token = localStorage.getItem("authToken");
  if (token) {
    authenticateToken(token);
  }

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
      </Switch>
    </Router >
  );
}

export default App;
