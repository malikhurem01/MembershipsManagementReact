import axios from 'axios';
import { serverURL, routes } from '../Data/serverRoutes';

const supervisorLogin = data => {
  return axios.post(`${serverURL}${routes.supervisorLogin}`, data);
};

const currentUser = token => {
  return axios.get(`${serverURL}${routes.currentUser}`, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const logoutUser = () => {
  localStorage.removeItem('user_jwt');
};

const userService = {
  supervisorLogin,
  currentUser,
  logoutUser
};

export default userService;
