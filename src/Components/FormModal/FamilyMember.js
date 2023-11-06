import classes from "./FormModal.module.css";

import { Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";

const FamilyMember = ({ handleShowFamilyMemberForm }) => {
  return (
    <div className={classes.modal}>
      <h4
        style={{
          borderBottom: "1px solid #cecece",
          marginBottom: "15px",
          paddingBottom: "5px",
        }}
      >
        Član porodice
      </h4>

      <Row className="g-2">
        <h4>Osnovni podaci</h4>

        <Col lg={3} md="auto" sm={8}>
          <FloatingLabel controlId="floatingMembershipFamilyName" label="Ime">
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
      <Button style={{ marginRight: "20px" }} variant="primary">
        Spremi
      </Button>
      <Button onClick={handleShowFamilyMemberForm} variant="danger">
        Nazad
      </Button>
    </div>
  );
};

export default FamilyMember;
