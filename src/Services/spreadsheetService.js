import axios from 'axios';
import { routes, serverURL } from '../Data/serverRoutes';

const createSpreadsheet = (token, data) => {
  return axios.post(`${serverURL}${routes.createSpreadsheet}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const getSpreadsheetById = (token, spreadsheetId) => {
  return axios.get(
    `${serverURL}${routes.getSpreadsheetById}?spreadsheetId=${spreadsheetId}`,
    {
      headers: { Authorization: 'Bearer ' + token }
    }
  );
};

const getAllSpreadsheets = (token, dzematId) => {
  return axios.get(
    `${serverURL}${routes.getAllSpreadsheets}?dzematId=${dzematId}`,
    {
      headers: { Authorization: 'Bearer ' + token }
    }
  );
};

const getSpreadsheetReport = (token, spreadsheetYear) => {
  return axios.get(
    `${serverURL}${routes.getSpreadsheetReport}?spreadsheetYear=${spreadsheetYear}`,
    {
      headers: { Authorization: 'Bearer ' + token }
    }
  );
};

const getDebtWarningReports = token => {
  return axios.get(`${serverURL}${routes.getDebtWarningReports}`, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const getActiveSpreadsheet = token => {
  return axios.get(`${serverURL}${routes.getActiveSpreadsheet}`, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const archiveSpreadsheet = (token, data) => {
  return axios.patch(`${serverURL}${routes.archiveSpreadsheet}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const spreadsheetService = {
  createSpreadsheet,
  getAllSpreadsheets,
  getSpreadsheetReport,
  getDebtWarningReports,
  archiveSpreadsheet,
  getActiveSpreadsheet,
  getSpreadsheetById
};

export default spreadsheetService;
