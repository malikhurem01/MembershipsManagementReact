import React, { useCallback, useState } from "react";
import spreadsheetService from "../Services/spreadsheetService";

const ActiveSpreadsheetContext = React.createContext({
  activeSpreadsheet: null,
  membersInfo: [],
  selectedMember: null,
  response: null,
  handleSetMembersInfo: () => {},
  handleSetSelectedMember: () => {},
  handleSetActiveSpreadsheet: () => {},
  handleFetchActiveSpreadsheet: () => {},
  handleSetResponse: () => {},
});

export default ActiveSpreadsheetContext;

export const ActiveSpreadsheetContextProvider = ({ children }) => {
  const [activeSpreadsheet, setActiveSpreadsheet] = useState(null);
  const [membersInfo, setMembersInfo] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [response, setResponse] = useState({
    message: false,
    statusCode: false,
    loading: false,
  });

  const handleSetActiveSpreadsheet = useCallback((data) => {
    setActiveSpreadsheet(data);
  }, []);

  const handleSetMembersInfo = useCallback((data) => {
    setMembersInfo(data);
  }, []);

  const handleSetSelectedMember = useCallback((data) => {
    setSelectedMember(data);
  }, []);

  const handleSetResponse = useCallback((data) => {
    setResponse(data);
  }, []);

  const handleFetchActiveSpreadsheet = useCallback(() => {
    handleSetResponse({
      message: "Učitavam bazu",
      statusCode: null,
      loading: true,
    });
    const token = JSON.parse(localStorage.getItem("user_jwt"));
    spreadsheetService
      .getActiveSpreadsheet(token)
      .then((res) => {
        const responseParsed = JSON.parse(res.data.data);
        handleSetActiveSpreadsheet(responseParsed.spreadsheet);
        handleSetMembersInfo(responseParsed.rawMembersInfo);
        handleSetResponse({
          message: "Učitano...",
          statusCode: null,
          loading: false,
        });
      })
      .catch(() => {
        handleSetActiveSpreadsheet(null);
        handleSetResponse({
          message: "Greška...",
          statusCode: null,
          loading: false,
        });
      });
  }, [handleSetActiveSpreadsheet, handleSetMembersInfo, handleSetResponse]);

  return (
    <ActiveSpreadsheetContext.Provider
      value={{
        activeSpreadsheet,
        membersInfo,
        selectedMember,
        response,
        handleSetMembersInfo,
        handleSetSelectedMember,
        handleSetActiveSpreadsheet,
        handleFetchActiveSpreadsheet,
        handleSetResponse,
      }}
    >
      {children}
    </ActiveSpreadsheetContext.Provider>
  );
};
