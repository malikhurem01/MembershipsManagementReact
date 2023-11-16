import React, { useCallback, useContext, useEffect, useState } from "react";
import classes from "./FormModal.module.css";

import { Row, Col, FloatingLabel, Form, Button, Table } from "react-bootstrap";
import memberService from "../../Services/memberService";
import ActiveSpreadsheetContext from "../../Store/active-spreadsheet-context";

const FamilyMember = ({
  handleDeleteFamilyMemberFromState,
  handleAddFamilyMemberToState,
  handleShowFamilyMemberForm,
  handleSetDeleteFamilyMember,
  sureDeleteFamilyMember,
  memberToAddFamilyMembers,
  editMode,
}) => {
  let {
    handleUpdateActiveSpreadsheet,
    handleSetResponse,
    response,
    selectedMember,
  } = useContext(ActiveSpreadsheetContext);
  const [familyMembers, setFamilyMembers] = useState(
    editMode ? selectedMember.FamilyMembers : memberToAddFamilyMembers
  );
  const [familyMemberName, setFamilyMemberName] = useState("");
  const [familyMemberLastName, setFamilyMemberLastName] = useState("");
  const [familyMemberDateOfBirth, setFamilyMemberDateOfBirth] = useState("");
  const [familyMemberStatus, setFamilyMemberStatus] = useState("");
  const [selectedFamilyMember, setSelectedFamilyMember] = useState();

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
    if (editMode) {
      handleSetResponse({
        message: "Uređujem informacije...",
        statusCode: null,
        loading: true,
      });
      memberService
        .addFamilyMember(token, {
          memberId: selectedMember.member.Id,
          firstName: familyMemberName,
          lastName: familyMemberLastName,
          dateOfBirth: familyMemberDateOfBirth,
          status: +familyMemberStatus,
        })
        .then((res) => {
          handleUpdateActiveSpreadsheet();
          handleFetchFamilyMembers(selectedMember.member.Id);
          handleSetResponse({
            message: res.data.message,
            statusCode: res.status,
            loading: true,
            action: "family_member",
          });
          setTimeout(() => {
            handleSetResponse({
              statusCode: null,
            });
          }, 3000);
        })
        .catch((err) => {
          handleSetResponse({
            message: err.response.data.message,
            statusCode: err.response.data.statusCode,
            loading: true,
            action: "family_member",
          });
        });
      setFamilyMemberName("");
      setFamilyMemberLastName("");
      setFamilyMemberStatus("");
      setFamilyMemberDateOfBirth("");
    } else {
      //LOGIC TO ADD TO ARRAY WHEN ADDING NEW MEMBER
      const familyMemberToAdd = {
        firstName: familyMemberName,
        lastName: familyMemberLastName,
        dateOfBirth: familyMemberDateOfBirth,
        status: +familyMemberStatus,
      };
      handleAddFamilyMemberToState(familyMemberToAdd);
      setFamilyMembers((prevState) => [...prevState, familyMemberToAdd]);
    }
  };

  const handleDeleteFamilyMember = () => {
    handleSetDeleteFamilyMember();

    if (editMode) {
      const token = JSON.parse(localStorage.getItem("user_jwt"));
      handleSetResponse({
        message: "Uklanjam člana porodice...",
        statusCode: null,
        loading: true,
      });
      memberService
        .deleteFamilyMember(token, {
          id: selectedFamilyMember.id,
          memberId: selectedFamilyMember.memberId,
        })
        .then((res) => {
          handleUpdateActiveSpreadsheet();
          handleFetchFamilyMembers(selectedMember.member.Id);
          handleSetResponse({
            message: res.data.message,
            statusCode: res.status,
            loading: true,
            action: "family_member",
          });
          setTimeout(() => {
            handleSetResponse({
              statusCode: null,
            });
          }, 3000);
        })
        .catch((err) => {
          handleSetResponse({
            message: err.response.data.message,
            statusCode: err.response.data.statusCode,
            loading: true,
            action: "family_member",
          });
        });
    } else {
      //LOGIC TO REMOVE FROM ADD NEW MEMBER ARRAY
      handleDeleteFamilyMemberFromState(selectedFamilyMember);
      setFamilyMembers((prevState) => {
        const updatedState = prevState.filter(
          (fm) => fm.firstName !== selectedFamilyMember.firstName
        );
        console.log(updatedState);
        return updatedState;
      });
    }
  };

  const handleSetSelectedFamilyMember = (data) => {
    if (!sureDeleteFamilyMember) {
      setSelectedFamilyMember(data);
    }
    handleSetDeleteFamilyMember();
  };

  const tableColumns = [
    "#",
    "Ime",
    "Prezime",
    "Datum rođenja",
    "Status",
    "Postavke",
  ];

  return (
    <React.Fragment>
      {!sureDeleteFamilyMember && !response.loading && (
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
                    defaultValue={1}
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
                  {familyMembers?.map((el, index) => {
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
                            onClick={() => handleSetSelectedFamilyMember(el)}
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
      {sureDeleteFamilyMember && !response.loading && (
        <div className={classes.modal}>
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
          <Button
            onClick={handleSetDeleteFamilyMember}
            size="md"
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
