import { useState, useEffect, useCallback, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Row, Col, Container } from 'react-bootstrap';

import spreadsheetService from '../../../Services/spreadsheetService';

import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';

import styles from '../../FormModal/FormModal.module.css';
import AuthContext from '../../../Store/auth-context-api';

const ArchiveSpreadsheets = () => {
  const [spreadsheets, setSpreadsheets] = useState([]);

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

  const handleNavigateToMain = () => {
    navigate('/clanarine');
  };

  return (
    <PageWrapperComponent>
      <Container>
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
                    <Link to="/clanarine/arhiva-baza">Arhiva baza</Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
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
              <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <p className="mb-0">
                        <Button
                          variant={s.archived ? 'dark' : 'primary'}
                          disabled
                        >
                          {s.year} - {s.archived ? 'Arhiva' : 'Aktivna'}
                        </Button>
                      </p>
                      <p className="mb-0">
                        <Link
                          to={
                            s.archived
                              ? `pregled/${s.id}`
                              : '/clanarine/aktivna-baza'
                          }
                        >
                          <Button variant={s.archived ? 'success' : 'primary'}>
                            Pregled
                          </Button>
                        </Link>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
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
      </Container>
    </PageWrapperComponent>
  );
};

export default ArchiveSpreadsheets;
