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

const getSpreadsheetReport = (token, spreadsheetYear, dzematId) => {
  let requestUrl = `${serverURL}${routes.getSpreadsheetReport}?spreadsheetYear=${spreadsheetYear}`;
  if (dzematId) {
    requestUrl = `${serverURL}${routes.getSpreadsheetReport}?spreadsheetYear=${spreadsheetYear}&dzematId=${dzematId}`;
  }
  return axios.get(requestUrl, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const getDebtWarningReports = token => {
  return axios.get(`${serverURL}${routes.getDebtWarningReports}`, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const getActiveSpreadsheet = (token, dzematId) => {
  let requestUrl = `${serverURL}${routes.getActiveSpreadsheet}`;
  if (dzematId) {
    requestUrl = `${serverURL}${routes.getActiveSpreadsheet}?dzematId=${dzematId}`;
  }
  return axios.get(requestUrl, {
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
