import { useState, useEffect, useCallback, useContext } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';

import { Button, Container } from 'react-bootstrap';

import spreadsheetService from '../../../Services/spreadsheetService';

import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';

import styles from '../../FormModal/FormModal.module.css';
import AuthContext from '../../../Store/auth-context-api';

const ArchiveSpreadsheets = ({ supervisorView }) => {
  const [spreadsheets, setSpreadsheets] = useState([]);

  const { dzematId } = useParams();

  const [params] = useSearchParams();

  const redirectTo = params.get('redirectTo');

  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const token = JSON.parse(localStorage.getItem('user_jwt'));

  const handleFetchSpreadsheets = useCallback(() => {
    spreadsheetService
      .getAllSpreadsheets(
        token,
        supervisorView ? dzematId : ctx.userDataState.dzematId
      )
      .then(res => {
        console.log(res);
        setSpreadsheets(res.data.data['$values']);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token, ctx.userDataState.dzematId, dzematId, supervisorView]);

  useEffect(() => {
    handleFetchSpreadsheets();
  }, [handleFetchSpreadsheets]);

  const handleNavigate = () => {
    navigate(
      `${
        redirectTo === 'donation'
          ? '/donacije'
          : redirectTo === 'expenses'
          ? '/troskovi'
          : redirectTo === 'incomes'
          ? '/prihodi'
          : redirectTo === 'spreadsheet'
          ? '/clanarine'
          : '/not-found'
      }`
    );
  };

  return (
    <PageWrapperComponent>
      <Container>
        <div className={styles.modal} style={{ minWidth: '20%' }}>
          <h4
            style={{
              borderBottom: '1px solid #cecece',
              marginBottom: '15px',
              paddingBottom: '5px'
            }}
          >
            {spreadsheets.length < 1
              ? 'Nema kreiranih baza'
              : `Lista baza ${
                  redirectTo === 'donation'
                    ? '(Donacije)'
                    : redirectTo === 'expenses'
                    ? '(Troškovi)'
                    : redirectTo === 'incomes'
                    ? '(Prihodi)'
                    : ''
                }`}
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
                            redirectTo === 'spreadsheet'
                              ? s.archived
                                ? ctx.userDataState.position === 5
                                  ? `/pregled/lista/dzemata/clanarine/arhiva-baza/pregled/${dzematId}/${s.id}`
                                  : `pregled/${s.id}`
                                : ctx.userDataState.position === 5
                                ? `/pregled/lista/dzemata/clanarine/aktivna-baza/${dzematId}`
                                : '/clanarine/aktivna-baza'
                              : redirectTo === 'donation'
                              ? s.archived
                                ? `/donacije/arhivirane-donacije/${s.id}?archiveType=donation`
                                : '/donacije/aktivne-donacije'
                              : redirectTo === 'expenses'
                              ? s.archived
                                ? `/troskovi/arhivirani-troskovi/${s.id}?archiveType=expenses`
                                : `/troskovi/aktivni-troskovi`
                              : redirectTo === 'incomes'
                              ? s.archived
                                ? `/prihodi/arhivirani-prihodi/${s.id}?archiveType=incomes`
                                : `/prihodi/aktivni-prihodi`
                              : '/not-found'
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
            onClick={handleNavigate}
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
