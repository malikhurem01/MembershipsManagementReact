import { useParams } from 'react-router-dom';
import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import { useContext, useEffect, useState } from 'react';
import SpreadsheetContext from '../../../Store/spreadsheet-context';
import Spreadsheet from '../../Spreadsheet/Spreadsheet';
import spreadsheetService from '../../../Services/spreadsheetService';

const ArchivedSpreadsheetPage = () => {
  const [showViewMember, setShowViewMember] = useState(false);
  const [spreadsheet, setSpreadsheet] = useState();
  const [error, setError] = useState(false);
  const { spreadsheetId } = useParams();
  const { handleFilterSpreadsheetMembers, handleSetSelectedMember } =
    useContext(SpreadsheetContext);

  const tableColumns = [
    '#',
    'Ev. broj',
    'Ime',
    'Prezime',
    'Ime oca',
    'Status',
    'Članarina',
    'Uplaćeno',
    'Zadnja uplata',
    'Filter'
  ];

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    spreadsheetService
      .getSpreadsheetById(token, spreadsheetId)
      .then(res => {
        if (!res.data.data) {
          setError(true);
        } else {
          setSpreadsheet(res.data.data);
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  }, [spreadsheetId]);

  useEffect(() => {
    handleFilterSpreadsheetMembers(spreadsheetId);
  }, [handleFilterSpreadsheetMembers, spreadsheetId]);

  const handleAddMemberClick = () => {
    setShowViewMember(prevState => !prevState);
  };

  const handleSetViewMember = mInfo => {
    if (!showViewMember) {
      handleSetSelectedMember(mInfo);
    }
    setShowViewMember(prevState => !prevState);
  };

  return (
    <PageWrapperComponent>
      {spreadsheet?.archived && !error && (
        <Spreadsheet
          isViewMode={true}
          tableColumns={tableColumns}
          spreadsheet={spreadsheet}
          handleSetViewMember={handleSetViewMember}
          handleAddMemberClick={handleAddMemberClick}
        />
      )}
      {error && <h3>Baza koju tražite ne postoji</h3>}
      {!spreadsheet?.archived && !error && <h3>Baza nije arhivirana</h3>}
    </PageWrapperComponent>
  );
};

export default ArchivedSpreadsheetPage;
