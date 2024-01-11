import React, { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from '../../Store/auth-context-api';

const ProtectedRoute = ({ minPosition, maxPosition, children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { userDataState } = useContext(AuthContext);

  const isNotAuthorized = useCallback(
    ({ position }) => {
      return position < minPosition || position > maxPosition;
    },
    [minPosition, maxPosition]
  );

  useEffect(() => {
    if (userDataState) {
      if (isNotAuthorized(userDataState)) {
        return window.location.replace('/neovlasten-pristup');
      } else {
        setIsAuthorized(true);
      }
    } else {
      return window.location.replace('/login/korisnik');
    }
  }, [isNotAuthorized, userDataState]);

  if (isAuthorized) {
    return <React.Fragment>{children}</React.Fragment>;
  }
};

export default ProtectedRoute;
