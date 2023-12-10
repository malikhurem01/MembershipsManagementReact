import { useState } from 'react';
import FormGenerateReport from '../../FormModal/FormGenerateReport';
import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import spreadsheetService from '../../../Services/spreadsheetService';
import FormGenerateDebtWarningReports from '../../FormModal/FormGenerateDebtWarningReports';

const GenerateDebtWarningPage = () => {
  const [response, setResponse] = useState();
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [warningData, setWarningData] = useState();

  const handleGenerateDebtWarningReports = token => {
    setResponse({ message: 'Izrađujem...', statusCode: null });
    setWaitingResponse(true);
    spreadsheetService
      .getDebtWarningReports(token)
      .then(res => {
        setWarningData(res.data.data['$values']);
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
      <FormGenerateDebtWarningReports
        handleSubmit={handleGenerateDebtWarningReports}
        response={response}
        waitingResponse={waitingResponse}
        clearSubmit={clearSubmit}
        data={warningData}
      />
    </PageWrapperComponent>
  );
};

export default GenerateDebtWarningPage;
