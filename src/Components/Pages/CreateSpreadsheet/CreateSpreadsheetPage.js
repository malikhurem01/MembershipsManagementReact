import { useState } from 'react';

import spreadsheetService from '../../../Services/spreadsheetService';

import FormCreateSpreadsheet from '../../FormModal/FormCreateSpreadsheet';
import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

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
      <Container>
        {' '}
        <div style={{ marginTop: '2vh' }}>
          <div className="row font-weight-bold">
            <div className="col">
              <nav
                aria-label="breadcrumb"
                className="bg-light rounded-3 p-3 mb-4"
              >
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/naslovna">Naslovna stranica</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/clanarine">Redovne članarine</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/clanarine/kreiraj-bazu">Kreiraj bazu</Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <FormCreateSpreadsheet
          handleCreateDatabase={handleCreateDatabase}
          response={response}
          waitingResponse={waitingResponse}
          clearSubmit={clearSubmit}
        />
      </Container>
    </PageWrapperComponent>
  );
};

export default CreateSpreadsheetPage;
