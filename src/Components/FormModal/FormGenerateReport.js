import React, { useState } from 'react';

import { FloatingLabel, Form, Button } from 'react-bootstrap';

import { ReactComponent as LoadingSvg } from '../../Assets/Pictures/loadingSvg.svg';
import { ReactComponent as CreationFailed } from '../../Assets/Pictures/creationFailed.svg';
import { ReactComponent as CreationSuccess } from '../../Assets/Pictures/creationSuccess.svg';

import classes from './FormModal.module.css';
import { useNavigate } from 'react-router-dom';
import SpreadsheetReportTemplate from '../../Templates/SpreadsheetReport/SpreadsheetReportTemplate';
import { PDFDownloadLink } from '@react-pdf/renderer';

const FormGenerateReport = ({
  handleSubmit,
  response,
  waitingResponse,
  clearSubmit,
  reportData,
  searchParams,
  reportGenerated,
  spreadsheets
}) => {
  const [year, setYear] = useState(
    searchParams.get('godina') ||
      (spreadsheets.length > 0 ? spreadsheets[0].year : -1)
  );

  const navigate = useNavigate();

  const handleSubmitGenerateReport = ev => {
    ev.preventDefault();
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    handleSubmit(token, year);
  };

  const handleNavigateBack = () => {
    navigate('/clanarine');
  };

  const handleClearSubmit = () => {
    clearSubmit();
  };

  return (
    <React.Fragment>
      <div className={classes.modal}>
        <Form onSubmit={handleSubmitGenerateReport}>
          <h4
            style={{
              borderBottom: '1px solid #cecece',
              marginBottom: '15px',
              paddingBottom: '5px'
            }}
          >
            {reportGenerated ? 'Preuzmi izvještaj' : 'Izradi izvještaj'}
          </h4>
          {!reportGenerated && spreadsheets.length > 0 && (
            <div style={{ margin: '15px 0' }}>
              {' '}
              <h6 style={{ margin: '18px 0' }}>
                Odaberite godinu baze za koju želite izraditi izvještaj
              </h6>
              <FloatingLabel
                controlId="floatingStatus"
                label="Lista godina svih baza"
              >
                <Form.Select
                  onChange={ev => setYear(ev.target.value)}
                  aria-label="SpreadsheetYears"
                  required
                  value={year}
                >
                  {spreadsheets.length > 0 &&
                    spreadsheets.map(el => {
                      return (
                        <option value={el.year}>
                          {el.archived
                            ? `( ${el.year}.) Arhiva`
                            : `( ${el.year}.) Aktivna`}
                        </option>
                      );
                    })}
                </Form.Select>
              </FloatingLabel>
            </div>
          )}
          {!reportGenerated && spreadsheets.length < 1 && (
            <p style={{ margin: '18px 0', fontStyle: 'italic' }}>
              *Lista baza je prazna, molimo kreirajte bazu
            </p>
          )}
          {waitingResponse && (
            <div className={classes.responseModal}>
              {response.statusCode == null && (
                <LoadingSvg className={classes.loadingSvg} />
              )}
              {response.statusCode === 200 && (
                <CreationSuccess className={classes.loadingSvg} />
              )}
              {response.statusCode >= 400 && (
                <CreationFailed className={classes.loadingSvg} />
              )}
              <p>{response.message}</p>
            </div>
          )}
          {waitingResponse && response?.statusCode >= 400 && (
            <Button
              className={classes.responseButton}
              onClick={handleClearSubmit}
              variant="danger"
            >
              Poništi
            </Button>
          )}
          {waitingResponse &&
            response?.statusCode >= 200 &&
            response?.statusCode < 300 && (
              <React.Fragment>
                <Button
                  className={classes.responseButton}
                  style={{ marginBottom: '15px' }}
                  variant="success"
                >
                  <PDFDownloadLink
                    className={classes.responseButton}
                    style={{
                      color: 'white',
                      width: '100%'
                    }}
                    document={
                      <SpreadsheetReportTemplate reportData={reportData} />
                    }
                    fileName={`Izvještaj_Članarine_Godina_${year}`}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? 'Učitavam PDF dokument...' : 'Preuzmi'
                    }
                  </PDFDownloadLink>
                </Button>
                <Button
                  className={classes.responseButton}
                  variant="danger"
                  onClick={handleNavigateBack}
                >
                  Nazad
                </Button>
              </React.Fragment>
            )}
          {!waitingResponse && (
            <React.Fragment>
              {spreadsheets.length > 0 && (
                <Button
                  style={{ marginRight: '20px' }}
                  type="submit"
                  variant="primary"
                >
                  Izradi izvještaj
                </Button>
              )}
              <Button variant="danger" onClick={handleNavigateBack}>
                Odustani
              </Button>
            </React.Fragment>
          )}
        </Form>
      </div>
    </React.Fragment>
  );
};

export default FormGenerateReport;
