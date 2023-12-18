import axios from 'axios';
import { serverURL, routes } from '../Data/serverRoutes';

const supervisorLogin = data => {
  return axios.post(`${serverURL}${routes.supervisorLogin}`, data);
};

const modifyUser = (token, data) => {
  return axios.patch(`${serverURL}${routes.modifyUser}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const changeUserPassword = (token, data) => {
  return axios.patch(`${serverURL}${routes.changeUserPassword}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
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
  changeUserPassword,
  modifyUser,
  currentUser,
  logoutUser
};

export default userService;
