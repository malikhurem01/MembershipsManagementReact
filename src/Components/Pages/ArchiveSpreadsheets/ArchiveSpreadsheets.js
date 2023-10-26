import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

import spreadsheetService from "../../../Services/spreadsheetService";

import PageWrapperComponent from "../../PageWrapper/PageWrapperComponent";

import classes from "./ArchiveSpreadsheet.module.css";

const ArchiveSpreadsheets = () => {
  const [spreadsheets, setSpreadsheets] = useState([]);
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("Arhiviraj");

  const navigate = useNavigate();

  const dzematId = JSON.parse(localStorage.getItem("dzemat_id"));
  const token = JSON.parse(localStorage.getItem("user_jwt"));

  const handleFetchSpreadsheets = useCallback(() => {
    spreadsheetService
      .getAllSpreadsheets(token, dzematId)
      .then((res) => {
        console.log(res);
        setSpreadsheets(res.data.data["$values"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, dzematId]);

  useEffect(() => {
    handleFetchSpreadsheets();
  }, [handleFetchSpreadsheets]);

  const handleArchiveSpreadsheet = (ev) => {
    setWaitingResponse(true);
    setMessage("Arhiviram...");
    spreadsheetService
      .archiveSpreadsheet(token, { dzematId, spreadsheetId: ev.target.name })
      .then(() => {
        setMessage("Arhivirano...");
        setTimeout(() => {
          setWaitingResponse(false);
          handleFetchSpreadsheets();
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Greška...");
        setError(true);
        setTimeout(() => {
          setMessage("Arhiviraj");
          setWaitingResponse(false);
          setError(false);
        }, 5000);
      });
  };

  const handleNavigateToMain = () => {
    navigate("/clanarine");
  };
  return (
    <PageWrapperComponent>
      <div className={classes.modal}>
        <h5>Lista baza</h5>
        <ul className={classes.spreadsheetList}>
          {spreadsheets.map((s, i) => {
            return (
              <li key={i}>
                <p>
                  {s.year}. god {s.archived && <strong> | Arhiva</strong>}{" "}
                  {!s.archived && <strong> | Aktivna</strong>}
                </p>
                {s.archived && (
                  <Button name={s.id} variant="success">
                    Pregled
                  </Button>
                )}
                {!s.archived && (
                  <Button
                    onClick={handleArchiveSpreadsheet}
                    name={s.id}
                    variant={
                      waitingResponse && !error
                        ? "secondary"
                        : waitingResponse && error
                        ? "danger"
                        : "primary"
                    }
                  >
                    {message}
                  </Button>
                )}
              </li>
            );
          })}
        </ul>{" "}
        <Button
          onClick={handleNavigateToMain}
          style={{ margin: "15px 0", width: "100%" }}
          variant="danger"
        >
          Nazad
        </Button>
      </div>
    </PageWrapperComponent>
  );
};

export default ArchiveSpreadsheets;
