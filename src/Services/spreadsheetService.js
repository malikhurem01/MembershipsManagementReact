import axios from "axios";
import { routes, serverURL } from "../Data/serverRoutes";

const createSpreadsheet = (token, data) => {
  return axios.post(`${serverURL}${routes.createSpreadsheet}`, data, {
    headers: { Authorization: "Bearer " + token },
  });
};

const getAllSpreadsheets = (token, dzematId) => {
  return axios.get(
    `${serverURL}${routes.getAllSpreadsheets}?dzematId=${dzematId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
};

const getActiveSpreadsheet = (token) => {
  return axios.get(`${serverURL}${routes.getActiveSpreadsheet}`, {
    headers: { Authorization: "Bearer " + token },
  });
};

const archiveSpreadsheet = (token, data) => {
  return axios.patch(`${serverURL}${routes.archiveSpreadsheet}`, data, {
    headers: { Authorization: "Bearer " + token },
  });
};

const spreadsheetService = {
  createSpreadsheet,
  getAllSpreadsheets,
  archiveSpreadsheet,
  getActiveSpreadsheet,
};

export default spreadsheetService;
