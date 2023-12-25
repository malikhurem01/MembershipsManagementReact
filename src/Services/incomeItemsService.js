import axios from 'axios';
import { routes, serverURL } from '../Data/serverRoutes';

const getActiveDonationIncomeItems = token => {
  return axios.get(`${serverURL}${routes.getActiveDonationIncomeItems}`, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const getArchivedDonationIncomeItems = (token, spreadsheetId) => {
  return axios.get(
    `${serverURL}${routes.getArchivedDonationIncomeItems}?spreadsheetId=${spreadsheetId}`,
    {
      headers: { Authorization: 'Bearer ' + token }
    }
  );
};

const getActiveIncomeItems = token => {
  return axios.get(`${serverURL}${routes.getActiveIncomeItems}`, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const getArchivedIncomeItems = (token, spreadsheetId) => {
  return axios.get(
    `${serverURL}${routes.getArchivedIncomeItems}?spreadsheetId=${spreadsheetId}`,
    {
      headers: { Authorization: 'Bearer ' + token }
    }
  );
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
