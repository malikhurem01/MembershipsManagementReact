import { createBrowserRouter, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import LoginUserPage from '../Components/Pages/LoginUser/LoginUserPage';
import MainPage from '../Components/Pages/Main/MainPage';
import EmailPage from '../Components/Pages/Email/EmailPage';
import LogoutPage from '../Components/Pages/Logout/LogoutPage';
import CreateSpreadsheetPage from '../Components/Pages/CreateSpreadsheet/CreateSpreadsheetPage';
import ActiveSpreadsheetPage from '../Components/Pages/ActiveSpreadsheet/ActiveSpreadsheetPage';
import ArchiveSpreadsheets from '../Components/Pages/ArchiveSpreadsheets/ArchiveSpreadsheets';
import RegularMemberships from '../Components/Pages/RegularMemberships/RegularMemberships';

import ErrorElement from '../Components/Pages/ErrorPage/ErrorElement';
import IndexPage from '../Components/Pages/IndexPage/IndexPage';
import GenerateReportPage from '../Components/Pages/GenerateReportPage/GenerateReportPage';
import GenerateDebtWarningPage from '../Components/Pages/GenerateDebtWarningPage/GenerateDebtWarningPage';
import ArchivedSpreadsheetPage from '../Components/Pages/ArchivedSpreadsheetPage/ArchivedSpreadsheetPage';
import AccountPage from '../Components/Pages/AccountPage/AccountPage';
import ExpensesPage from '../Components/Pages/ExpensesPage/ExpensesPage';
import ActiveExpenseItemsPage from '../Components/Pages/ActiveProjectPage/ActiveExpenseItemsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
    errorElement: <ErrorElement />
  },
  {
    path: '/login',
    element: (
      <div>
        <Outlet />
      </div>
    ),
    errorElement: <ErrorElement />,
    children: [
      {
        path: 'korisnik',
        element: <LoginUserPage />
      }
    ]
  },
  { path: '/racun/:userId', element: <AccountPage /> },
  { path: '/logout', element: <LogoutPage /> },
  { path: '/email', element: <EmailPage /> },
  { path: '/naslovna', element: <MainPage /> },
  { path: '/clanarine', element: <RegularMemberships /> },
  { path: '/clanarine/kreiraj-bazu', element: <CreateSpreadsheetPage /> },
  { path: '/clanarine/aktivna-baza', element: <ActiveSpreadsheetPage /> },

  { path: '/clanarine/arhiva-baza', element: <ArchiveSpreadsheets /> },
  {
    path: '/clanarine/arhiva-baza/pregled/:spreadsheetId',
    element: <ArchivedSpreadsheetPage />
  },
  { path: '/clanarine/izradi-izvjestaj', element: <GenerateReportPage /> },
  { path: '/clanarine/izradi-opomene', element: <GenerateDebtWarningPage /> },
  { path: '/troskovi', element: <ExpensesPage /> },
  { path: '/troskovi/aktivni-projekti', element: <ActiveExpenseItemsPage /> }
]);
