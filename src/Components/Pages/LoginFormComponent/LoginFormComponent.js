import { useState } from "react";

import { FloatingLabel, Form, Button } from "react-bootstrap";

import logoIZ from "../../../Assets/Pictures/logoIZ.png";

import classes from "./LoginFormComponent.module.css";

const LoginFormComponent = ({ onFormSubmit, errorOccured, loginStage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
            <div>
              <p className={classes.loginContainerHeaderTitleBold}>
                Program za praćenje i upravljanje budžetom
              </p>
            </div>
            <div>
              <p className={classes.loginContainerHeaderTitle}>
                Medžlis Islamske zajednice Gračanica
              </p>
            </div>

            <p className={classes.loginContainerHeaderTitle}>Džemat Golaći</p>
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
            size="sm"
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
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            type="password"
            placeholder="Lozinka"
          />
        </FloatingLabel>
        <Button className={classes.submitButton} variant="dark" type="submit">
          PRIJAVA
        </Button>
        {errorOccured && (
          <Button className={classes.errorButton} variant="danger" disabled>
            Pogrešni kredencijali
          </Button>
        )}
      </Form>
    </div>
  );
};

export default LoginFormComponent;
