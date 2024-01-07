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
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute';

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
  {
    path: '/neovlasten-pristup',
    element: <ErrorElement type="unauthorized" />
  },
  {
    path: '/racun/:userId',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={5}>
        <AccountPage />
      </ProtectedRoute>
    )
  },
  { path: '/logout', element: <LogoutPage /> },
  { path: '/email', element: <EmailPage /> },
  {
    path: '/naslovna',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <MainPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/naslovna/glavni-imam',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <GlavniImamPage />{' '}
      </ProtectedRoute>
    )
  },
  {
    path: '/pregled/lista/dzemata',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <ListDzemataPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/pregled/lista/dzemata/:dzematId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <MainPage supervisorView={true} />
      </ProtectedRoute>
    )
  },
  {
    path: '/pregled/lista/dzemata/clanarine/:dzematId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <RegularMemberships supervisorView={true} />
      </ProtectedRoute>
    )
  },
  {
    path: '/clanarine',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <RegularMemberships />
      </ProtectedRoute>
    )
  },
  {
    path: '/clanarine/kreiraj-bazu',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <CreateSpreadsheetPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/pregled/lista/dzemata/clanarine/aktivna-baza/:dzematId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <ActiveSpreadsheetPage supervisorView={true} />
      </ProtectedRoute>
    )
  },
  {
    path: '/clanarine/aktivna-baza',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <ActiveSpreadsheetPage />
      </ProtectedRoute>
    )
  },

  {
    path: '/pregled/lista/dzemata/clanarine/arhiva-baza/:dzematId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <ArchiveSpreadsheets supervisorView={true} />
      </ProtectedRoute>
    )
  },
  {
    path: '/clanarine/arhiva-baza',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <ArchiveSpreadsheets />
      </ProtectedRoute>
    )
  },
  {
    path: '/pregled/lista/dzemata/clanarine/arhiva-baza/pregled/:dzematId/:spreadsheetId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <ArchivedSpreadsheetPage supervisorView={true} />
      </ProtectedRoute>
    )
  },
  {
    path: '/clanarine/arhiva-baza/pregled/:spreadsheetId',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <ArchivedSpreadsheetPage />
      </ProtectedRoute>
    )
  },

  {
    path: '/pregled/lista/dzemata/clanarine/izradi-izvjestaj/:dzematId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <GenerateReportPage supervisorView={true} />
      </ProtectedRoute>
    )
  },

  {
    path: '/clanarine/izradi-izvjestaj',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <GenerateReportPage />{' '}
      </ProtectedRoute>
    )
  },
  {
    path: '/clanarine/izradi-opomene',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <GenerateDebtWarningPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/pregled/lista/dzemata/troskovi/:dzematId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <ExpensesPage supervisorView={true} />
      </ProtectedRoute>
    )
  },
  {
    path: '/troskovi',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <ExpensesPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/pregled/lista/dzemata/troskovi/aktivni-troskovi/:dzematId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <ActiveExpenseItemsPage supervisorView={true} />
      </ProtectedRoute>
    )
  },
  {
    path: '/troskovi/aktivni-troskovi',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <ActiveExpenseItemsPage />{' '}
      </ProtectedRoute>
    )
  },

  {
    path: '/pregled/lista/dzemata/troskovi/arhivirani-troskovi/pregled/:dzematId/:spreadsheetId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <ArchivedFinance supervisorView={true} />
      </ProtectedRoute>
    )
  },
  {
    path: '/troskovi/arhivirani-troskovi/:spreadsheetId',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <ArchivedFinance />
      </ProtectedRoute>
    )
  },
  {
    path: '/pregled/lista/dzemata/donacije/:dzematId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <DonationsPage supervisorView={true} />
      </ProtectedRoute>
    )
  },
  {
    path: '/donacije',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <DonationsPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/pregled/lista/dzemata/donacije/aktivne-donacije/:dzematId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <ActiveDonationsPage supervisorView={true} />
      </ProtectedRoute>
    )
  },
  {
    path: '/donacije/aktivne-donacije',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <ActiveDonationsPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/pregled/lista/dzemata/donacije/arhivirane-donacije/pregled/:dzematId/:spreadsheetId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <ArchivedFinance supervisorView={true} />
      </ProtectedRoute>
    )
  },
  {
    path: '/donacije/arhivirane-donacije/:spreadsheetId',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <ArchivedFinance />
      </ProtectedRoute>
    )
  },
  {
    path: '/pregled/lista/dzemata/prihodi/:dzematId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <IncomesPage supervisorView={true} />
      </ProtectedRoute>
    )
  },
  {
    path: '/prihodi',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <IncomesPage />{' '}
      </ProtectedRoute>
    )
  },
  {
    path: '/pregled/lista/dzemata/prihodi/aktivni-prihodi/:dzematId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <ActiveIncomesPage supervisorView={true} />
      </ProtectedRoute>
    )
  },
  {
    path: '/prihodi/aktivni-prihodi',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <ActiveIncomesPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/pregled/lista/dzemata/prihodi/arhivirani-prihodi/pregled/:dzematId/:spreadsheetId',
    element: (
      <ProtectedRoute minPosition={5} maxPosition={5}>
        <ArchivedFinance supervisorView={true} />
      </ProtectedRoute>
    )
  },
  {
    path: '/prihodi/arhivirani-prihodi/:spreadsheetId',
    element: (
      <ProtectedRoute minPosition={1} maxPosition={4}>
        <ArchivedFinance />
      </ProtectedRoute>
    )
  },
  { path: '/email-zahvale', element: <EmailPage /> }
]);
