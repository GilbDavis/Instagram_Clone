import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...props }) => {

  const user = useSelector(state => state.user);

  return (
    <Route {...props} render={props => !user.isAuthenticated && !user.isLoading ? (
      <Redirect to="/login" />
    ) : (
        <Component {...props} />
      )} />
  );
};

export default PrivateRoute;