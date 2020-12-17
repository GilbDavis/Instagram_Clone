import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { authenticateUser } from '../actions/userActions/authenticateAction'

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...props }) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(authenticateUser());
  }, []);

  return (
    <Route {...props} render={props => !user.isAuthenticated && !user.isLoading ? (
      <Redirect to="/login" />
    ) : (
        <Component {...props} />
      )} />
  );
};

export default PrivateRoute;