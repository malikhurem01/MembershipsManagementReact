import React, { useState } from "react";

import { FloatingLabel, Form, Button, Row, Col } from "react-bootstrap";

import classes from "./FormModal.module.css";
import FamilyMember from "./FamilyMember";

const FormAddMember = ({ handleFormSubmit, handleAddMemberClick }) => {
  const [evNumber, setEvNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [membershipFee, setMembershipFee] = useState("");
  const [status, setStatus] = useState("");
  const [debt, setDebt] = useState("");
  const [paymentMade, setPaymentMade] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);

  const [showFamilyMembersForm, setShowFamilyMembersForm] = useState(false);

  const handleSubmit = () => {
    const data = {
      evNumber,
      lastName,
      fathersName,
      name,
      phoneNumber,
      address,
      email,
      membershipFee,
      status,
      debt,
      paymentMade,
      familyMembers,
    };

    /*handleFormSubmit(data);*/
  };

  const handleShowFamilyMemberForm = () => {
    setShowFamilyMembersForm((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <div className={classes.backdrop}></div>
      {!showFamilyMembersForm && (
        <div className={classes.modal}>
          <div className={classes.scrollable}>
            <Form>
              <h4>Osnovni podaci</h4>
              <Row className="g-2">
                <Col lg={2} md="auto" sm={8}>
                  <FloatingLabel
                    controlId="floatingEvNumber"
                    label="Ev. broj"
                    className="mb-3"
                  >
                    <Form.Control
                      value={evNumber}
                      onChange={(ev) => setEvNumber(ev.target.value)}
                      type="number"
                      placeholder="Ev. broj"
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
                      value={lastName}
                      onChange={(ev) => setLastName(ev.target.value)}
                      type="text"
                      placeholder="Prezime"
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
                      value={fathersName}
                      onChange={(ev) => setFathersName(ev.target.value)}
                      type="text"
                      placeholder="Ime oca"
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
                      value={name}
                      onChange={(ev) => setName(ev.target.value)}
                      type="text"
                      placeholder="Ime člana"
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
                      value={phoneNumber}
                      onChange={(ev) => setPhoneNumber(ev.target.value)}
                      type="number"
                      placeholder="Broj telefona"
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
                      value={address}
                      onChange={(ev) => setAddress(ev.target.value)}
                      type="text"
                      placeholder="Adresa Stanovanja"
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
                      value={email}
                      onChange={(ev) => setEmail(ev.target.value)}
                      type="email"
                      placeholder="Email adresa"
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <h4>Tehnički podaci</h4>

              <Row className="g-2" style={{ marginBottom: "16px" }}>
                <Col lg={2} md="auto" sm={8}>
                  <FloatingLabel
                    controlId="floatingMembershipFee"
                    label="Članarina"
                  >
                    <Form.Control
                      value={membershipFee}
                      onChange={(ev) => setMembershipFee(ev.target.value)}
                      type="number"
                      placeholder="Članarina"
                    />
                  </FloatingLabel>
                </Col>
                <Col lg={2} md="auto" sm={8}>
                  <FloatingLabel controlId="floatingDebt" label="Dug">
                    <Form.Control
                      value={debt}
                      onChange={(ev) => setDebt(ev.target.value)}
                      type="number"
                      placeholder="Dug"
                    />
                  </FloatingLabel>
                </Col>
                <Col lg={3} md="auto" sm={8}>
                  <FloatingLabel
                    value={paymentMade}
                    controlId="floatingPayed"
                    label="Uplaćeno?"
                  >
                    <Form.Select
                      onChange={(ev) => setPaymentMade(ev.target.value)}
                      aria-label="MemberStatus"
                    >
                      <option>Uplaćeno?</option>
                      <option value="1">Da</option>
                      <option value="2">Ne</option>
                    </Form.Select>
                  </FloatingLabel>{" "}
                </Col>
                <Col lg={4} md="auto" sm={8}>
                  <FloatingLabel
                    value={status}
                    controlId="floatingStatus"
                    label="Status člana"
                  >
                    <Form.Select
                      onChange={(ev) => setStatus(ev.target.value)}
                      aria-label="MemberStatus"
                    >
                      <option>Status člana</option>
                      <option value="1">Brak</option>
                      <option value="2">Udovac/Udovica</option>
                      <option value="3">Granična dob</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>

              <div style={{ marginBottom: "20px" }}>
                <Button variant="success" onClick={handleShowFamilyMemberForm}>
                  Dodaj člana porodice
                </Button>
              </div>
              <Button
                onClick={handleSubmit}
                style={{ marginRight: "20px" }}
                variant="primary"
              >
                Spremi
              </Button>
              <Button onClick={handleAddMemberClick} variant="danger">
                Odustani
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
