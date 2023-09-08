import React,{useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './auth/context';

const PrivateRoute = ({ component: Component,children, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const check = isAuthenticated();

  return check ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;