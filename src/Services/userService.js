import axios from 'axios';
import { serverURL, routes } from '../Data/serverRoutes';

const dzematLogin = data => {
  return axios.post(`${serverURL}${routes.dzematLogin}`, data);
};

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
  localStorage.removeItem('dzemat_id');
};

const userService = {
  dzematLogin,
  supervisorLogin,
  currentUser,
  logoutUser
};

export default userService;
