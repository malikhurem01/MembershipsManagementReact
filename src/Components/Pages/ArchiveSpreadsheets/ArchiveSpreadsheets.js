import { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Row, Col } from 'react-bootstrap';

import spreadsheetService from '../../../Services/spreadsheetService';

import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';

import styles from '../../FormModal/FormModal.module.css';
import AuthContext from '../../../Store/auth-context-api';

const ArchiveSpreadsheets = () => {
  const [spreadsheets, setSpreadsheets] = useState([]);
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('Arhiviraj');

  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const token = JSON.parse(localStorage.getItem('user_jwt'));

  const handleFetchSpreadsheets = useCallback(() => {
    spreadsheetService
      .getAllSpreadsheets(token, ctx.userDataState.dzematId)
      .then(res => {
        console.log(res);
        setSpreadsheets(res.data.data['$values']);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token, ctx.userDataState.dzematId]);

  useEffect(() => {
    handleFetchSpreadsheets();
  }, [handleFetchSpreadsheets]);

  const handleArchiveSpreadsheet = ev => {
    setWaitingResponse(true);
    setMessage('Arhiviram...');
    spreadsheetService
      .archiveSpreadsheet(token, {
        dzematId: ctx.userDataState.dzematId,
        spreadsheetId: ev.target.name
      })
      .then(() => {
        setMessage('Arhivirano...');
        setTimeout(() => {
          setWaitingResponse(false);
          handleFetchSpreadsheets();
        }, 2500);
      })
      .catch(err => {
        console.log(err);
        setMessage('Greška...');
        setError(true);
        setTimeout(() => {
          setMessage('Arhiviraj');
          setWaitingResponse(false);
          setError(false);
        }, 2500);
      });
  };

  const handleNavigateToMain = () => {
    navigate('/clanarine');
  };
  return (
    <PageWrapperComponent>
      <div className={styles.backdrop}></div>
      <div className={styles.modal} style={{ minWidth: '20%' }}>
        <h4
          style={{
            borderBottom: '1px solid #cecece',
            marginBottom: '15px',
            paddingBottom: '5px'
          }}
        >
          {spreadsheets.length < 1 ? 'Nema kreiranih baza' : 'Lista baza'}
        </h4>
        {spreadsheets.map((s, i) => {
          return (
            <Row
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Col>
                <div>
                  <p>
                    {s.year}. god {s.archived && <strong> | Arhiva</strong>}
                    {!s.archived && <strong> | Aktivna</strong>}
                  </p>
                </div>
              </Col>
              <Col>
                {s.archived && (
                  <Button name={s.id} variant="success">
                    Pregled
                  </Button>
                )}
                {!s.archived && (
                  <Button
                    onClick={handleArchiveSpreadsheet}
                    name={s.id}
                    variant={
                      waitingResponse && !error
                        ? 'secondary'
                        : waitingResponse && error
                        ? 'danger'
                        : 'primary'
                    }
                  >
                    {message}
                  </Button>
                )}
              </Col>
            </Row>
          );
        })}
        <Button
          onClick={handleNavigateToMain}
          style={{ margin: '15px 0', width: '100%' }}
          variant="danger"
        >
          Nazad
        </Button>
      </div>
    </PageWrapperComponent>
  );
};

export default ArchiveSpreadsheets;
