import React from 'react';

import { Form, Button } from 'react-bootstrap';

import loadingSvg from '../../Assets/Pictures/loadingSvg.svg';
import creationFailed from '../../Assets/Pictures/creationFailed.svg';
import creationSuccess from '../../Assets/Pictures/creationSuccess.svg';

import classes from './FormModal.module.css';
import { useNavigate } from 'react-router-dom';
import DebtWarningTemplate from '../../Templates/DebtWarning/DebtWarningTemplate';
import { PDFDownloadLink } from '@react-pdf/renderer';

const FormGenerateDebtWarningReports = ({
  handleSubmit,
  response,
  waitingResponse,
  clearSubmit,
  data
}) => {
  const navigate = useNavigate();

  const handleSubmitGenerateReport = ev => {
    ev.preventDefault();
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    handleSubmit(token);
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
            Izradi opomene:
          </h4>
          <h6
            style={{
              marginTop: '10px',
              marginBottom: '15px',
              fontStyle: 'italic'
            }}
          >
            *Izraditi će se opomene za sve članove koji nisu izmirili svoje
            obaveze
          </h6>
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
                    document={<DebtWarningTemplate data={data} />}
                    fileName="Opomene_Za_Članove"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? 'Učitavam PDF dokument...' : 'Preuzmi opomene'
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
                Izradi opomene
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

export default FormGenerateDebtWarningReports;
