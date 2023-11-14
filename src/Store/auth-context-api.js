import React, { useState } from "react";

const AuthContext = React.createContext({
  userDataState: null,
  temporaryDzemat: null,
  response: null,
  handleLogoutUser: () => {},
  handleSetUser: () => {},
});

export default AuthContext;

export const AuthContextProvider = ({ children, userData }) => {
  const [user, setUser] = useState(userData);
  const [dzemat, setDzemat] = useState();
  const [response, setResponse] = useState({ loading: false, success: false });

  const handleSetUser = (data) => {
    setUser(data);
  };

  const handleLogoutUser = () => {
    setUser(null);
  };

  const handleSetDzemat = (data) => {
    setDzemat(data);
  };

  const handleSetResponse = (data) => {
    setResponse(data);
  };

  return (
    <AuthContext.Provider
      value={{
        userDataState: user,
        temporaryDzemat: dzemat,
        response,
        handleLogoutUser,
        handleSetUser,
        handleSetDzemat,
        handleSetResponse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
