import React, { useState } from "react";

import { FloatingLabel, Form, Button, Row, Col, Table } from "react-bootstrap";

import classes from "./FormModal.module.css";
import FamilyMember from "./FamilyMember";

import loadingSvg from "../../Assets/Pictures/loadingSvg.svg";
import creationFailed from "../../Assets/Pictures/creationFailed.svg";
import creationSuccess from "../../Assets/Pictures/creationSuccess.svg";

const FormAddMember = ({
  handleFormSubmit,
  handleAddMemberClick,
  response,
  waitingResponse,
  clearSubmit,
  viewMode,
  memberInfo,
}) => {
  const [evNumber, setEvNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [debt, setDebt] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const handeEnterEditMode = () => {
    setEvNumber(memberInfo.member.EvNumber);
    setFirstName(memberInfo.member.FirstName);
    setLastName(memberInfo.member.LastName);
    setFathersName(memberInfo.member.FathersName);
    setPhoneNumber(memberInfo.member.PhoneNumber);
    setAddress(memberInfo.member.Address);
    setEmail(memberInfo.member.Email);
    setStatus(memberInfo.member.Status);
  };

  const [showFamilyMembersForm, setShowFamilyMembersForm] = useState(false);

  const tableColumns = ["#", "Datum", "Iznos", "Nadležni"];

  const handleSubmit = (ev) => {
    ev.preventDefault();

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
      debt,
      active: true,
      addToSpreadsheet: true,
      dzematId: JSON.parse(localStorage.getItem("dzemat_id")),
    };
    const token = JSON.parse(localStorage.getItem("user_jwt"));
    handleFormSubmit(token, member);
  };

  const handleShowFamilyMemberForm = () => {
    setShowFamilyMembersForm((prevState) => !prevState);
  };

  const handleClearSubmit = () => {
    if (editMode) {
      setEditMode(false);
    } else {
      handleAddMemberClick();
    }
    clearSubmit();
  };

  const handleEditMode = () => {
    if (!editMode) {
      handeEnterEditMode();
    }
    setEditMode((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <div className={classes.backdrop}></div>
      {waitingResponse && (!viewMode || editMode) && (
        <div className={classes.responseModalAbsolute}>
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
              <Button
                className={classes.responseButton}
                onClick={handleClearSubmit}
                variant="success"
              >
                Nazad
              </Button>
            )}
        </div>
      )}
      {!showFamilyMembersForm && !waitingResponse && (
        <div className={classes.modal}>
          <h4
            style={{
              borderBottom: "1px solid #cecece",
              marginBottom: "15px",
              paddingBottom: "5px",
            }}
          >
            {!viewMode
              ? "Novi član"
              : viewMode && editMode
              ? "Uredi člana"
              : "Pregled člana"}
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
                      onChange={(ev) => setEvNumber(ev.target.value)}
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
                      onChange={(ev) => setLastName(ev.target.value)}
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
                      onChange={(ev) => setFathersName(ev.target.value)}
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
                      onChange={(ev) => setFirstName(ev.target.value)}
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
                      onChange={(ev) => setPhoneNumber(ev.target.value)}
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
                      onChange={(ev) => setAddress(ev.target.value)}
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
                        !viewMode || editMode ? email : memberInfo.member.Email
                      }
                      onChange={(ev) => setEmail(ev.target.value)}
                      type="email"
                      placeholder="Email adresa"
                      required
                      disabled={viewMode && !editMode}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <h4>Tehnički podaci</h4>

              <Row className="g-2" style={{ marginBottom: "16px" }}>
                <Col lg={2} md="auto" sm={8}>
                  <FloatingLabel controlId="floatingDebt" label="Dug">
                    <Form.Control
                      value={!viewMode || editMode ? debt : memberInfo.Debt}
                      onChange={(ev) => setDebt(ev.target.value)}
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
                      onChange={(ev) => setStatus(ev.target.value)}
                      aria-label="MemberStatus"
                      required
                      disabled={viewMode && !editMode}
                      defaultValue={"0"}
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

              {!viewMode && (
                <div style={{ marginBottom: "20px" }}>
                  <Button
                    variant="success"
                    onClick={handleShowFamilyMemberForm}
                  >
                    Dodaj člana porodice
                  </Button>
                </div>
              )}
              {viewMode && memberInfo.payments.length < 1 && !editMode && (
                <h5>Nema uplata za otvorenu bazu</h5>
              )}
              {viewMode && memberInfo.payments.length > 0 && (
                <React.Fragment>
                  <h4>Uplate za otvorenu bazu</h4>
                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
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
                              <td>{el.dateOfPayment.split("T")[0]}</td>
                              <td>{el.amount}KM</td>
                              <td>
                                {el.supervisor.FirstName +
                                  " " +
                                  el.supervisor.LastName}
                              </td>
                              {editMode && (
                                <td>
                                  <Button size="sm" variant="danger">
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
                  style={{ marginRight: "20px" }}
                  variant={editMode ? "success" : "primary"}
                >
                  Spremi
                </Button>
              )}
              {viewMode && !editMode && (
                <Button
                  onClick={handleEditMode}
                  style={{ marginRight: "15px" }}
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
                variant={!viewMode ? "danger" : "primary"}
              >
                {!viewMode
                  ? "Odustani"
                  : viewMode && !editMode
                  ? "Nazad"
                  : "Odustani"}
              </Button>
            </Form>
          </div>
        </div>
      )}

      {showFamilyMembersForm && (
        <FamilyMember handleShowFamilyMemberForm={handleShowFamilyMemberForm} />
      )}
    </React.Fragment>
  );
};

export default FormAddMember;
