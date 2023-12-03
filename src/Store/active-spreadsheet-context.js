import React, { useCallback, useState } from 'react';
import spreadsheetService from '../Services/spreadsheetService';
import memberService from '../Services/memberService';

const ActiveSpreadsheetContext = React.createContext({
  activeSpreadsheet: null,
  membersInfo: [],
  selectedMember: null,
  response: null,
  searchFirstName: null,
  searchLastName: null,
  searchFathersName: null,
  handleSetMembersInfo: () => {},
  handleSetSelectedMember: () => {},
  handleSetActiveSpreadsheet: () => {},
  handleFetchActiveSpreadsheet: () => {},
  handleSetSearchFirstName: () => {},
  handleSetSearchLastName: () => {},
  handleSetSearchFathersName: () => {},
  handleRemoveFilters: () => {},
  handleSetPageNumber: () => {},
  handleSetResponse: () => {},
  handleUpdateActiveSpreadsheet: () => {},
  handleFilterActiveSpreadsheetMembers: () => {}
});

export default ActiveSpreadsheetContext;

export const ActiveSpreadsheetContextProvider = ({ children }) => {
  const [activeSpreadsheet, setActiveSpreadsheet] = useState(null);
  const [membersInfo, setMembersInfo] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [searchFathersName, setSearchFathersName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [response, setResponse] = useState({
    message: false,
    statusCode: false,
    loading: false
  });

  const handleSetActiveSpreadsheet = useCallback(data => {
    setActiveSpreadsheet(data);
  }, []);

  const handleSetMembersInfo = useCallback(data => {
    setMembersInfo(data);
  }, []);

  const handleSetSelectedMember = useCallback(data => {
    setSelectedMember(data);
  }, []);

  const handleSetSearchFirstName = ev => {
    setSearchFirstName(ev.target.value);
  };

  const handleSetSearchLastName = ev => {
    setSearchLastName(ev.target.value);
  };

  const handleSetSearchFathersName = ev => {
    setSearchFathersName(ev.target.value);
  };

  const handleRemoveFilters = () => {
    setSearchFirstName('');
    setSearchLastName('');
    setSearchFathersName('');
  };

  const handleSetPageNumber = number => {
    setPageNumber(number);
  };

  const handleSetResponse = useCallback(data => {
    setResponse(data);
  }, []);

  const handleUpdateActiveSpreadsheet = () => {
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    spreadsheetService
      .getActiveSpreadsheet(token)
      .then(res => {
        const responseParsed = JSON.parse(res.data.data);
        handleSetActiveSpreadsheet(responseParsed.spreadsheet);
        handleFilterActiveSpreadsheetMembers();
      })
      .catch(() => {
        handleSetActiveSpreadsheet(null);
      });
  };

  const handleFilterActiveSpreadsheetMembers = useCallback(() => {
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    memberService
      .filterMembers(
        token,
        searchFirstName,
        searchLastName,
        searchFathersName,
        pageNumber,
        activeSpreadsheet?.id
      )
      .then(res => {
        const responseParsed = JSON.parse(res.data.data);
        handleSetMembersInfo(responseParsed.membersInfo);
      })
      .catch(err => console.log(err));
  }, [
    handleSetMembersInfo,
    searchFirstName,
    searchLastName,
    searchFathersName,
    pageNumber,
    activeSpreadsheet
  ]);

  const handleFetchActiveSpreadsheet = useCallback(() => {
    handleSetResponse({
      message: 'Učitavam bazu',
      statusCode: null,
      loading: true
    });
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    spreadsheetService
      .getActiveSpreadsheet(token)
      .then(res => {
        const responseParsed = JSON.parse(res.data.data);
        handleSetActiveSpreadsheet(responseParsed.spreadsheet);
        handleSetResponse({
          message: 'Učitano...',
          statusCode: null,
          loading: false
        });
      })
      .catch(() => {
        handleSetActiveSpreadsheet(null);
        handleSetResponse({
          message: 'Greška...',
          statusCode: null,
          loading: false
        });
      });
  }, [handleSetActiveSpreadsheet, handleSetResponse]);

  return (
    <ActiveSpreadsheetContext.Provider
      value={{
        activeSpreadsheet,
        membersInfo,
        selectedMember,
        searchFirstName,
        searchLastName,
        searchFathersName,
        response,
        handleSetMembersInfo,
        handleSetSelectedMember,
        handleSetActiveSpreadsheet,
        handleFetchActiveSpreadsheet,
        handleSetSearchFirstName,
        handleSetSearchLastName,
        handleSetSearchFathersName,
        handleRemoveFilters,
        handleSetPageNumber,
        handleSetResponse,
        handleUpdateActiveSpreadsheet,
        handleFilterActiveSpreadsheetMembers
      }}
    >
      {children}
    </ActiveSpreadsheetContext.Provider>
  );
};
