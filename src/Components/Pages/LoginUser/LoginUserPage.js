import { useContext } from 'react';

import userService from '../../../Services/userService';

import LoginFormComponent from '../LoginFormComponent/LoginFormComponent';
import AuthContext from '../../../Store/auth-context-api';

const LoginUserPage = () => {
  const { handleSetResponse } = useContext(AuthContext);

  const handleFormSubmit = (email, institutionUserName, password) => {
    handleSetResponse({ loading: true, success: false });
    userService
      .supervisorLogin({ email, institutionUserName, password })
      .then(res => {
        localStorage.setItem('user_jwt', JSON.stringify(res.data.data.token));
        handleSetResponse({ loading: 'done', success: true });
        if (res.data.data.position !== 5) {
          window.location.replace('/naslovna');
        } else if (res.data.data.position === 5) {
          window.location.replace('/naslovna/glavni-imam');
        }
      })
      .catch(err => {
        handleSetResponse({ loading: 'done', success: false });
        if (err.code === 'ERR_NETWORK') throw new Error(err);
      });
  };

  return <LoginFormComponent onFormSubmit={handleFormSubmit} />;
};

export default LoginUserPage;
