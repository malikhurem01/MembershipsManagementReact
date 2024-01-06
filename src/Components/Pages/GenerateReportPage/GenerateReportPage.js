import { useContext, useState, useEffect, useCallback } from 'react';
import FormGenerateReport from '../../FormModal/FormGenerateReport';
import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import spreadsheetService from '../../../Services/spreadsheetService';
import { useParams, useSearchParams } from 'react-router-dom';
import AuthContext from '../../../Store/auth-context-api';

const GenerateReportPage = ({ supervisorView }) => {
  const [response, setResponse] = useState();
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [reportData, setReportData] = useState();
  const [reportGenerated, setReportGenerated] = useState(false);
  const [spreadsheets, setSpreadsheets] = useState();

  const [searchParams] = useSearchParams();

  const { dzematId } = useParams();

  const handleGenerateReport = (token, spreadsheetYear) => {
    setResponse({ message: 'Izrađujem...', statusCode: null });
    setWaitingResponse(true);
    spreadsheetService
      .getSpreadsheetReport(token, spreadsheetYear, dzematId)
      .then(res => {
        setReportData(res.data.data);
        setResponse({ message: res.data.message, statusCode: res.status });
        setReportGenerated(true);
      })
      .catch(err => {
        setResponse({
          message: err.response.data.message,
          statusCode: err.response.data.statusCode
        });
      });
  };

  const ctx = useContext(AuthContext);
  const token = JSON.parse(localStorage.getItem('user_jwt'));

  const handleFetchSpreadsheets = useCallback(() => {
    spreadsheetService
      .getAllSpreadsheets(
        token,
        supervisorView ? dzematId : ctx.userDataState.dzematId
      )
      .then(res => {
        console.log(res);
        setSpreadsheets(res.data.data['$values']);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token, ctx.userDataState.dzematId, dzematId, supervisorView]);

  useEffect(() => {
    handleFetchSpreadsheets();
  }, [handleFetchSpreadsheets]);

  const clearSubmit = () => {
    setResponse();
    setWaitingResponse(false);
  };

  return (
    <PageWrapperComponent>
      {spreadsheets && (
        <FormGenerateReport
          handleSubmit={handleGenerateReport}
          response={response}
          waitingResponse={waitingResponse}
          clearSubmit={clearSubmit}
          reportData={reportData}
          reportGenerated={reportGenerated}
          searchParams={searchParams}
          spreadsheets={spreadsheets}
        />
      )}
    </PageWrapperComponent>
  );
};

export default GenerateReportPage;
