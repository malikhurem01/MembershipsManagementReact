import { useState } from 'react';
import FormGenerateReport from '../../FormModal/FormGenerateReport';
import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import spreadsheetService from '../../../Services/spreadsheetService';
import { useSearchParams } from 'react-router-dom';

const GenerateReportPage = () => {
  const [response, setResponse] = useState();
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [reportData, setReportData] = useState();
  const [reportGenerated, setReportGenerated] = useState(false);

  const [searchParams] = useSearchParams();

  const handleGenerateReport = (token, spreadsheetYear) => {
    setResponse({ message: 'Izrađujem...', statusCode: null });
    setWaitingResponse(true);
    spreadsheetService
      .getSpreadsheetReport(token, spreadsheetYear)
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
        reportGenerated={reportGenerated}
        searchParams={searchParams}
      />
    </PageWrapperComponent>
  );
};

export default GenerateReportPage;
