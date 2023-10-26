import React, { useState } from "react";

import { FloatingLabel, Form, Button, Row, Col } from "react-bootstrap";

import classes from "./FormModal.module.css";

const FormAddMember = ({ handleFormSubmit, handleAddMemberClick }) => {
  const [lastName, setLastName] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    const data = {
      lastName,
      fathersName,
      name,
      phoneNumber,
      address,
      email,
      status,
    };

    handleFormSubmit(data);
  };

  return (
    <React.Fragment>
      <div className={classes.backdrop}></div>
      <div className={`${classes.modal} ${classes.wide}`}>
        <Form>
          <h4>Osnovni podaci</h4>
          <Row className="g-2">
            <Col>
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
            <Col>
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
            <Col>
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
            <Col>
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
            <Col>
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
            <Col>
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
          <div style={{ marginBottom: "16px" }}>
            <FloatingLabel
              value={status}
              controlId="floatingSelect"
              label="Status člana"
            >
              <Form.Select
                onChange={(ev) => setStatus(ev.target.value)}
                aria-label="MemberStatus"
              >
                <option>Status člana</option>
                <option value="1">25. godina</option>
                <option value="2">Udovac/ica</option>
                <option value="3">Oženjen/Udata</option>
              </Form.Select>
            </FloatingLabel>
          </div>
          <Button
            onClick={handleSubmit}
            style={{ marginRight: "20px" }}
            variant="primary"
          >
            Dodaj člana
          </Button>
          <Button onClick={handleAddMemberClick} variant="danger">
            Odustani
          </Button>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default FormAddMember;
