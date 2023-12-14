import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import ActiveSpreadsheetContext from '../../../Store/active-spreadsheet-context';

import classes from './ActiveSpreadsheetPage.module.css';
import styles from '../../FormModal/FormModal.module.css';

import noSpreadsheetLogo from '../../../Assets/Pictures/creationFailed.svg';

import {
  Container,
  Button,
  Table,
  Form,
  Row,
  Col,
  FloatingLabel
} from 'react-bootstrap';

import FormAddMember from '../../FormModal/FormAddMember';
import FormAddPayment from '../../FormModal/FormAddPayment';
import ResponseModal from '../../ResponseModal/ResponseModal';

import memberService from '../../../Services/memberService';
import spreadsheetService from '../../../Services/spreadsheetService';
import paymentService from '../../../Services/paymentService';
import AuthContext from '../../../Store/auth-context-api';

const ActiveSpreadsheetPage = () => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showViewMember, setShowViewMember] = useState(false);
  const [sureArchiveSpreadsheet, setSureArchiveSpreadsheet] = useState(false);

  const {
    handleFilterActiveSpreadsheetMembers,
    handleUpdateActiveSpreadsheet,
    handleFetchActiveSpreadsheet,
    handleSetSelectedMember,
    handleSetSearchFirstName,
    handleSetSearchLastName,
    handleSetSearchFathersName,
    handleRemoveFilters,
    handleSetResponse,
    handleSetPageNumber,
    handleSetPageSize,
    pageInfo,
    pageSize,
    activeSpreadsheet,
    selectedMember,
    membersInfo,
    searchFirstName,
    searchLastName,
    searchFathersName,
    response
  } = useContext(ActiveSpreadsheetContext);

  const ctx = useContext(AuthContext);

  const navigate = useNavigate();

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

  useEffect(() => {
    handleFetchActiveSpreadsheet();
  }, [handleFetchActiveSpreadsheet]);

  useEffect(() => {
    handleFilterActiveSpreadsheetMembers();
  }, [handleFilterActiveSpreadsheetMembers]);

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
        handleUpdateActiveSpreadsheet();
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
        handleUpdateActiveSpreadsheet();
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

  const handleArchiveSpreadsheet = () => {
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
        spreadsheetId: activeSpreadsheet.id
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
      spreadsheetId: activeSpreadsheet.id,
      memberId: selectedMember.member.id
    };
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    paymentService
      .addPayment(token, payloadData)
      .then(res => {
        handleUpdateActiveSpreadsheet();
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
        <ResponseModal reInitialize={handleFetchActiveSpreadsheet} />
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
              Želite li arhivirati bazu za {activeSpreadsheet.year}. godinu?
            </h4>
            <Button
              onClick={handleArchiveSpreadsheet}
              size="lg"
              style={{ width: '100%', marginBottom: '15px' }}
              variant="danger"
            >
              Arhiviraj
            </Button>
            <Button
              onClick={handleSetArchiveSpreadsheet}
              size="lg"
              style={{ width: '100%' }}
              variant="primary"
            >
              Odustani
            </Button>
          </div>
        </React.Fragment>
      )}
      {showAddMember && !response.loading && (
        <FormAddMember
          handleFormSubmit={handleAddMember}
          handleAddMemberClick={handleAddMemberClick}
        />
      )}
      {activeSpreadsheet === null && !response.loading && (
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
      {activeSpreadsheet && !response.loading && (
        <div className={classes.mainContainer}>
          <Container fluid="md">
            <Row
              style={{
                marginTop: '2vh',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline'
              }}
            >
              <Col className={classes.optionButtons} lg="auto" md="auto" xs={7}>
                <Button size="md" variant="dark" disabled>
                  {`Baza za godinu ${activeSpreadsheet.year}.`}
                </Button>
              </Col>
              <Col className={classes.optionButtons} lg="auto" md="auto" xs={7}>
                <Button
                  size="md"
                  variant="primary"
                  onClick={handleAddMemberClick}
                >
                  Dodaj novog člana
                </Button>
              </Col>
              <Col className={classes.optionButtons} lg="auto" md="auto" xs={7}>
                <Button
                  onClick={() => {
                    navigate('/clanarine/izradi-izvjestaj');
                  }}
                  size="md"
                  variant="primary"
                >
                  Izradi izvještaj
                </Button>
              </Col>
              <Col className={classes.optionButtons} lg="auto" md="auto" xs={7}>
                <Button
                  onClick={handleSetArchiveSpreadsheet}
                  size="md"
                  variant="danger"
                >
                  Arhiviraj bazu
                </Button>
              </Col>
              <Col lg="auto" md="auto" xs={7}>
                <FloatingLabel
                  controlId="floatingPageSize"
                  label="Broj članova po stranici"
                >
                  <Form.Select
                    style={{ width: '200px' }}
                    value={pageSize}
                    onChange={ev => {
                      handleSetPageSize(ev.target.value);
                    }}
                    aria-label="PageSize"
                  >
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Table style={{ marginTop: '2vh' }} hover striped responsive>
              <thead>
                <tr>
                  {tableColumns.map((val, index) => (
                    <th
                      style={{ minWidth: `${index === 9 ? '120px' : '90px'}` }}
                    >
                      {val}
                    </th>
                  ))}
                </tr>
                <tr>
                  <th></th>
                  <th>
                    <Form.Control
                      size="sm"
                      name="firstName"
                      type="text"
                      placeholder="Filter"
                      disabled
                    />
                  </th>
                  <th>
                    <Form.Control
                      size="sm"
                      name="firstName"
                      type="text"
                      placeholder="Ime člana"
                      value={searchFirstName}
                      onChange={handleSetSearchFirstName}
                    />
                  </th>
                  <th>
                    <Form.Control
                      size="sm"
                      name="lastName"
                      type="text"
                      placeholder="Prezime"
                      value={searchLastName}
                      onChange={handleSetSearchLastName}
                    />
                  </th>
                  <th>
                    <Form.Control
                      size="sm"
                      name="lastName"
                      type="text"
                      placeholder="Ime oca"
                      value={searchFathersName}
                      onChange={handleSetSearchFathersName}
                    />
                  </th>
                  <th>
                    <Form.Control
                      size="sm"
                      name="firstName"
                      type="text"
                      placeholder="Filter"
                      disabled
                    />
                  </th>

                  <th></th>
                  <th>
                    <Form.Control
                      size="sm"
                      name="firstName"
                      type="text"
                      placeholder="Filter"
                      disabled
                    />
                  </th>
                  <th>
                    <Form.Control
                      size="sm"
                      name="firstName"
                      type="text"
                      placeholder="Filter"
                      disabled
                    />
                  </th>
                  <th></th>
                  <th>
                    <Button
                      onClick={handleRemoveFilters}
                      variant="danger"
                      size="sm"
                    >
                      <strong>Bez filtera</strong>
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {membersInfo.map((m, index) => {
                  return (
                    <tr>
                      {' '}
                      <td>{index + 1}</td>
                      <td>
                        <strong> {m.member.evNumber}</strong>
                      </td>
                      <td>
                        <strong> {m.member.firstName}</strong>
                      </td>
                      <td>
                        <strong> {m.member.lastName}</strong>
                      </td>
                      <td>
                        <strong> {m.member.fathersName}</strong>
                      </td>
                      <td>
                        <Button
                          style={{ minWidth: '130px' }}
                          variant="light"
                          disabled
                          size="sm"
                        >
                          <strong>
                            {m.member.status === 0
                              ? 'Brak'
                              : m.member.status === 1
                              ? 'Udovac'
                              : m.member.status === 2
                              ? 'Granična dob'
                              : ''}
                          </strong>
                        </Button>
                      </td>
                      <td>
                        <Button
                          style={{ minWidth: '80px' }}
                          variant="primary"
                          disabled
                          size="sm"
                        >
                          <strong>{m.membershipFee}KM</strong>
                        </Button>
                      </td>
                      <td>
                        {m.member.debt === 0 ? (
                          <Button
                            style={{ minWidth: '140px' }}
                            variant="success"
                            disabled
                            size="sm"
                          >
                            <strong>{m.totalAmountPayed}KM | Da</strong>
                          </Button>
                        ) : (
                          <Button
                            style={{ minWidth: '140px' }}
                            onClick={() => {
                              handleShowAddPayment(m);
                            }}
                            size="sm"
                            variant="warning"
                          >
                            <strong>{m.totalAmountPayed}KM | Uplati</strong>
                          </Button>
                        )}
                      </td>
                      <td>
                        <Button
                          style={{ minWidth: '80px' }}
                          size="sm"
                          variant={m.member.debt === 0 ? 'success' : 'danger'}
                          disabled
                        >
                          {m.member.debt}KM
                        </Button>
                      </td>
                      <td>
                        <Button
                          style={{ minWidth: '120px' }}
                          variant="success"
                          disabled
                          size="sm"
                        >
                          <strong>
                            {m.payments['$values'].length > 0
                              ? m.payments['$values'][0].dateOfPayment.split(
                                  'T'
                                )[0]
                              : 'Nema uplata'}
                          </strong>
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() => handleSetViewMember(m)}
                          size="sm"
                          variant="primary"
                        >
                          Informacije
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {pageInfo.hasPreviousPage && (
                  <Button
                    variant="primary"
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                      handleSetPageNumber(prevState => prevState - 1);
                    }}
                  >
                    Prethodna stranica
                  </Button>
                )}
                {pageInfo.hasNextPage && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleSetPageNumber(prevState => prevState + 1);
                    }}
                  >
                    Naredna stranica
                  </Button>
                )}
              </div>
              {pageInfo.totalCount > 1 && (
                <Button variant="secondary" disabled>
                  Ukupan broj članova: {pageInfo.totalCount}
                </Button>
              )}
            </div>
          </Container>
        </div>
      )}
    </PageWrapperComponent>
  );
};

export default ActiveSpreadsheetPage;
