import axios from 'axios';
import { routes, serverURL } from '../Data/serverRoutes';

const getActiveExpenseItems = (token, dzematId) => {
  let requestUrl = `${serverURL}${routes.getActiveExpenseItems}`;
  if (dzematId) {
    requestUrl = `${serverURL}${routes.getActiveExpenseItems}?dzematId=${dzematId}`;
  }
  return axios.get(requestUrl, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const getArchivedExpenseItems = (token, spreadsheetId, dzematId) => {
  let requestUrl = `${serverURL}${routes.getArchivedExpenseItems}?spreadsheetId=${spreadsheetId}`;
  if (dzematId) {
    requestUrl = `${serverURL}${routes.getArchivedExpenseItems}?spreadsheetId=${spreadsheetId}&dzematId=${dzematId}`;
  }
  return axios.get(requestUrl, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const createExpenseItem = (token, data) => {
  return axios.post(`${serverURL}${routes.createExpenseItem}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const deleteExpenseItem = (token, data) => {
  return axios.post(`${serverURL}${routes.deleteExpenseItem}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const addExpense = (token, data) => {
  return axios.post(`${serverURL}${routes.addExpense}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const deleteExpense = (token, data) => {
  return axios.post(`${serverURL}${routes.deleteExpense}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const projectServices = {
  getActiveExpenseItems,
  getArchivedExpenseItems,
  createExpenseItem,
  deleteExpenseItem,
  addExpense,
  deleteExpense
};

export default projectServices;
