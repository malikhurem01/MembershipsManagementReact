import React, { useState } from "react";

const AuthContext = React.createContext({
  userDataState: null,
  handleLogoutUser: () => {},
  handleSetUser: () => {},
});

export default AuthContext;

export const AuthContextProvider = ({ children, userData }) => {
  const [user, setUser] = useState(userData);

  const handleSetUser = (data) => {
    setUser(data);
  };

  const handleLogoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userDataState: user,
        handleLogoutUser,
        handleSetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
