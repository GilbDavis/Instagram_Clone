import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Login from './pages/Login/index';
import Home from './pages/Home/index';
import Register from './pages/Signup/index';
import PrivateRoute from './components/PrivateRoute';

function App(props) {

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
