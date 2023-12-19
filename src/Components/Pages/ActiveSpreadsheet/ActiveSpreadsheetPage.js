import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import SpreadsheetContext from '../../../Store/spreadsheet-context';

import styles from '../../FormModal/FormModal.module.css';

import noSpreadsheetLogo from '../../../Assets/Pictures/creationFailed.svg';

import { Button, Col, Form, Row } from 'react-bootstrap';

import FormAddMember from '../../FormModal/FormAddMember';
import FormAddPayment from '../../FormModal/FormAddPayment';
import ResponseModal from '../../ResponseModal/ResponseModal';

import memberService from '../../../Services/memberService';
import spreadsheetService from '../../../Services/spreadsheetService';
import paymentService from '../../../Services/paymentService';
import AuthContext from '../../../Store/auth-context-api';
import Spreadsheet from '../../Spreadsheet/Spreadsheet';

const ActiveSpreadsheetPage = () => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showViewMember, setShowViewMember] = useState(false);
  const [sureArchiveSpreadsheet, setSureArchiveSpreadsheet] = useState(false);
  const [password, setPassword] = useState();
  const [spreadsheetYear, setSpreadsheetYear] = useState();
  const tableColumns = [
    '#',
    'Ev. broj',
    'Ime',
    'Prezime',
    'Ime oca',
    'Status',
    'Članarina',
    'Uplaćeno',
    'Dug',
    'Zadnja uplata',
    'Postavke'
  ];

  const {
    handleFilterSpreadsheetMembers,
    handleUpdateSpreadsheet,
    handleFetchSpreadsheet,
    handleSetSelectedMember,
    handleSetResponse,
    spreadsheet,
    selectedMember,
    response
  } = useContext(SpreadsheetContext);

  const ctx = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    handleFetchSpreadsheet();
  }, [handleFetchSpreadsheet]);

  useEffect(() => {
    handleFilterSpreadsheetMembers();
  }, [handleFilterSpreadsheetMembers]);

  const handleAddMember = (token, data) => {
    handleAddMemberClick();
    handleSetResponse({
      message: 'Dodajem člana...',
      statusCode: null,
      loading: true
    });
    memberService
      .addMember(token, data)
      .then(res => {
        handleUpdateSpreadsheet();
        handleSetResponse({
          message: res.data.message,
          statusCode: res.status,
          loading: true,
          action: 'add_member'
        });
        setTimeout(() => {
          handleSetResponse({
            statusCode: null
          });
        }, 3000);
      })
      .catch(err => {
        handleSetResponse({
          message: err.response.data.message,
          statusCode: err.response.data.statusCode,
          loading: true,
          action: 'add_member'
        });
      });
  };

  const handleModifyMember = (token, data) => {
    handleAddMemberClick();
    handleSetResponse({
      message: 'Uređujem informacije...',
      statusCode: null,
      loading: true
    });
    memberService
      .modifyMember(token, data)
      .then(res => {
        handleSetSelectedMember(prevState => {
          prevState.member = res.data.data;
          return prevState;
        });
        handleUpdateSpreadsheet();
        setShowAddMember(false);
        handleSetResponse({
          message: res.data.message,
          statusCode: res.status,
          loading: true,
          action: 'modify_member'
        });
        setTimeout(() => {
          handleSetResponse({
            statusCode: null
          });
        }, 3000);
      })
      .catch(err => {
        handleSetResponse({
          message: err.response.data.message,
          statusCode: err.response.data.statusCode,
          loading: true,
          action: 'modify_member'
        });
      });
  };

  const handleArchiveSpreadsheet = ev => {
    ev.preventDefault();
    handleSetArchiveSpreadsheet();
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    handleSetResponse({
      message: 'Arhiviram...',
      statusCode: null,
      loading: true
    });
    spreadsheetService
      .archiveSpreadsheet(token, {
        dzematId: ctx.userDataState.dzematId,
        spreadsheetId: spreadsheet.id,
        password,
        spreadsheetYear
      })
      .then(res => {
        handleSetResponse({
          message: res.data.message + '.. Preusmjeravanje...',
          statusCode: res.status,
          loading: true,
          action: 'archive'
        });
        setTimeout(() => {
          handleSetResponse({
            statusCode: null
          });
          navigate('/clanarine');
        }, 3000);
      })
      .catch(err => {
        handleSetResponse({
          message: err.response.data.message,
          statusCode: err.response.data.statusCode,
          loading: true
        });
      });
  };

  const handleAddPayment = data => {
    handleShowAddPayment(false);
    handleSetResponse({
      message: 'Pišem uplatu...',
      statusCode: null,
      loading: true
    });
    const payloadData = {
      ...data,
      spreadsheetId: spreadsheet.id,
      memberId: selectedMember.member.id
    };
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    paymentService
      .addPayment(token, payloadData)
      .then(res => {
        handleUpdateSpreadsheet();
        handleSetResponse({
          message: res.data.message,
          statusCode: res.status,
          loading: true,
          action: 'add_payment'
        });
        setTimeout(() => {
          handleSetResponse({
            statusCode: null
          });
        }, 3000);
      })
      .catch(err => {
        handleSetResponse({
          message: err.response.data.message,
          statusCode: err.response.data.statusCode,
          loading: true,
          action: 'add_payment'
        });
      });
  };

  const handleAddMemberClick = () => {
    setShowAddMember(prevState => !prevState);
  };

  const handleSetArchiveSpreadsheet = () => {
    setSureArchiveSpreadsheet(prevState => !prevState);
  };

  const handleNavigateToCreateSpreadsheet = () => {
    navigate('/clanarine/kreiraj-bazu');
  };

  const handleNavigateToMembershipsPage = () => {
    navigate('/clanarine');
  };

  const handleShowAddPayment = mInfo => {
    if (!showAddPayment) {
      handleSetSelectedMember(mInfo);
    }
    setShowAddPayment(prevState => !prevState);
  };

  const handleSetViewMember = mInfo => {
    if (!showViewMember) {
      handleSetSelectedMember(mInfo);
    }
    setShowViewMember(prevState => !prevState);
  };

  return (
    <PageWrapperComponent>
      {response.loading && (
        <ResponseModal reInitialize={handleFetchSpreadsheet} />
      )}
      {showViewMember && (
        <FormAddMember
          viewMode={true}
          handleAddMemberClick={handleSetViewMember}
          handleFormSubmit={handleModifyMember}
          clearSubmit={() => {
            handleSetResponse(false);
          }}
        />
      )}
      {showAddPayment && (
        <FormAddPayment
          handleShowAddPayment={handleShowAddPayment}
          handleAddPayment={handleAddPayment}
        />
      )}
      {sureArchiveSpreadsheet && !response.loading && (
        <React.Fragment>
          <div className={styles.backdrop}></div>

          <div className={styles.modal}>
            <h4
              style={{
                borderBottom: '1px solid #cecece',
                marginBottom: '15px',
                paddingBottom: '5px'
              }}
            >
              Želite li arhivirati bazu za {spreadsheet.year}. godinu?
            </h4>
            <Form onSubmit={handleArchiveSpreadsheet}>
              <div
                style={{
                  marginBottom: '20px'
                }}
              >
                <p
                  variant="dark"
                  style={{
                    marginBottom: '15px',
                    color: 'red'
                  }}
                  disabled
                >
                  <strong>
                    *Molimo unesite vašu lozinku i godinu trenutne baze
                  </strong>
                </p>
                <Row>
                  <Col xl={6} md={6} sm={10}>
                    <Form.Group controlId="password">
                      <Form.Label>*Lozinka</Form.Label>
                      <Form.Control
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        type="password"
                        placeholder="********"
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xl={6} md={6} sm={10}>
                    <Form.Group controlId="spreadsheetYear">
                      <Form.Label>*Godina baze</Form.Label>
                      <Form.Control
                        value={spreadsheetYear}
                        onChange={ev => setSpreadsheetYear(ev.target.value)}
                        type="number"
                        placeholder="Godina"
                        size="sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <p style={{ fontStyle: 'italic', marginTop: '15px' }}>
                  *Klikom na dugme <strong>"Arhiviraj"</strong> potvrđujete da
                  arhivirate trenutno aktivnu bazu <br />
                  podataka, te da <strong>nemate ovlaštenje</strong> vratiti je
                  u aktivno stanje.
                </p>
              </div>
              <Button
                type="submit"
                size="md"
                style={{ width: '100%', marginBottom: '15px' }}
                variant="danger"
                disabled={!password || !spreadsheetYear}
              >
                Arhiviraj
              </Button>
              <Button
                onClick={handleSetArchiveSpreadsheet}
                size="md"
                style={{ width: '100%' }}
                variant="primary"
              >
                Odustani
              </Button>
            </Form>
          </div>
        </React.Fragment>
      )}
      {showAddMember && !response.loading && (
        <FormAddMember
          handleFormSubmit={handleAddMember}
          handleAddMemberClick={handleAddMemberClick}
        />
      )}
      {spreadsheet === null && !response.loading && (
        <div className={styles.responseModalAbsolute}>
          <img src={noSpreadsheetLogo} alt="ne postoji aktivna baza" />
          <p>Aktivna baza ne postoji. Molimo kreirajte bazu.</p>
          <Button
            onClick={handleNavigateToCreateSpreadsheet}
            className={styles.responseButton}
            style={{ marginTop: '10px', marginBottom: '6px' }}
            variant="success"
          >
            Kreiraj bazu
          </Button>
          <Button
            onClick={handleNavigateToMembershipsPage}
            className={styles.responseButton}
            variant="primary"
          >
            Nazad
          </Button>
        </div>
      )}
      {spreadsheet && !response.loading && (
        <Spreadsheet
          isViewMode={false}
          tableColumns={tableColumns}
          spreadsheet={spreadsheet}
          handleShowAddPayment={handleShowAddPayment}
          handleSetViewMember={handleSetViewMember}
          handleSetArchiveSpreadsheet={handleSetArchiveSpreadsheet}
          handleAddMemberClick={handleAddMemberClick}
        />
      )}
    </PageWrapperComponent>
  );
};

export default ActiveSpreadsheetPage;
