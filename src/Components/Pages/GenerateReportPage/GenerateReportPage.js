import { useState } from 'react';
import FormGenerateReport from '../../FormModal/FormGenerateReport';
import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import spreadsheetService from '../../../Services/spreadsheetService';

const GenerateReportPage = () => {
  const [response, setResponse] = useState();
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [reportData, setReportData] = useState();

  const handleGenerateReport = (token, spreadsheetYear) => {
    setResponse({ message: 'Izrađujem...', statusCode: null });
    setWaitingResponse(true);
    spreadsheetService
      .getSpreadsheetReport(token, spreadsheetYear)
      .then(res => {
        setReportData(res.data.data);
        setResponse({ message: res.data.message, statusCode: res.status });
      })
      .catch(err => {
        setResponse({
          message: err.response.data.message,
          statusCode: err.response.data.statusCode
        });
      });
  };

  const clearSubmit = () => {
    setResponse();
    setWaitingResponse(false);
  };

  return (
    <PageWrapperComponent>
      <FormGenerateReport
        handleSubmit={handleGenerateReport}
        response={response}
        waitingResponse={waitingResponse}
        clearSubmit={clearSubmit}
        reportData={reportData}
      />
    </PageWrapperComponent>
  );
};

export default GenerateReportPage;
