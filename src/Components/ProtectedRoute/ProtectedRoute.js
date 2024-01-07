import React, { useContext, useEffect } from 'react';
import AuthContext from '../../Store/auth-context-api';

const ProtectedRoute = ({ minPosition, maxPosition, children }) => {
  const { userDataState } = useContext(AuthContext);

  useEffect(() => {
    if (
      userDataState.position < minPosition ||
      userDataState.position > maxPosition
    ) {
      return window.location.replace('/neovlasten-pristup');
    }
  }, [userDataState, minPosition, maxPosition]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default ProtectedRoute;
