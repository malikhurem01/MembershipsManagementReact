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
import DonationsPage from '../Components/Pages/DonationsPage/DonationsPage';
import ActiveDonationsPage from '../Components/Pages/ActiveDonationsPage/ActiveDonationsPage';
import IncomesPage from '../Components/Pages/IncomesPage/IncomesPage';
import ActiveIncomesPage from '../Components/Pages/ActiveIncomesPage/ActiveIncomesPage';
import ArchivedFinance from '../Components/Pages/ArchivedFinance/ArchivedFinance';
import GlavniImamPage from '../Components/Pages/GlavniImamPage/GlavniImamPage';
import ListDzemataPage from '../Components/Pages/ListDzemataPage/ListDzemataPage';

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
  { path: '/naslovna/glavni-imam', element: <GlavniImamPage /> },
  { path: '/pregled/lista/dzemata', element: <ListDzemataPage /> },
  {
    path: '/pregled/lista/dzemata/:dzematId',
    element: <MainPage supervisorView={true} />
  },
  {
    path: '/pregled/lista/dzemata/clanarine/:dzematId',
    element: <RegularMemberships supervisorView={true} />
  },
  { path: '/clanarine', element: <RegularMemberships /> },
  { path: '/clanarine/kreiraj-bazu', element: <CreateSpreadsheetPage /> },
  {
    path: '/pregled/lista/dzemata/clanarine/aktivna-baza/:dzematId',
    element: <ActiveSpreadsheetPage supervisorView={true} />
  },
  { path: '/clanarine/aktivna-baza', element: <ActiveSpreadsheetPage /> },

  {
    path: '/pregled/lista/dzemata/clanarine/arhiva-baza/:dzematId',
    element: <ArchiveSpreadsheets supervisorView={true} />
  },
  { path: '/clanarine/arhiva-baza', element: <ArchiveSpreadsheets /> },

  {
    path: '/pregled/lista/dzemata/clanarine/arhiva-baza/pregled/:dzematId/:spreadsheetId',
    element: <ArchivedSpreadsheetPage supervisorView={true} />
  },
  {
    path: '/clanarine/arhiva-baza/pregled/:spreadsheetId',
    element: <ArchivedSpreadsheetPage />
  },

  {
    path: '/pregled/lista/dzemata/clanarine/izradi-izvjestaj/:dzematId',
    element: <GenerateReportPage supervisorView={true} />
  },

  { path: '/clanarine/izradi-izvjestaj', element: <GenerateReportPage /> },
  { path: '/clanarine/izradi-opomene', element: <GenerateDebtWarningPage /> },
  { path: '/troskovi', element: <ExpensesPage /> },
  { path: '/troskovi/aktivni-troskovi', element: <ActiveExpenseItemsPage /> },
  {
    path: '/troskovi/arhivirani-troskovi/:spreadsheetId',
    element: <ArchivedFinance />
  },
  { path: '/donacije', element: <DonationsPage /> },
  { path: '/donacije/aktivne-donacije', element: <ActiveDonationsPage /> },
  {
    path: '/donacije/arhivirane-donacije/:spreadsheetId',
    element: <ArchivedFinance />
  },
  { path: '/prihodi', element: <IncomesPage /> },
  { path: '/prihodi/aktivni-prihodi', element: <ActiveIncomesPage /> },
  {
    path: '/prihodi/arhivirani-prihodi/:spreadsheetId',
    element: <ArchivedFinance />
  },
  { path: '/email-zahvale', element: <EmailPage /> }
]);
