import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { FloatingLabel, Form, Button } from "react-bootstrap";

import loadingSvg from "../../Assets/Pictures/loadingSvg.svg";
import creationFailed from "../../Assets/Pictures/creationFailed.svg";
import creationSuccess from "../../Assets/Pictures/creationSuccess.svg";

import classes from "./FormModal.module.css";

const FormCreateSpreadsheet = ({
  handleCreateDatabase,
  response,
  waitingResponse,
  clearSubmit,
}) => {
  const [year, setYear] = useState(new Date().getFullYear());

  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const data = {
      year,
      dzematId: JSON.parse(localStorage.getItem("dzemat_id")),
      archived: false,
    };
    const token = JSON.parse(localStorage.getItem("user_jwt"));
    handleCreateDatabase(token, data);
  };

  const handleNavigateBack = () => {
    navigate("/clanarine");
  };

  const handleClearSubmit = () => {
    clearSubmit();
  };

  return (
    <React.Fragment>
      <div className={`${classes.modal} ${classes.shrunk}`}>
        <Form onSubmit={handleSubmit}>
          <div className={classes.formHeading}>
            <h4>Kreiraj bazu</h4>
          </div>
          <div className={classes.formInputFlexbox}>
            <div className={classes.title}>
              <h5>Baza podataka za: </h5>
            </div>
            <div className={classes.input}>
              <FloatingLabel
                controlId="floatingYear"
                label="Godina: "
                className="mb-3"
              >
                <Form.Control
                  value={year}
                  onChange={(ev) => setYear(ev.target.value)}
                  type="number"
                  placeholder="Godina:"
                  disabled={waitingResponse}
                />
              </FloatingLabel>
            </div>
          </div>
          {waitingResponse && (
            <div className={classes.responseModal}>
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
            </div>
          )}
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
          {!waitingResponse && (
            <React.Fragment>
              <Button
                style={{ marginRight: "20px" }}
                type="submit"
                variant="primary"
              >
                Kreiraj
              </Button>
              <Button variant="danger" onClick={handleNavigateBack}>
                Odustani
              </Button>
            </React.Fragment>
          )}
        </Form>
      </div>
    </React.Fragment>
  );
};

export default FormCreateSpreadsheet;
