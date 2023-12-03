import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../../Store/auth-context-api';

import userService from '../../../Services/userService';

const LogoutPage = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  useEffect(() => {
    userService.logoutUser();
    ctx.handleLogoutUser();
    setTimeout(() => navigate('/login/dzemat'), 100);
  }, [ctx, navigate]);

  return;
};

export default LogoutPage;
