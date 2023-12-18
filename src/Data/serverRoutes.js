const serverURL = 'https://budgetmanagementiz.azurewebsites.net/api/';
//const serverURL = 'https://localhost:7136/api/';

const routes = {
  supervisorLogin: 'Authentication/login/supervisor',
  currentUser: 'Authentication/current/user',
  createSpreadsheet: 'Spreadsheet/create',
  getAllSpreadsheets: 'Spreadsheet/get/all',
  getSpreadsheetById: 'Spreadsheet/get/single',
  getSpreadsheetReport: 'Spreadsheet/get/report',
  getDebtWarningReports: 'Spreadsheet/get/debt-warning',
  archiveSpreadsheet: 'Spreadsheet/archive',
  getActiveSpreadsheet: 'Spreadsheet/get/active',
  addNewMember: 'Member/add',
  modifyMember: 'Member/modify',
  filterMembers: 'Member/get/spreadsheet',
  addMemberFamily: 'Member/family/add',
  deleteMemberFamily: 'Member/family/delete',
  getMemberFamily: 'Member/get/family',
  addPayment: 'Payment/add',
  deletePayment: 'Payment/delete'
};

module.exports = { serverURL, routes };
