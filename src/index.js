import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./Store/auth-context-api";

import userService from "./Services/userService";

import LoginDzematPage, {
  loader as dzematLoginLoader,
} from "./Components/Pages/LoginDzemat/LoginDzematPage";
import LoginUserPage from "./Components/Pages/LoginUser/LoginUserPage";
import MainPage from "./Components/Pages/Main/MainPage";
import EmailPage from "./Components/Pages/Email/EmailPage";
import LogoutPage from "./Components/Pages/Logout/LogoutPage";
import CreateSpreadsheetPage from "./Components/Pages/CreateSpreadsheet/CreateSpreadsheetPage";
import ActiveSpreadsheetPage from "./Components/Pages/ActiveSpreadsheet/ActiveSpreadsheetPage";
import ArchiveSpreadsheets from "./Components/Pages/ArchiveSpreadsheets/ArchiveSpreadsheets";
import RegularMemberships from "./Components/Pages/RegularMemberships/RegularMemberships";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import ErrorElement from "./Components/Pages/ErrorPage/ErrorElement";
import IndexPage from "./Components/Pages/IndexPage/IndexPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/login",
    element: (
      <div>
        <Outlet />
      </div>
    ),
    errorElement: <ErrorElement />,
    children: [
      {
        path: "dzemat",
        loader: dzematLoginLoader,
        element: <LoginDzematPage />,
      },
      {
        path: "korisnik",
        element: <LoginUserPage />,
      },
    ],
  },

  { path: "/logout", element: <LogoutPage /> },
  { path: "/email", element: <EmailPage /> },
  { path: "/naslovna", element: <MainPage /> },
  { path: "/clanarine", element: <RegularMemberships /> },
  { path: "/clanarine/kreiraj-bazu", element: <CreateSpreadsheetPage /> },
  { path: "/clanarine/aktivna-baza", element: <ActiveSpreadsheetPage /> },
  { path: "/clanarine/arhiva-baza", element: <ArchiveSpreadsheets /> },
]);

const initialize = async () => {
  let token = JSON.parse(localStorage.getItem("user_jwt"));
  let response,
    user = null;
  if (token) {
    try {
      response = await userService.currentUser(token);
      user = response.data.data;
      console.log(user);
    } catch (err) {
      localStorage.removeItem("user_jwt");
    }
  } else {
    user = null;
  }
  return user;
};

const startApplication = (user) => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <AuthContextProvider userData={user}>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </React.StrictMode>
  );
};

initialize().then(startApplication);
