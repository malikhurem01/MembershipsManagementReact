import axios from 'axios';
import { routes, serverURL } from '../Data/serverRoutes';

const getActiveExpenseItems = token => {
  return axios.get(`${serverURL}${routes.getActiveExpenseItems}`, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const getArchivedExpenseItems = token => {
  return axios.get(`${serverURL}${routes.getArchivedExpenseItems}`, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const createExpenseItem = (token, data) => {
  return axios.post(`${serverURL}${routes.createExpenseItem}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

/*const addIncome = (token, data) => {
  return axios.post(`${serverURL}${routes.addIncome}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};*/

const addExpense = (token, data) => {
  return axios.post(`${serverURL}${routes.addExpense}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

/*const deleteIncome = (token, data) => {
  return axios.post(`${serverURL}${routes.deleteIncome}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};*/

const deleteExpense = (token, data) => {
  return axios.post(`${serverURL}${routes.deleteExpense}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const projectServices = {
  getActiveExpenseItems,
  getArchivedExpenseItems,
  createExpenseItem,
  addExpense,
  deleteExpense
};

export default projectServices;
