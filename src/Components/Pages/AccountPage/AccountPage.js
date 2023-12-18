import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';

import classes from './AccountPage.module.css';
import { useContext, useState } from 'react';
import AuthContext from '../../../Store/auth-context-api';
import loadingSvg from '../../../Assets/Pictures/loadingSvg.svg';

import userService from '../../../Services/userService';

const AccountPage = () => {
  const { userDataState, handleSetUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState(userDataState.firstName);
  const [fathersName, setFathersName] = useState(userDataState.fathersName);
  const [lastName, setLastName] = useState(userDataState.lastName);
  const [placeOfResidence, setPlaceOfResidence] = useState(
    userDataState.placeOfResidence
  );
  const [address, setAddress] = useState(userDataState.address);
  const [zipCode, setZipCode] = useState(userDataState.zipCode);
  const [email, setEmail] = useState(userDataState.email);
  const [userName, setUserName] = useState(userDataState.userName);
  const [phoneNumber, setPhoneNumber] = useState(userDataState.phoneNumber);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isUpdating, setIsUpdating] = useState();
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleFormSubmit = ev => {
    ev.preventDefault();
    setIsUpdating(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    const data = {
      id: userDataState.id,
      firstName,
      lastName,
      fathersName,
      placeOfResidence,
      address,
      zipCode,
      email,
      userName,
      phoneNumber
    };
    userService
      .modifyUser(token, data)
      .then(() => {
        userService
          .currentUser(token)
          .then(res => {
            handleSetUser(res.data.data);
            setIsUpdating(false);
          })
          .catch(() => {
            window.location.replace('/login/korisnik');
          });
      })
      .catch(err => {
        setIsUpdating(false);
        console.log(err);
      });
  };

  const handleChangePasswordSubmit = ev => {
    ev.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords must match!');
      return;
    }
    setIsPasswordUpdating(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    const data = {
      id: userDataState.id,
      oldPassword,
      newPassword,
      confirmPassword
    };
    userService
      .changeUserPassword(token, data)
      .then(() => {
        setIsPasswordUpdating(false);
        setPasswordError();
        setOldPassword();
        setNewPassword();
        setConfirmPassword();
      })
      .catch(err => {
        setIsPasswordUpdating(false);
        setPasswordError(err.response.data.message);
      });
  };

  return (
    <PageWrapperComponent>
      <div className={classes.container}>
        <Container>
          <div className={classes.heading}>
            <h2>Vaš korisnički račun</h2>
          </div>
          <Form onSubmit={handleFormSubmit}>
            <div className={classes.section}>
              <h4>Lični podaci</h4>
              <Row>
                <Col xl={4} md={5} xs={10}>
                  <Form.Group controlId="Name">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control
                      value={firstName}
                      onChange={ev => setFirstName(ev.target.value)}
                      type="text"
                      placeholder="John"
                    />
                  </Form.Group>
                </Col>
                <Col xl={4} md={5} xs={10}>
                  <Form.Group controlId="FathersName">
                    <Form.Label>Ime oca</Form.Label>
                    <Form.Control
                      value={fathersName}
                      onChange={ev => setFathersName(ev.target.value)}
                      type="text"
                      placeholder="Steven"
                    />
                  </Form.Group>
                </Col>
                <Col xl={4} md={5} xs={10}>
                  <Form.Group controlId="LastName">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control
                      value={lastName}
                      onChange={ev => setLastName(ev.target.value)}
                      type="text"
                      placeholder="Doe"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <div className={classes.section}>
              <h4>Podaci prebivališta</h4>
              <Row>
                <Col xl={4} md={5} xs={10}>
                  <Form.Group controlId="PlaceOfResidence">
                    <Form.Label>Prebivalište</Form.Label>
                    <Form.Control
                      value={placeOfResidence}
                      onChange={ev => setPlaceOfResidence(ev.target.value)}
                      type="text"
                      placeholder="Sarajevo"
                    />
                  </Form.Group>
                </Col>
                <Col xl={4} md={5} xs={10}>
                  <Form.Group controlId="Address">
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control
                      value={address}
                      onChange={ev => setAddress(ev.target.value)}
                      type="text"
                      placeholder="Vratnik bb"
                    />
                  </Form.Group>
                </Col>
                <Col xl={4} md={5} xs={10}>
                  <Form.Group controlId="ZipCode">
                    <Form.Label>Broj pošte</Form.Label>
                    <Form.Control
                      value={zipCode}
                      onChange={ev => setZipCode(ev.target.value)}
                      type="number"
                      placeholder="10250"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <div className={classes.section}>
              <h4>Kontakt podaci</h4>
              <Row>
                <Col xl={4} md={5} xs={10}>
                  <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={email}
                      onChange={ev => setEmail(ev.target.value)}
                      type="email"
                      placeholder="johndoe@gmail.com"
                    />
                  </Form.Group>
                </Col>
                <Col xl={4} md={5} xs={10}>
                  <Form.Group controlId="Username">
                    <Form.Label>Korisničko ime</Form.Label>
                    <Form.Control
                      value={userName}
                      onChange={ev => setUserName(ev.target.value)}
                      type="text"
                      placeholder="johndoe"
                    />
                  </Form.Group>
                </Col>
                <Col xl={4} md={5} xs={10}>
                  <Form.Group controlId="PhoneNumber">
                    <Form.Label>Broj telefona</Form.Label>
                    <Form.Control
                      value={phoneNumber}
                      onChange={ev => setPhoneNumber(ev.target.value)}
                      type="string"
                      placeholder="+387 62 222 443"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <div className={classes.button}>
              <Button size="sm" variant="dark" type="submit">
                {!isUpdating ? (
                  'Ažuriraj podatke'
                ) : (
                  <img
                    width={15}
                    height={15}
                    src={loadingSvg}
                    alt="loading svg element"
                  />
                )}
              </Button>
            </div>
          </Form>

          <div className={classes.section}>
            <h4>Promjena lozinke</h4>
            <Form onSubmit={handleChangePasswordSubmit}>
              <Row>
                <Col xl={4} md={5} xs={10}>
                  <Form.Group controlId="Trenutna lozinka">
                    <Form.Label>Trenutna lozinka</Form.Label>
                    <Form.Control
                      value={oldPassword}
                      onChange={ev => setOldPassword(ev.target.value)}
                      type="password"
                      placeholder="********"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xl={4} md={5} xs={10}>
                  <Form.Group controlId="Nova lozinka">
                    <Form.Label>Nova lozinka</Form.Label>
                    <Form.Control
                      value={newPassword}
                      onChange={ev => setNewPassword(ev.target.value)}
                      type="password"
                      placeholder="********"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xl={4} md={5} xs={10}>
                  <Form.Group controlId="Potvrdite novu lozinku">
                    <Form.Label>Potvrdite novu lozinku</Form.Label>
                    <Form.Control
                      value={confirmPassword}
                      onChange={ev => setConfirmPassword(ev.target.value)}
                      type="password"
                      placeholder="********"
                      required
                    />
                  </Form.Group>
                </Col>
                <div className={classes.button}>
                  <Button
                    size="sm"
                    variant="dark"
                    type="submit"
                    style={{ marginTop: '20px', marginRight: '15px' }}
                    disabled={
                      (!newPassword && !confirmPassword) ||
                      newPassword !== confirmPassword
                    }
                  >
                    {!isPasswordUpdating ? (
                      'Promijeni'
                    ) : (
                      <img
                        width={15}
                        height={15}
                        src={loadingSvg}
                        alt="loading svg element"
                      />
                    )}
                  </Button>
                  {passwordError && !isPasswordUpdating && (
                    <Button
                      size="sm"
                      variant="danger"
                      style={{ marginTop: '20px' }}
                    >
                      {passwordError}
                    </Button>
                  )}
                </div>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
    </PageWrapperComponent>
  );
};

export default AccountPage;
