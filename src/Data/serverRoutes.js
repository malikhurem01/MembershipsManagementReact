const serverURL = "https://membershipsmanagement.azurewebsites.net/api/";
const routes = {
  dzematLogin: "Authentication/login/dzemat",
  supervisorLogin: "Authentication/login/supervisor",
  currentUser: "Authentication/current/user",
  createSpreadsheet: "Spreadsheet/create",
  getAllSpreadsheets: "Spreadsheet/get/all",
  archiveSpreadsheet: "Spreadsheet/archive",
  getActiveSpreadsheet: "Spreadsheet/get/active",
  addNewMember: "Member/add",
  modifyMember: "Member/modify",
  filterMembers: "Member/get/all/filter",
  addMemberFamily: "Member/family/add",
  getMemberFamily: "Member/get/family",
  addPayment: "Payment/add",
  deletePayment: "Payment/delete",
};

module.exports = { serverURL, routes };
