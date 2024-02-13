// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
  
    <>
        {isAuthenticated ? 
        props.children
         : (
          <Navigate to="/Signin" replace />
        )
      }
    </>
  );
}

export default PrivateRoute;
