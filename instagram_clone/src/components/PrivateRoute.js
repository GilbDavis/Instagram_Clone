import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...props }) => {

  useEffect(() => {

  }, []);

  return (
    <Route {...props} render={props => !autenticado && !cargando ? (
      <Redirect to="/login" />
    ) : (
        <Component {...props} />
      )} />
  );
};

export default PrivateRoute;