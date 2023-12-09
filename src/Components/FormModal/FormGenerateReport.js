import React, { useState } from 'react';

import { FloatingLabel, Form, Button, Row, Col } from 'react-bootstrap';

import loadingSvg from '../../Assets/Pictures/loadingSvg.svg';
import creationFailed from '../../Assets/Pictures/creationFailed.svg';
import creationSuccess from '../../Assets/Pictures/creationSuccess.svg';

import classes from './FormModal.module.css';
import { useNavigate } from 'react-router-dom';
import SpreadsheetReportTemplate from '../../Templates/SpreadsheetReport/SpreadsheetReportTemplate';
import { PDFDownloadLink } from '@react-pdf/renderer';

const FormGenerateReport = ({
  handleSubmit,
  response,
  waitingResponse,
  clearSubmit,
  reportData
}) => {
  const [year, setYear] = useState('');

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
            Izradi izvještaj:
          </h4>
          <Row className="g-2">
            <Col lg={5} md="auto" sm={10}>
              <h6 style={{ marginTop: '10px' }}>
                Upišite godinu za koju želite izraditi izvještaj:{' '}
              </h6>
            </Col>
            <Col lg={5} md={10} sm={10}>
              <FloatingLabel
                controlId="floatingYear"
                label="Godina"
                className="mb-3"
              >
                <Form.Control
                  value={year}
                  onChange={ev => setYear(ev.target.value)}
                  type="number"
                  placeholder="Godina"
                  label="Baza za godinu:"
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          {waitingResponse && (
            <div className={classes.responseModal}>
              {response.statusCode == null && (
                <img src={loadingSvg} alt="učitavam kreiranje baze" />
              )}
              {response.statusCode === 200 && (
                <img src={creationSuccess} alt="baza uspješno kreirana" />
              )}
              {response.statusCode >= 400 && (
                <img src={creationFailed} alt="greška pri kreiranju baze" />
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
                      loading ? 'Učitavam PDF dokument...' : 'Preuzmi izvještaj'
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
              <Button
                style={{ marginRight: '20px' }}
                type="submit"
                variant="primary"
              >
                Izradi izvještaj
              </Button>
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
