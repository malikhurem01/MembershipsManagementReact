import React, { useContext, useState } from "react";

import styles from "./FormModal.module.css";
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";
import paymentService from "../../Services/paymentService";

import loadingSvg from "../../Assets/Pictures/loadingSvg.svg";
import creationFailed from "../../Assets/Pictures/creationFailed.svg";
import creationSuccess from "../../Assets/Pictures/creationSuccess.svg";
import ActiveSpreadsheetContext from "../../Store/active-spreadsheet-context";

const FormAddPayment = ({ handleShowAddPayment }) => {
  const [response, setResponse] = useState();
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [amount, setAmount] = useState("");
  const [dateOfPayment, setDateOfPayment] = useState("");

  let { handleFetchActiveSpreadsheet, activeSpreadsheet, selectedMember } =
    useContext(ActiveSpreadsheetContext);

  const handlePaymentSubmit = (ev) => {
    ev.preventDefault();
    setResponse({ message: "Pišem uplatu...", statusCode: null });
    setWaitingResponse(true);
    const data = {
      amount,
      dateOfPayment,
      spreadsheetId: activeSpreadsheet.id,
      memberId: selectedMember.member.Id,
    };
    const token = JSON.parse(localStorage.getItem("user_jwt"));
    paymentService
      .addPayment(token, data)
      .then((res) => {
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

  const handleClearSubmit = () => {
    setWaitingResponse(false);
    handleShowAddPayment();
    handleFetchActiveSpreadsheet();
  };

  return (
    <React.Fragment>
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
                  className={styles.responseButton}
                  onClick={handleClearSubmit}
                  variant="success"
                >
                  Nazad
                </Button>
              )}
          </div>
        </React.Fragment>
      )}
      {!waitingResponse && (
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
              Nova uplata
            </h4>
            <Form onSubmit={handlePaymentSubmit}>
              <h5>Podaci</h5>
              <Row className="g-2">
                <Col lg={6} md="auto" sm={8}>
                  <FloatingLabel
                    controlId="floatingAmount"
                    label="Iznos uplate"
                    className="mb-3"
                  >
                    <Form.Control
                      value={amount}
                      onChange={(ev) => setAmount(ev.target.value)}
                      type="number"
                      placeholder="Iznos"
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col lg={6} md="auto" sm={8}>
                  <FloatingLabel
                    controlId="floatingDateOfPayment"
                    label="Datum uplate"
                    className="mb-3"
                  >
                    <Form.Control
                      value={dateOfPayment}
                      onChange={(ev) => setDateOfPayment(ev.target.value)}
                      type="date"
                      placeholder="Datum uplate"
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Button
                type="submit"
                style={{ marginRight: "20px" }}
                variant="primary"
              >
                Spremi
              </Button>
              <Button onClick={handleShowAddPayment} variant="danger">
                Odustani
              </Button>
            </Form>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FormAddPayment;
