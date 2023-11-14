import React, { useCallback, useState } from "react";
import spreadsheetService from "../Services/spreadsheetService";

const ActiveSpreadsheetContext = React.createContext({
  activeSpreadsheet: null,
  membersInfo: [],
  selectedMember: null,
  handleSetMembersInfo: () => {},
  handleSetSelectedMember: () => {},
  handleSetActiveSpreadsheet: () => {},
  handleFetchActiveSpreadsheet: () => {},
});

export default ActiveSpreadsheetContext;

export const ActiveSpreadsheetContextProvider = ({ children }) => {
  const [activeSpreadsheet, setActiveSpreadsheet] = useState(null);
  const [membersInfo, setMembersInfo] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleSetActiveSpreadsheet = useCallback((data) => {
    setActiveSpreadsheet(data);
  }, []);

  const handleSetMembersInfo = useCallback((data) => {
    setMembersInfo(data);
  }, []);

  const handleSetSelectedMember = useCallback((data) => {
    setSelectedMember(data);
  }, []);

  const handleFetchActiveSpreadsheet = useCallback(() => {
    const token = JSON.parse(localStorage.getItem("user_jwt"));
    spreadsheetService
      .getActiveSpreadsheet(token)
      .then((res) => {
        const responseParsed = JSON.parse(res.data.data);
        handleSetActiveSpreadsheet(responseParsed.spreadsheet);
        handleSetMembersInfo(responseParsed.rawMembersInfo);
      })
      .catch(() => {
        handleSetActiveSpreadsheet(null);
      });
  }, [handleSetActiveSpreadsheet, handleSetMembersInfo]);

  return (
    <ActiveSpreadsheetContext.Provider
      value={{
        activeSpreadsheet,
        membersInfo,
        selectedMember,
        handleSetMembersInfo,
        handleSetSelectedMember,
        handleSetActiveSpreadsheet,
        handleFetchActiveSpreadsheet,
      }}
    >
      {children}
    </ActiveSpreadsheetContext.Provider>
  );
};
