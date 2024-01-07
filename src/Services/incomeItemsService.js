import axios from 'axios';
import { routes, serverURL } from '../Data/serverRoutes';

const getActiveDonationIncomeItems = (token, dzematId) => {
  let requestUrl = `${serverURL}${routes.getActiveDonationIncomeItems}`;
  if (dzematId) {
    requestUrl = `${serverURL}${routes.getActiveDonationIncomeItems}?dzematId=${dzematId}`;
  }
  return axios.get(requestUrl, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const getArchivedDonationIncomeItems = (token, spreadsheetId, dzematId) => {
  let requestUrl = `${serverURL}${routes.getArchivedDonationIncomeItems}?spreadsheetId=${spreadsheetId}`;
  if (dzematId) {
    requestUrl = `${serverURL}${routes.getArchivedDonationIncomeItems}?spreadsheetId=${spreadsheetId}&dzematId=${dzematId}`;
  }
  return axios.get(requestUrl, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const getActiveIncomeItems = (token, dzematId) => {
  let requestUrl = `${serverURL}${routes.getActiveIncomeItems}`;
  if (dzematId) {
    requestUrl = `${serverURL}${routes.getActiveIncomeItems}?dzematId=${dzematId}`;
  }
  return axios.get(requestUrl, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const getArchivedIncomeItems = (token, spreadsheetId, dzematId) => {
  let requestUrl = `${serverURL}${routes.getArchivedIncomeItems}?spreadsheetId=${spreadsheetId}`;
  if (dzematId) {
    requestUrl = `${serverURL}${routes.getArchivedIncomeItems}?spreadsheetId=${spreadsheetId}&dzematId=${dzematId}`;
  }
  return axios.get(requestUrl, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const createIncomeItem = (token, data) => {
  return axios.post(`${serverURL}${routes.createIncomeItem}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const addDonator = (token, data) => {
  return axios.post(`${serverURL}${routes.addDonator}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const getDonators = token => {
  return axios.get(`${serverURL}${routes.getDonators}`, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const deleteIncomeItem = (token, data) => {
  return axios.post(`${serverURL}${routes.deleteIncomeItem}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const addIncome = (token, data) => {
  return axios.post(`${serverURL}${routes.addIncome}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const deleteIncome = (token, data) => {
  return axios.post(`${serverURL}${routes.deleteIncome}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const incomeItemService = {
  getActiveDonationIncomeItems,
  getArchivedDonationIncomeItems,
  getActiveIncomeItems,
  getArchivedIncomeItems,
  createIncomeItem,
  deleteIncomeItem,
  addIncome,
  deleteIncome,
  addDonator,
  getDonators
};

export default incomeItemService;
