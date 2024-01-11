import React, { useCallback, useEffect, useState } from 'react';
import spreadsheetService from '../Services/spreadsheetService';
import memberService from '../Services/memberService';

const SpreadsheetContext = React.createContext({
  spreadsheet: null,
  membersInfo: [],
  selectedMember: null,
  response: null,
  evNumber: null,
  searchFirstName: null,
  searchLastName: null,
  searchFathersName: null,
  searchHasPayed: null,
  pageInfo: {},
  pageSize: null,
  handleSetPageInfo: () => {},
  handleSetMembersInfo: () => {},
  handleSetSelectedMember: () => {},
  handleSetSpreadsheet: () => {},
  handleFetchSpreadsheet: () => {},
  handleSetSearchEvNumber: () => {},
  handleSetSearchFirstName: () => {},
  handleSetSearchLastName: () => {},
  handleSetSearchFathersName: () => {},
  handleSetSearchHasPayed: () => {},
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
  const [searchEvNumber, setSearchEvNumber] = useState('');
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [searchFathersName, setSearchFathersName] = useState('');
  const [searchHasPayed, setSearchHasPayed] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [response, setResponse] = useState({
    message: false,
    statusCode: false,
    loading: false
  });

  useEffect(() => {}, []);

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

  const handleSetSearchEvNumber = useCallback(value => {
    handleSetPageNumber(1);
    setSearchEvNumber(value);
  }, []);

  const handleSetSearchFirstName = useCallback(value => {
    handleSetPageNumber(1);
    setSearchFirstName(value);
  }, []);

  const handleSetSearchLastName = useCallback(value => {
    handleSetPageNumber(1);
    setSearchLastName(value);
  }, []);

  const handleSetSearchFathersName = useCallback(value => {
    handleSetPageNumber(1);
    setSearchFathersName(value);
  }, []);

  const handleSetSearchHasPayed = useCallback(value => {
    handleSetPageNumber(1);
    setSearchHasPayed(value);
  }, []);

  const handleRemoveFilters = () => {
    setSearchEvNumber('');
    setSearchFirstName('');
    setSearchLastName('');
    setSearchFathersName('');
    setSearchHasPayed(false);
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

  const handleUpdateSpreadsheet = dzematId => {
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    spreadsheetService
      .getActiveSpreadsheet(token, dzematId)
      .then(res => {
        const responseParsed = JSON.parse(res.data.data);
        if (dzematId) {
          handleSetSpreadsheet(responseParsed.spreadsheet.spreadsheet[0]);
        } else {
          handleSetSpreadsheet(responseParsed.spreadsheet.spreadsheet);
        }
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
          searchEvNumber,
          searchFirstName,
          searchLastName,
          searchFathersName,
          searchHasPayed,
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
        .catch(err => {
          console.log(err);
        });
    },
    [
      handleSetMembersInfo,
      handleSetPageInfo,
      searchEvNumber,
      searchFirstName,
      searchLastName,
      searchFathersName,
      searchHasPayed,
      pageNumber,
      pageSize,
      spreadsheet
    ]
  );

  const handleFetchSpreadsheet = useCallback(
    dzematId => {
      handleSetResponse({
        message: 'Učitavam bazu',
        statusCode: null,
        loading: true
      });
      const token = JSON.parse(localStorage.getItem('user_jwt'));
      spreadsheetService
        .getActiveSpreadsheet(token, dzematId)
        .then(res => {
          //TREBA POPRAVITI NA BACK ENDU ACTIVE SPREADSHEET KAD SE DOHVACA DA BUDE JASNO DEFINISAN OBJEKAT... A NE JSON SERIALIZER...
          const responseParsed = JSON.parse(res.data.data);
          if (dzematId) {
            handleSetSpreadsheet(responseParsed.spreadsheet.spreadsheet[0]);
            console.log(responseParsed.spreadsheet.spreadsheet[0]);
          } else {
            handleSetSpreadsheet(responseParsed.spreadsheet.spreadsheet);
            console.log(responseParsed.spreadsheet.spreadsheet);
          }
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
    },
    [handleSetSpreadsheet, handleSetResponse]
  );

  return (
    <SpreadsheetContext.Provider
      value={{
        spreadsheet,
        membersInfo,
        selectedMember,
        searchEvNumber,
        searchFirstName,
        searchLastName,
        searchFathersName,
        searchHasPayed,
        response,
        pageInfo,
        pageSize,
        handleSetPageSize,
        handleSetPageInfo,
        handleSetMembersInfo,
        handleSetSelectedMember,
        handleSetSpreadsheet,
        handleFetchSpreadsheet,
        handleSetSearchEvNumber,
        handleSetSearchFirstName,
        handleSetSearchLastName,
        handleSetSearchFathersName,
        handleSetSearchHasPayed,
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
