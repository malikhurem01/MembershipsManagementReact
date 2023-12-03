import { useState } from 'react';

import spreadsheetService from '../../../Services/spreadsheetService';

import FormCreateSpreadsheet from '../../FormModal/FormCreateSpreadsheet';
import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';

const CreateSpreadsheetPage = () => {
  const [response, setResponse] = useState();
  const [waitingResponse, setWaitingResponse] = useState(false);

  const handleCreateDatabase = (token, data) => {
    setResponse({ message: 'Kreiram...', statusCode: null });
    setWaitingResponse(true);
    spreadsheetService
      .createSpreadsheet(token, data)
      .then(res => {
        console.log(res);
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
      <FormCreateSpreadsheet
        handleCreateDatabase={handleCreateDatabase}
        response={response}
        waitingResponse={waitingResponse}
        clearSubmit={clearSubmit}
      />
    </PageWrapperComponent>
  );
};

export default CreateSpreadsheetPage;
