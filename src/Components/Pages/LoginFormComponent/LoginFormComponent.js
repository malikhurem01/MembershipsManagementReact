import { useContext, useState } from 'react';

import { FloatingLabel, Form, Button } from 'react-bootstrap';

import thriveSyncLogo from '../../../Assets/Pictures/thriveSyncLogo.png';
import loadingSvg from '../../../Assets/Pictures/loadingSvg.svg';

import classes from './LoginFormComponent.module.css';
import AuthContext from '../../../Store/auth-context-api';

const LoginFormComponent = ({ onFormSubmit }) => {
  const [username, setUsername] = useState('');
  const [institutionUserName, setInstitutionUserName] = useState('');
  const [password, setPassword] = useState('');

  const { response } = useContext(AuthContext);

  const handleFormSubmit = ev => {
    ev.preventDefault();
    onFormSubmit(username, institutionUserName, password);
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginContainerHeader}>
        <div>
          <img
            className={classes.logoImg}
            src={thriveSyncLogo}
            alt="Islamska zajednica u Bosni i Hercegovini"
          />
        </div>
      </div>
      <Form className={classes.formContainer} onSubmit={handleFormSubmit}>
        <FloatingLabel
          controlId="floatingUsername"
          label="Email (Nadležni)"
          className="mb-3"
        >
          <Form.Control
            value={username}
            onChange={ev => setUsername(ev.target.value)}
            type="text"
            placeholder="Email (Nadležni)"
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingDzematUserName"
          label="Korisničko ime"
          className="mb-3"
        >
          <Form.Control
            value={institutionUserName}
            onChange={ev => setInstitutionUserName(ev.target.value)}
            type="text"
            placeholder="Korisničko ime"
            required
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
            onChange={ev => setPassword(ev.target.value)}
            type="password"
            placeholder="Lozinka"
            required
          />
        </FloatingLabel>
        <Button className={classes.submitButton} variant="light" type="submit">
          {!response.loading || response.loading === 'done' ? (
            'PRIJAVA'
          ) : (
            <img
              width={30}
              height={30}
              src={loadingSvg}
              alt="loading svg element"
            />
          )}
        </Button>
        {response.loading === 'done' && response.success === false && (
          <Button className={classes.errorButton} variant="danger" disabled>
            Pogrešni kredencijali
          </Button>
        )}
      </Form>
    </div>
  );
};

export default LoginFormComponent;
