import React from 'react';
import ReactDOM from 'react-dom/client';

import { SpreadsheetContextProvider } from './Store/spreadsheet-context';
import { AuthContextProvider } from './Store/auth-context-api';
import { RouterProvider } from 'react-router-dom';
import { router } from './Data/Router';

import userService from './Services/userService';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const initialize = async () => {
  let token = JSON.parse(localStorage.getItem('user_jwt'));
  let response,
    user = null;
  if (token) {
    try {
      response = await userService.currentUser(token);
      user = response.data.data;
    } catch (err) {
      window.location.replace('/login/korisnik');
      localStorage.removeItem('user_jwt');
    }
  } else {
    user = null;
  }
  return user;
};

const startApplication = user => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <AuthContextProvider userData={user}>
        <SpreadsheetContextProvider>
          <div id="appContainer">
            <RouterProvider router={router} />
          </div>
        </SpreadsheetContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
  );
};

initialize().then(startApplication);
