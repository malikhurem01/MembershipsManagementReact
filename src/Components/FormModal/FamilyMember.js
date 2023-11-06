import React, { useState } from "react";
import classes from "./FormModal.module.css";

import { Row, Col, FloatingLabel, Form, Button, Table } from "react-bootstrap";

const FamilyMember = ({
  handleShowFamilyMemberForm,
  handleAddFamilyMember,
}) => {
  const [sureDeleteFamilyMember, setHandleSureDeleteFamilyMember] =
    useState(false);

  const handleSureDeleteFamilyMember = () => {
    setHandleSureDeleteFamilyMember((prevState) => !prevState);
  };
  const handleSubmitForm = (ev) => {
    ev.preventDefault();
    //LOGIC
  };
  const tableColumns = [
    "Ime",
    "Prezime",
    "Godište",
    "Dijete/Partner",
    "Postavke",
  ];

  const handleDeleteFamilyMember = () => {
    //LOGIC
  };

  return (
    <React.Fragment>
      {!sureDeleteFamilyMember && (
        <div className={classes.modal}>
          <h4
            style={{
              borderBottom: "1px solid #cecece",
              marginBottom: "15px",
              paddingBottom: "5px",
            }}
          >
            Članovi porodice
          </h4>
          <Form onSubmit={handleSubmitForm}>
            <Row className="g-2">
              <h4>Osnovni podaci</h4>

              <Col lg={3} md="auto" sm={8}>
                <FloatingLabel
                  controlId="floatingMembershipFamilyName"
                  label="Ime"
                >
                  <Form.Control type="text" placeholder="Ime" />
                </FloatingLabel>
              </Col>
              <Col lg={3} md="auto" sm={8}>
                <FloatingLabel
                  controlId="floatingMembershipFamilyLastName"
                  label="Prezime"
                >
                  <Form.Control type="text" placeholder="Prezime" />
                </FloatingLabel>
              </Col>
              <Col lg={3} md="auto" sm={8}>
                <FloatingLabel
                  controlId="floatingMembershipFamilyBirthDate"
                  label="Godina rođenja"
                >
                  <Form.Control type="date" placeholder="Godina rođenja" />
                </FloatingLabel>
              </Col>
              <Col lg={3} md="auto" sm={8}>
                <FloatingLabel
                  controlId="floatingFamilyStatus"
                  label="Dijete/Partner"
                >
                  <Form.Select aria-label="FamilyMemberStatus">
                    <option>Dijete/Partner</option>
                    <option value="1">Partner</option>
                    <option value="2">Dijete</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Table hover striped responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    {tableColumns.map((el, index) => (
                      <th key={index}>{el}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <td key={index}>Table cell {index}</td>
                    ))}
                    <td>
                      <Button
                        onClick={handleSureDeleteFamilyMember}
                        size="sm"
                        variant="danger"
                      >
                        Izbriši
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <td key={index}>Table cell {index}</td>
                    ))}
                    <td>
                      <Button size="sm" variant="danger">
                        Izbriši
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <td key={index}>Table cell {index}</td>
                    ))}
                    <td>
                      <Button size="sm" variant="danger">
                        Izbriši
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <Button
              type="submit"
              style={{ marginRight: "20px" }}
              variant="primary"
            >
              Spremi
            </Button>
            <Button onClick={handleShowFamilyMemberForm} variant="danger">
              Nazad
            </Button>
          </Form>
        </div>
      )}
      {sureDeleteFamilyMember && (
        <div className={classes.modal + " " + classes.noExtraHeight}>
          <h4
            style={{
              borderBottom: "1px solid #cecece",
              marginBottom: "15px",
              paddingBottom: "5px",
            }}
          >
            Želite li izbrisati člana porodice?
          </h4>
          <Button
            onClick={handleDeleteFamilyMember}
            size="lg"
            style={{ width: "100%", marginBottom: "15px" }}
            variant="danger"
          >
            Da
          </Button>
          <Button
            onClick={handleSureDeleteFamilyMember}
            size="lg"
            style={{ width: "100%" }}
            variant="primary"
          >
            Ne
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default FamilyMember;
