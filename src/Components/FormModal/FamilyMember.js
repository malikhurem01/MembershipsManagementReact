import React, { useCallback, useContext, useEffect, useState } from "react";
import classes from "./FormModal.module.css";

import { Row, Col, FloatingLabel, Form, Button, Table } from "react-bootstrap";
import memberService from "../../Services/memberService";
import ActiveSpreadsheetContext from "../../Store/active-spreadsheet-context";

const FamilyMember = ({ handleShowFamilyMemberForm, editMode }) => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyMemberName, setFamilyMemberName] = useState("");
  const [familyMemberLastName, setFamilyMemberLastName] = useState("");
  const [familyMemberDateOfBirth, setFamilyMemberDateOfBirth] = useState("");
  const [familyMemberStatus, setFamilyMemberStatus] = useState("");
  const [sureDeleteFamilyMember, setHandleSureDeleteFamilyMember] =
    useState(false);

  let { selectedMember } = useContext(ActiveSpreadsheetContext);

  const handleFetchFamilyMembers = useCallback(() => {
    if (editMode) {
      const token = JSON.parse(localStorage.getItem("user_jwt"));
      memberService
        .getFamilyMembers(token, selectedMember.member.Id)
        .then((res) => {
          setFamilyMembers(res.data.data["$values"]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedMember, editMode]);

  useEffect(() => {
    handleFetchFamilyMembers();
  }, [handleFetchFamilyMembers]);

  const handleSubmitForm = (ev) => {
    ev.preventDefault();
    const token = JSON.parse(localStorage.getItem("user_jwt"));
    memberService
      .addFamilyMember(token, {
        memberId: selectedMember.member.Id,
        firstName: familyMemberName,
        lastName: familyMemberLastName,
        dateOfBirth: familyMemberDateOfBirth,
        status: +familyMemberStatus,
      })
      .then((res) => {
        handleFetchFamilyMembers(selectedMember.member.Id);
      })
      .catch((err) => {
        console.log(err);
      });

    setFamilyMemberName("");
    setFamilyMemberLastName("");
    setFamilyMemberStatus("");
    setFamilyMemberDateOfBirth("");
  };
  const tableColumns = [
    "#",
    "Ime",
    "Prezime",
    "Datum rođenja",
    "Status",
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
                  <Form.Control
                    value={familyMemberName}
                    onChange={(ev) => setFamilyMemberName(ev.target.value)}
                    type="text"
                    placeholder="Ime"
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col lg={3} md="auto" sm={8}>
                <FloatingLabel
                  controlId="floatingMembershipFamilyLastName"
                  label="Prezime"
                >
                  <Form.Control
                    value={familyMemberLastName}
                    onChange={(ev) => setFamilyMemberLastName(ev.target.value)}
                    type="text"
                    placeholder="Prezime"
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col lg={3} md="auto" sm={8}>
                <FloatingLabel
                  controlId="floatingMembershipFamilyBirthDate"
                  label="Godina rođenja"
                >
                  <Form.Control
                    value={familyMemberDateOfBirth}
                    onChange={(ev) =>
                      setFamilyMemberDateOfBirth(ev.target.value)
                    }
                    type="date"
                    placeholder="Godina rođenja"
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col lg={3} md="auto" sm={8}>
                <FloatingLabel
                  controlId="floatingFamilyStatus"
                  label="Dijete/Partner"
                >
                  <Form.Select
                    value={familyMemberStatus}
                    onChange={(ev) => setFamilyMemberStatus(ev.target.value)}
                    aria-label="FamilyMemberStatus"
                    required
                  >
                    <option>Dijete/Partner</option>
                    <option value="0">Muž</option>
                    <option value="1">Žena</option>
                    <option value="2">Sin</option>
                    <option value="3">Kćerka</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <div style={{ marginTop: "20px", marginBottom: "5px" }}>
              <Table hover striped responsive>
                <thead>
                  <tr>
                    {tableColumns.map((el, index) => (
                      <th key={index}>{el}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {familyMembers.map((el, index) => {
                    return (
                      <tr>
                        <td>{index}</td>
                        <td>{el.firstName}</td>
                        <td>{el.lastName}</td>
                        <td style={{ minWidth: "130px" }}>
                          {el.dateOfBirth.split("T")[0]}
                        </td>
                        <td>
                          {el.status === 0
                            ? "Muž"
                            : el.status === 1
                            ? "Žena"
                            : el.status === 2
                            ? "Sin"
                            : "Kćerka"}
                        </td>
                        <td>
                          <Button
                            name={editMode ? el.id : index}
                            size="sm"
                            variant="danger"
                          >
                            Izbriši
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
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
            size="md"
            style={{ width: "100%", marginBottom: "15px" }}
            variant="danger"
          >
            Da
          </Button>
          <Button size="md" style={{ width: "100%" }} variant="primary">
            Ne
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default FamilyMember;
