const serverURL = "https://localhost:7136/api/";
const routes = {
  dzematLogin: "Authentication/login/dzemat",
  supervisorLogin: "Authentication/login/supervisor",
  currentUser: "Authentication/current/user",
  createSpreadsheet: "Spreadsheet/create",
  getAllSpreadsheets: "Spreadsheet/get/all",
  archiveSpreadsheet: "Spreadsheet/archive",
};

module.exports = { serverURL, routes };
