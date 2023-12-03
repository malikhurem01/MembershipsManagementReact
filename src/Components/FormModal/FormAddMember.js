import React, { useContext, useState } from 'react';

import { FloatingLabel, Form, Button, Row, Col, Table } from 'react-bootstrap';

import classes from './FormModal.module.css';
import FamilyMember from './FamilyMember';

import ActiveSpreadsheetContext from '../../Store/active-spreadsheet-context';
import paymentService from '../../Services/paymentService';

const FormAddMember = ({
  handleFormSubmit,
  handleAddMemberClick,
  viewMode
}) => {
  const [evNumber, setEvNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fathersName, setFathersName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [debt, setDebt] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [showFamilyMembersForm, setShowFamilyMembersForm] = useState(false);
  const [sureDeleteFamilyMember, setSureDeleteFamilyMember] = useState(false);
  const [sureDeletePayment, setSureDeletePayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState();
  let {
    handleUpdateActiveSpreadsheet,
    handleSetResponse,
    selectedMember: memberInfo,
    activeSpreadsheet,
    response
  } = useContext(ActiveSpreadsheetContext);

  const handeEnterEditMode = () => {
    setEvNumber(memberInfo.member.EvNumber);
    setFirstName(memberInfo.member.FirstName);
    setLastName(memberInfo.member.LastName);
    setFathersName(memberInfo.member.FathersName);
    setPhoneNumber(memberInfo.member.PhoneNumber);
    setAddress(memberInfo.member.Address);
    setEmail(memberInfo.member.Email);
    setStatus(memberInfo.member.Status);
    setFamilyMembers(memberInfo.member.FamilyMembers);
  };

  const tableColumns = ['#', 'Datum uplate', 'Iznos', 'Nadležni'];

  const handleSubmit = ev => {
    ev.preventDefault();
    setEditMode(false);
    const member = {
      id: editMode ? memberInfo.member.Id : null,
      evNumber: +evNumber,
      firstName,
      lastName,
      fathersName,
      phoneNumber,
      address,
      email,
      status: +status,
      familyMembers,
      debt,
      active: true,
      addToSpreadsheet: true,
      dzematId: JSON.parse(localStorage.getItem('dzemat_id'))
    };
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    handleFormSubmit(token, member);
  };

  const handleShowFamilyMemberForm = () => {
    setShowFamilyMembersForm(prevState => !prevState);
  };

  const handleAddFamilyMemberToState = data => {
    setFamilyMembers(prevState => {
      const updatedState = [...prevState, data];
      return updatedState;
    });
  };

  const handleDeleteFamilyMemberFromState = data => {
    setFamilyMembers(prevState => {
      const updatedState = prevState.filter(
        fm => fm.firstName !== data.firstName
      );
      console.log(updatedState);
      return updatedState;
    });
  };

  const handleSetFamilyMemberState = state => {
    setFamilyMembers(state);
  };

  const handleSetDeleteFamilyMember = () => {
    setSureDeleteFamilyMember(prevState => !prevState);
  };

  const handleSetDeletePayment = data => {
    if (!sureDeletePayment) {
      setSelectedPayment(data);
    }
    setSureDeletePayment(prevState => !prevState);
  };

  const handleEditMode = () => {
    if (!editMode) {
      handeEnterEditMode();
    }
    setEditMode(prevState => !prevState);
  };

  const handleDeletePayment = () => {
    handleSetDeletePayment();
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    handleSetResponse({
      message: 'Uklanjam uplatu...',
      statusCode: null,
      loading: true
    });
    paymentService
      .deletePayment(token, {
        id: selectedPayment.id,
        memberId: memberInfo.member.Id,
        spreadsheetId: activeSpreadsheet.id
      })
      .then(res => {
        handleUpdateActiveSpreadsheet();
        handleSetResponse({
          message: res.data.message,
          statusCode: res.status,
          loading: true,
          action: 'payment_delete'
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
          action: 'payment_delete'
        });
      });
  };
  return (
    <React.Fragment>
      {sureDeletePayment && !response.loading && (
        <div className={classes.modal}>
          <h4
            style={{
              borderBottom: '1px solid #cecece',
              marginBottom: '15px',
              paddingBottom: '5px'
            }}
          >
            Želite li izbrisati uplatu?
          </h4>
          <div
            style={{
              margin: '15px 15px',
              borderBottom: '1px solid #cecece',
              marginBottom: '15px',
              paddingBottom: '5px'
            }}
          >
            <h6>
              {`Ime i prezime: ${memberInfo.member.FirstName} ${memberInfo.member.LastName}`}
            </h6>
            <h6>{`Iznos: ${selectedPayment.amount}KM`}</h6>
            <h6>{`Datum uplate: ${
              selectedPayment.dateOfPayment.split('T')[0]
            }`}</h6>
            <h6>{`Baza za godinu: ${activeSpreadsheet.year}`}</h6>
          </div>
          <div
            style={{ margin: '15px 15px', fontSize: '16px', fontWeight: '700' }}
          >
            <Button variant="outline-dark">
              <strong>
                Iznos uplate će se upisati u dug člana{' '}
                {`${memberInfo.member.FirstName} ${memberInfo.member.LastName}`}
              </strong>
            </Button>
          </div>
          <Button
            onClick={handleDeletePayment}
            size="md"
            style={{ width: '30%', marginRight: '10px' }}
            variant="danger"
          >
            Da
          </Button>
          <Button
            onClick={handleSetDeletePayment}
            size="md"
            style={{ width: '30%' }}
            variant="primary"
          >
            Ne
          </Button>
        </div>
      )}
      <div className={classes.backdrop}></div>
      {!showFamilyMembersForm &&
        !response.loading &&
        !sureDeleteFamilyMember &&
        !sureDeletePayment && (
          <div className={classes.modal}>
            <h4
              style={{
                borderBottom: '1px solid #cecece',
                marginBottom: '15px',
                paddingBottom: '5px'
              }}
            >
              {!viewMode
                ? 'Novi član'
                : viewMode && editMode
                ? 'Uredi člana'
                : 'Pregled člana'}
            </h4>
            <div className={classes.scrollable}>
              <Form onSubmit={handleSubmit}>
                <h4>Osnovni podaci</h4>
                <Row className="g-2">
                  <Col lg={2} md="auto" sm={8}>
                    <FloatingLabel
                      controlId="floatingEvNumber"
                      label="Ev. broj"
                      className="mb-3"
                    >
                      <Form.Control
                        value={
                          !viewMode || editMode
                            ? evNumber
                            : memberInfo.member.EvNumber
                        }
                        onChange={ev => setEvNumber(ev.target.value)}
                        type="number"
                        placeholder="Ev. broj"
                        required
                        disabled={viewMode && !editMode}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={3} md="auto" sm={8}>
                    <FloatingLabel
                      controlId="floatingLastName"
                      label="Prezime"
                      className="mb-3"
                    >
                      <Form.Control
                        value={
                          !viewMode || editMode
                            ? lastName
                            : memberInfo.member.LastName
                        }
                        onChange={ev => setLastName(ev.target.value)}
                        type="text"
                        placeholder="Prezime"
                        required
                        disabled={viewMode && !editMode}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={3} md="auto" sm={8}>
                    <FloatingLabel
                      controlId="floatingFathersName"
                      label="Ime oca"
                      className="mb-3"
                    >
                      <Form.Control
                        value={
                          !viewMode || editMode
                            ? fathersName
                            : memberInfo.member.FathersName
                        }
                        onChange={ev => setFathersName(ev.target.value)}
                        type="text"
                        placeholder="Ime oca"
                        required
                        disabled={viewMode && !editMode}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={3} md="auto" sm={8}>
                    <FloatingLabel
                      controlId="floatingName"
                      label="Ime člana"
                      className="mb-3"
                    >
                      <Form.Control
                        value={
                          !viewMode || editMode
                            ? firstName
                            : memberInfo.member.FirstName
                        }
                        onChange={ev => setFirstName(ev.target.value)}
                        type="text"
                        placeholder="Ime člana"
                        required
                        disabled={viewMode && !editMode}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <h4>Kontakt podaci</h4>

                <Row className="g-2">
                  <Col lg={3} md="auto" sm={8}>
                    <FloatingLabel
                      controlId="floatingPhoneNumber"
                      label="Broj telefona"
                      className="mb-3"
                    >
                      <Form.Control
                        value={
                          !viewMode || editMode
                            ? phoneNumber
                            : memberInfo.member.PhoneNumber
                        }
                        onChange={ev => setPhoneNumber(ev.target.value)}
                        type="text"
                        placeholder="Broj telefona"
                        required
                        disabled={viewMode && !editMode}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={4} md="auto" sm={8}>
                    <FloatingLabel
                      controlId="floatingAddress"
                      label="Adresa stanovanja"
                      className="mb-3"
                    >
                      <Form.Control
                        value={
                          !viewMode || editMode
                            ? address
                            : memberInfo.member.Address
                        }
                        onChange={ev => setAddress(ev.target.value)}
                        type="text"
                        placeholder="Adresa Stanovanja"
                        required
                        disabled={viewMode && !editMode}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={4} md="auto" sm={8}>
                    <FloatingLabel
                      controlId="floatingEmail"
                      label="Email adresa"
                      className="mb-3"
                    >
                      <Form.Control
                        value={
                          !viewMode || editMode
                            ? email
                            : memberInfo.member.Email
                        }
                        onChange={ev => setEmail(ev.target.value)}
                        type="email"
                        placeholder="Email adresa"
                        required
                        disabled={viewMode && !editMode}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <h4>Tehnički podaci</h4>

                <Row className="g-2" style={{ marginBottom: '16px' }}>
                  <Col lg={2} md="auto" sm={8}>
                    <FloatingLabel controlId="floatingDebt" label="Dug">
                      <Form.Control
                        value={!viewMode || editMode ? debt : memberInfo.Debt}
                        onChange={ev => setDebt(ev.target.value)}
                        type="number"
                        placeholder="Dug"
                        required
                        disabled={viewMode && !editMode}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col lg={4} md="auto" sm={8}>
                    <FloatingLabel
                      controlId="floatingStatus"
                      label="Status člana"
                    >
                      <Form.Select
                        onChange={ev => setStatus(ev.target.value)}
                        aria-label="MemberStatus"
                        required
                        disabled={viewMode && !editMode}
                        defaultValue={'0'}
                        value={
                          !viewMode || editMode
                            ? status
                            : memberInfo.member.Status
                        }
                      >
                        <option>Status člana</option>
                        <option value="0">Brak</option>
                        <option value="1">Udovac/Udovica</option>
                        <option value="2">Granična dob</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>

                {(!viewMode || editMode) && (
                  <div style={{ marginBottom: '20px' }}>
                    <Button
                      variant="success"
                      onClick={handleShowFamilyMemberForm}
                    >
                      {!editMode && 'Dodaj članove porodice'}
                      {editMode && 'Uredi članove porodice'}
                    </Button>
                  </div>
                )}

                {viewMode &&
                  memberInfo.member.FamilyMembers.length < 1 &&
                  !editMode && (
                    <Button
                      style={{
                        display: 'block',
                        marginBottom: '15px',
                        minWidth: '370px'
                      }}
                      variant="warning"
                      disabled
                    >
                      <h6 style={{ marginTop: '5px' }}>
                        Nema spremljenih članova porodice
                      </h6>
                    </Button>
                  )}
                {viewMode &&
                  memberInfo.member.FamilyMembers.length > 0 &&
                  !editMode && (
                    <React.Fragment>
                      <h4>Članovi porodice</h4>
                      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Table hover striped responsive>
                          <thead>
                            <tr>
                              {[
                                '#',
                                'Ime',
                                'Prezime',
                                'Datum rođenja',
                                'Status'
                              ].map((el, index) => (
                                <th key={index}>{el}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {memberInfo.member.FamilyMembers.map(
                              (el, index) => {
                                return (
                                  <tr>
                                    <td>{index}</td>
                                    <td>{el.FirstName}</td>
                                    <td>{el.LastName}</td>
                                    <td style={{ minWidth: '70px' }}>
                                      {el.DateOfBirth.split('T')[0]}
                                    </td>
                                    <td>{el.status}</td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </React.Fragment>
                  )}
                {viewMode && memberInfo.payments.length < 1 && !editMode && (
                  <Button
                    style={{
                      display: 'block',
                      marginBottom: '15px',
                      minWidth: '370px'
                    }}
                    variant="warning"
                    disabled
                  >
                    <h6 style={{ marginTop: '5px' }}>
                      Nema uplata za otvorenu bazu
                    </h6>
                  </Button>
                )}
                {viewMode && memberInfo.payments.length > 0 && (
                  <React.Fragment>
                    <h4>Uplate za otvorenu bazu</h4>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                      <Table hover striped responsive>
                        <thead>
                          <tr>
                            {tableColumns.map((el, index) => (
                              <th key={index}>{el}</th>
                            ))}
                            {editMode && <th key="5">Postavke</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {memberInfo.payments.map((el, index) => {
                            return (
                              <tr>
                                <td>{index}</td>
                                <td style={{ minWidth: '70px' }}>
                                  {el.dateOfPayment.split('T')[0]}
                                </td>
                                <td>{el.amount}KM</td>
                                <td>
                                  {el.supervisor.FirstName +
                                    ' ' +
                                    el.supervisor.LastName}
                                </td>
                                {editMode && (
                                  <td>
                                    <Button
                                      onClick={() => handleSetDeletePayment(el)}
                                      size="sm"
                                      variant="danger"
                                    >
                                      Izbriši
                                    </Button>
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                      <Button size="sm" variant="secondary" disabled>
                        <strong>Ukupno: {memberInfo.totalAmountPayed}KM</strong>
                      </Button>
                    </div>
                  </React.Fragment>
                )}
                {(!viewMode || editMode) && (
                  <Button
                    type="submit"
                    style={{ marginRight: '20px' }}
                    variant={editMode ? 'success' : 'primary'}
                  >
                    Spremi
                  </Button>
                )}
                {viewMode && !editMode && (
                  <Button
                    onClick={handleEditMode}
                    style={{ marginRight: '15px' }}
                    variant="success"
                  >
                    Uredi
                  </Button>
                )}
                <Button
                  onClick={() => {
                    if (!editMode) {
                      handleAddMemberClick();
                    } else {
                      setEditMode(false);
                    }
                  }}
                  variant={!viewMode ? 'danger' : 'primary'}
                >
                  {!viewMode
                    ? 'Odustani'
                    : viewMode && !editMode
                    ? 'Nazad'
                    : 'Odustani'}
                </Button>
              </Form>
            </div>
          </div>
        )}

      {showFamilyMembersForm && (
        <FamilyMember
          memberToAddFamilyMembers={familyMembers}
          handleAddFamilyMemberToState={handleAddFamilyMemberToState}
          handleDeleteFamilyMemberFromState={handleDeleteFamilyMemberFromState}
          handleSetFamilyMemberState={handleSetFamilyMemberState}
          handleShowFamilyMemberForm={handleShowFamilyMemberForm}
          handleSetDeleteFamilyMember={handleSetDeleteFamilyMember}
          sureDeleteFamilyMember={sureDeleteFamilyMember}
          editMode={editMode}
          viewMode={viewMode}
        />
      )}
    </React.Fragment>
  );
};

export default FormAddMember;
