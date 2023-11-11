import React, { useCallback, useEffect, useState } from "react";
import PageWrapperComponent from "../../PageWrapper/PageWrapperComponent";
import classes from "./ActiveSpreadsheetPage.module.css";
import styles from "../../FormModal/FormModal.module.css";
import noSpreadsheetLogo from "../../../Assets/Pictures/creationFailed.svg";
import loadingSvg from "../../../Assets/Pictures/loadingSvg.svg";
import creationFailed from "../../../Assets/Pictures/creationFailed.svg";
import creationSuccess from "../../../Assets/Pictures/creationSuccess.svg";

import {
  Table,
  Button,
  Form,
  Container,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import FormAddMember from "../../FormModal/FormAddMember";
import memberService from "../../../Services/memberService";
import spreadsheetService from "../../../Services/spreadsheetService";
import { useNavigate } from "react-router-dom";
import FormAddPayment from "../../FormModal/FormAddPayment";

const ActiveSpreadsheetPage = () => {
  const [activeSpreadsheet, setActiveSpreadsheet] = useState();
  const [membersInfo, setMembersInfo] = useState([]);
  const [searchName, setSearchName] = useState();
  const [searchLastName, setSearchLastName] = useState();
  const [showAddMember, setShowAddMember] = useState(false);
  const [response, setResponse] = useState();
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [sureArchiveSpreadsheet, setSureArchiveSpreadsheet] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showViewMember, setShowViewMember] = useState(false);
  const [memberToView, setMemberToView] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const navigate = useNavigate();

  const tableColumns = [
    "#",
    "Ev. broj",
    "Ime",
    "Prezime",
    "Ime oca",
    "Status",
    "Članarina",
    "Uplaćeno",
    "Dug",
    "Posljednja uplata",
    "Postavke",
  ];

  const handleFetchActiveSpreadsheet = useCallback(() => {
    const token = JSON.parse(localStorage.getItem("user_jwt"));
    spreadsheetService
      .getActiveSpreadsheet(token)
      .then((res) => {
        const responseParsed = JSON.parse(res.data.data);
        console.log(responseParsed);
        setActiveSpreadsheet(responseParsed.spreadsheet);
        setMembersInfo(responseParsed.rawMembersInfo);
      })
      .catch((err) => {
        setActiveSpreadsheet(null);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    handleFetchActiveSpreadsheet();
  }, [handleFetchActiveSpreadsheet]);

  const handleAddMemberClick = () => {
    setShowAddMember((prevState) => !prevState);
  };

  const handleFormSubmit = (token, data) => {
    setResponse({ message: "Kreiram...", statusCode: null });
    setWaitingResponse(true);
    memberService
      .addMember(token, data)
      .then((res) => {
        handleFetchActiveSpreadsheet();
        setResponse({
          message: res.data.message,
          statusCode: res.status,
        });
      })
      .catch((err) => {
        setResponse({
          message: err.response.data.message,
          statusCode: err.response.data.statusCode,
        });
      });
  };

  const clearSubmit = () => {
    setResponse();
    setWaitingResponse(false);
  };

  const handleGoToMembershipsPage = () => {
    clearSubmit();
    navigate("/clanarine");
  };

  const handleSetArchiveSpreadsheet = () => {
    setSureArchiveSpreadsheet((prevState) => !prevState);
  };

  const handleArchiveSpreadsheet = () => {
    handleSetArchiveSpreadsheet();
    const token = JSON.parse(localStorage.getItem("user_jwt"));
    const dzematId = JSON.parse(localStorage.getItem("dzemat_id"));
    setResponse({ message: "Arhiviram...", statusCode: null });
    setWaitingResponse(true);
    spreadsheetService
      .archiveSpreadsheet(token, {
        dzematId,
        spreadsheetId: activeSpreadsheet.id,
      })
      .then((res) => {
        setTimeout(() => {
          setResponse({
            message: res.data.message,
            statusCode: res.status,
          });
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
        setResponse({
          message: err.response.data.message,
          statusCode: err.response.data.statusCode,
        });
      });
  };

  const handleNavigateToCreateSpreadsheet = () => {
    navigate("/clanarine/kreiraj-bazu");
  };

  const handleNavigateToMembershipsPage = () => {
    navigate("/clanarine");
  };

  const handleShowAddPayment = (ev, id) => {
    if (!showAddPayment) {
      setSelectedMember(id);
      console.log(id);
    }
    setShowAddPayment((prevState) => !prevState);
  };

  const handleSetViewMember = (ev) => {
    setMemberToView(() => {
      const memberToView = membersInfo.filter(
        (mi) => mi.member.Id === +ev.target.name
      );
      return memberToView[0];
    });
    setShowViewMember((prevState) => !prevState);
  };

  return (
    <PageWrapperComponent>
      {showViewMember && (
        <FormAddMember
          viewMode={true}
          memberInfo={memberToView}
          handleAddMemberClick={handleSetViewMember}
          waitingResponse={waitingResponse}
        />
      )}
      {!waitingResponse && showAddPayment && (
        <FormAddPayment
          memberId={selectedMember}
          activeSpreadsheet={activeSpreadsheet}
          handleShowAddPayment={handleShowAddPayment}
          handleFetchActiveSpreadsheet={handleFetchActiveSpreadsheet}
        />
      )}
      {waitingResponse && (
        <React.Fragment>
          <div className={styles.backdrop}></div>
          <div className={styles.responseModalAbsolute}>
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
                className={styles.responseButton}
                onClick={clearSubmit}
                variant="danger"
              >
                Poništi
              </Button>
            )}
            {waitingResponse &&
              response?.statusCode >= 200 &&
              response?.statusCode < 300 && (
                <Button
                  className={styles.responseButton}
                  onClick={handleGoToMembershipsPage}
                  variant="success"
                >
                  Nazad
                </Button>
              )}
          </div>
        </React.Fragment>
      )}

      {sureArchiveSpreadsheet && !waitingResponse && (
        <React.Fragment>
          <div className={styles.backdrop}></div>

          <div className={styles.modal}>
            <h4
              style={{
                borderBottom: "1px solid #cecece",
                marginBottom: "15px",
                paddingBottom: "5px",
              }}
            >
              Želite li arhivirati bazu za {activeSpreadsheet.year}. godinu?
            </h4>
            <Button
              onClick={handleArchiveSpreadsheet}
              size="lg"
              style={{ width: "100%", marginBottom: "15px" }}
              variant="danger"
            >
              Arhiviraj
            </Button>
            <Button
              onClick={handleSetArchiveSpreadsheet}
              size="lg"
              style={{ width: "100%" }}
              variant="primary"
            >
              Odustani
            </Button>
          </div>
        </React.Fragment>
      )}
      {showAddMember && (
        <FormAddMember
          handleFormSubmit={handleFormSubmit}
          handleAddMemberClick={handleAddMemberClick}
          response={response}
          waitingResponse={waitingResponse}
          clearSubmit={clearSubmit}
        />
      )}
      {activeSpreadsheet === null && !waitingResponse && (
        <div className={styles.responseModalAbsolute}>
          <img src={noSpreadsheetLogo} alt="ne postoji aktivna baza" />
          <p>Aktivna baza ne postoji. Molimo kreirajte bazu.</p>
          <Button
            onClick={handleNavigateToCreateSpreadsheet}
            className={styles.responseButton}
            style={{ marginTop: "10px", marginBottom: "6px" }}
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
      {activeSpreadsheet && !waitingResponse && (
        <div className={classes.mainContainer}>
          <Container fluid="md">
            <Row>
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
                  onClick={handleSetArchiveSpreadsheet}
                  size="md"
                  variant="danger"
                >
                  Arhiviraj bazu
                </Button>
              </Col>
            </Row>
            <Row className={classes.inputs}>
              <Col lg="auto" md="auto" sm="auto">
                <FloatingLabel controlId="floatingName" label="Ime">
                  <Form.Control
                    value={searchName}
                    onChange={(ev) => setSearchName(ev.target.value)}
                    type="text"
                    placeholder="Ime člana"
                  />
                </FloatingLabel>
              </Col>
              <Col lg="auto" md={4} sm="auto">
                <FloatingLabel controlId="floatingLastName" label="Prezime">
                  <Form.Control
                    value={searchLastName}
                    onChange={(ev) => setSearchLastName(ev.target.value)}
                    type="text"
                    placeholder="Prezime"
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Table hover striped responsive>
              <thead>
                <tr>
                  {tableColumns.map((val) => (
                    <th>{val}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {membersInfo.map((m, index) => {
                  return (
                    <tr>
                      {" "}
                      <td>{index}</td>
                      <td>
                        <Button
                          style={{ width: "80%" }}
                          variant="dark"
                          disabled
                          size="sm"
                        >
                          <strong> {m.member.EvNumber}</strong>
                        </Button>
                      </td>
                      <td>
                        <Button
                          style={{ width: "80%" }}
                          variant="outline-dark"
                          disabled
                          size="sm"
                        >
                          <strong> {m.member.FirstName}</strong>
                        </Button>
                      </td>
                      <td>
                        <Button
                          style={{ width: "80%" }}
                          variant="outline-dark"
                          disabled
                          size="sm"
                        >
                          <strong> {m.member.LastName}</strong>
                        </Button>
                      </td>
                      <td>
                        <Button
                          style={{ width: "80%" }}
                          variant="outline-dark"
                          disabled
                          size="sm"
                        >
                          <strong> {m.member.FathersName}</strong>
                        </Button>
                      </td>
                      <td>
                        <Button
                          style={{ width: "80%" }}
                          variant="outline-dark"
                          disabled
                          size="sm"
                        >
                          <strong>
                            {m.member.Status === 0
                              ? "Brak"
                              : m.member.Status === 1
                              ? "Udovac/Udovica"
                              : m.member.Status === 2
                              ? "Granična dob"
                              : ""}
                          </strong>
                        </Button>
                      </td>
                      <td>
                        {" "}
                        <Button
                          style={{ width: "80%" }}
                          variant="primary"
                          disabled
                          size="sm"
                        >
                          <strong>{m.membershipFee}KM</strong>
                        </Button>
                      </td>
                      <td>
                        {m.membershipFee === m.totalAmountPayed ? (
                          <Button
                            style={{ width: "80%" }}
                            variant="success"
                            disabled
                            size="sm"
                          >
                            <strong>Da</strong>
                          </Button>
                        ) : m.totalAmountPayed > m.membershipFee ? (
                          <Button
                            style={{ width: "80%" }}
                            size="sm"
                            variant="warning"
                            disabled
                          >
                            <strong>{m.totalAmountPayed}KM</strong>
                          </Button>
                        ) : (
                          <Button
                            style={{ width: "80%" }}
                            onClick={(ev) => {
                              handleShowAddPayment(ev, m.member.Id);
                            }}
                            size="sm"
                            variant="warning"
                          >
                            <strong>{m.totalAmountPayed}KM | Uplati</strong>
                          </Button>
                        )}
                      </td>
                      <td>Napraviti</td>
                      <td>
                        <Button
                          style={{ width: "80%" }}
                          variant="success"
                          disabled
                          size="sm"
                        >
                          <strong>
                            {m.latestPayment
                              ? m.latestPayment.DateOfPayment.split("T")[0]
                              : "Nema uplata"}
                          </strong>
                        </Button>
                      </td>
                      <td>
                        <Button
                          name={m.member.Id}
                          onClick={handleSetViewMember}
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
          </Container>
        </div>
      )}
    </PageWrapperComponent>
  );
};

export default ActiveSpreadsheetPage;
