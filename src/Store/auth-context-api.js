import React, { useCallback, useState } from 'react';

const AuthContext = React.createContext({
  userDataState: null,
  response: null,
  handleLogoutUser: () => {},
  handleSetUser: () => {},
  handleSetResponse: () => {}
});

export default AuthContext;

export const AuthContextProvider = ({ children, userData }) => {
  const [user, setUser] = useState(userData);
  const [response, setResponse] = useState({ loading: false, success: false });

  const handleSetUser = useCallback(data => {
    setUser(data);
  }, []);

  const handleLogoutUser = () => {
    setUser(null);
  };

  const handleSetResponse = data => {
    setResponse(data);
  };

  return (
    <AuthContext.Provider
      value={{
        userDataState: user,
        response,
        handleLogoutUser,
        handleSetUser,
        handleSetResponse
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
