import { useContext, useEffect, useState } from "react";

import { FloatingLabel, Form, Button } from "react-bootstrap";

import logoIZ from "../../../Assets/Pictures/logoIZ.png";
import loadingSvg from "../../../Assets/Pictures/loadingSvg.svg";

import classes from "./LoginFormComponent.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Store/auth-context-api";

const LoginFormComponent = ({ onFormSubmit, loginStage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { temporaryDzemat, response } = useContext(AuthContext);

  useEffect(() => {
    if (!temporaryDzemat) {
      navigate("/login/dzemat");
    }
  }, [temporaryDzemat, navigate]);

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    onFormSubmit(username, password);
  };

  return (
    <div className={classes.loginContainer}>
      {loginStage !== "first" && (
        <div className={classes.loginContainerHeader}>
          <div>
            <img src={logoIZ} alt="Islamska zajednica u Bosni i Hercegovini" />
          </div>
          <div className={classes.loginContainerHeaderTitleContainer}>
            <div className={classes.loginContainerHeaderTitleBold}>
              Program za praćenje i upravljanje budžetom
            </div>
            <p>
              Medžlis Islamske zajednice {temporaryDzemat.medzlis.name}
              &nbsp;|&nbsp;
              <strong>Džemat {temporaryDzemat.name}</strong>
            </p>
          </div>
        </div>
      )}
      {loginStage === "first" && (
        <div className={classes.loginContainerHeaderFirstLoginStage}>
          <h4>
            Program za praćenje i<br /> upravljanje budžetom
          </h4>
        </div>
      )}
      <Form className={classes.formContainer} onSubmit={handleFormSubmit}>
        <FloatingLabel
          controlId="floatingUsername"
          label="Korisničko ime"
          className="mb-3"
        >
          <Form.Control
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            type="text"
            placeholder="Korisničko ime"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          className="mb-3"
          label="Lozinka"
        >
          <Form.Control
            size="md"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            type="password"
            placeholder="Lozinka"
          />
        </FloatingLabel>
        <Button className={classes.submitButton} variant="dark" type="submit">
          {!response.loading || response.loading === "done" ? (
            "PRIJAVA"
          ) : (
            <img
              width={30}
              height={30}
              src={loadingSvg}
              alt="loading svg element"
            />
          )}
        </Button>
        {response.loading === "done" && response.success === false && (
          <Button className={classes.errorButton} variant="danger" disabled>
            Pogrešni kredencijali
          </Button>
        )}
      </Form>
    </div>
  );
};

export default LoginFormComponent;
