import { useContext, useEffect } from 'react';

import AuthContext from '../../../Store/auth-context-api';

import userService from '../../../Services/userService';

const LogoutPage = () => {
  const ctx = useContext(AuthContext);

  useEffect(() => {
    userService.logoutUser();
    ctx.handleLogoutUser();
    window.location.replace('/');
  }, [ctx]);

  return;
};

export default LogoutPage;
