const serverURL = "https://localhost:7136/api/";
const routes = {
  dzematLogin: "Authentication/login/dzemat",
  supervisorLogin: "Authentication/login/supervisor",
  currentUser: "Authentication/current/user",
  createSpreadsheet: "Spreadsheet/create",
  getAllSpreadsheets: "Spreadsheet/get/all",
  archiveSpreadsheet: "Spreadsheet/archive",
  getActiveSpreadsheet: "Spreadsheet/get/active",
  addNewMember: "Member/add",
};

module.exports = { serverURL, routes };
