import React, { useCallback, useState } from 'react';
import spreadsheetService from '../Services/spreadsheetService';
import memberService from '../Services/memberService';

const SpreadsheetContext = React.createContext({
  spreadsheet: null,
  membersInfo: [],
  selectedMember: null,
  response: null,
  searchFirstName: null,
  searchLastName: null,
  searchFathersName: null,
  pageInfo: {},
  pageSize: null,
  handleSetPageInfo: () => {},
  handleSetMembersInfo: () => {},
  handleSetSelectedMember: () => {},
  handleSetSpreadsheet: () => {},
  handleFetchSpreadsheet: () => {},
  handleSetSearchFirstName: () => {},
  handleSetSearchLastName: () => {},
  handleSetSearchFathersName: () => {},
  handleRemoveFilters: () => {},
  handleSetPageSize: () => {},
  handleSetPageNumber: () => {},
  handleSetResponse: () => {},
  handleUpdateSpreadsheet: () => {},
  handleFilterSpreadsheetMembers: () => {}
});

export default SpreadsheetContext;

export const SpreadsheetContextProvider = ({ children }) => {
  const [spreadsheet, setSpreadsheet] = useState(null);
  const [membersInfo, setMembersInfo] = useState([]);
  const [pageInfo, setPageInfo] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [searchFathersName, setSearchFathersName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [response, setResponse] = useState({
    message: false,
    statusCode: false,
    loading: false
  });

  const handleSetSpreadsheet = useCallback(data => {
    setSpreadsheet(data);
  }, []);

  const handleSetMembersInfo = useCallback(data => {
    setMembersInfo(data);
  }, []);

  const handleSetPageInfo = useCallback(data => {
    setPageInfo(data);
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

  const handleSetPageSize = number => {
    setPageNumber(1);
    setPageSize(number);
  };

  const handleSetResponse = useCallback(data => {
    setResponse(data);
  }, []);

  const handleUpdateSpreadsheet = () => {
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    spreadsheetService
      .getActiveSpreadsheet(token)
      .then(res => {
        const responseParsed = JSON.parse(res.data.data);
        handleSetSpreadsheet(responseParsed.spreadsheet);
        handleFilterSpreadsheetMembers();
      })
      .catch(() => {
        handleSetSpreadsheet(null);
      });
  };

  const handleFilterSpreadsheetMembers = useCallback(
    archivedSpreadsheetId => {
      if (!spreadsheet && !archivedSpreadsheetId) return;
      const token = JSON.parse(localStorage.getItem('user_jwt'));
      memberService
        .filterMembers(
          token,
          searchFirstName,
          searchLastName,
          searchFathersName,
          pageNumber,
          pageSize,
          archivedSpreadsheetId ? archivedSpreadsheetId : spreadsheet.id
        )
        .then(res => {
          const pageInformation = {
            totalCount: res.data.data.totalCount,
            page: res.data.data.page,
            pageSize: res.data.data.pageSize,
            hasNextPage: res.data.data.hasNextPage,
            hasPreviousPage: res.data.data.hasPreviousPage
          };
          handleSetPageInfo(pageInformation);
          handleSetMembersInfo(res.data.data.items['$values']);
        })
        .catch(err => console.log(err));
    },
    [
      handleSetMembersInfo,
      handleSetPageInfo,
      searchFirstName,
      searchLastName,
      searchFathersName,
      pageNumber,
      pageSize,
      spreadsheet
    ]
  );

  const handleFetchSpreadsheet = useCallback(() => {
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
        handleSetSpreadsheet(responseParsed.spreadsheet);
        handleSetResponse({
          message: 'Učitano...',
          statusCode: null,
          loading: false
        });
      })
      .catch(() => {
        handleSetSpreadsheet(null);
        handleSetResponse({
          message: 'Greška...',
          statusCode: null,
          loading: false
        });
      });
  }, [handleSetSpreadsheet, handleSetResponse]);

  return (
    <SpreadsheetContext.Provider
      value={{
        spreadsheet,
        membersInfo,
        selectedMember,
        searchFirstName,
        searchLastName,
        searchFathersName,
        response,
        pageInfo,
        pageSize,
        handleSetPageSize,
        handleSetPageInfo,
        handleSetMembersInfo,
        handleSetSelectedMember,
        handleSetSpreadsheet,
        handleFetchSpreadsheet,
        handleSetSearchFirstName,
        handleSetSearchLastName,
        handleSetSearchFathersName,
        handleRemoveFilters,
        handleSetPageNumber,
        handleSetResponse,
        handleUpdateSpreadsheet,
        handleFilterSpreadsheetMembers
      }}
    >
      {children}
    </SpreadsheetContext.Provider>
  );
};
