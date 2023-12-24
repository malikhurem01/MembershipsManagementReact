const serverURL = 'https://budgetmanagementiz.azurewebsites.net/api/';
//const serverURL = 'https://localhost:7136/api/';

const routes = {
  supervisorLogin: 'Authentication/login/supervisor',
  currentUser: 'Authentication/current/user',
  modifyUser: 'Authentication/user/modify',
  changeUserPassword: 'Authentication/user/password',
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
  deletePayment: 'Payment/delete',
  getActiveExpenseItems: 'ExpenseItem/active',
  getArchivedExpenseItems: 'ExpenseItem/archived',
  createExpenseItem: 'ExpenseItem/create',
  deleteExpenseItem: 'ExpenseItem/delete',
  addExpense: 'ExpenseItem/add/expense',
  deleteExpense: 'ExpenseItem/delete/expense',
  //
  getActiveDonationIncomeItems: 'IncomeItem/active/donation',
  getArchivedDonationIncomeItems: 'IncomeItem/archived/donation',
  getActiveIncomeItems: 'IncomeItem/active',
  getArchivedIncomeItems: 'IncomeItem/archived',
  createIncomeItem: 'IncomeItem/create',
  deleteIncomeItem: 'IncomeItem/delete',
  addIncome: 'IncomeItem/add/income',
  deleteIncome: 'IncomeItem/delete/income',
  addDonator: 'IncomeItem/donator',
  getDonators: 'IncomeItem/donators'
};

module.exports = { serverURL, routes };
