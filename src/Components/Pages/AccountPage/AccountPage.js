import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';

import classes from './AccountPage.module.css';
import { useContext, useState } from 'react';
import AuthContext from '../../../Store/auth-context-api';
import loadingSvg from '../../../Assets/Pictures/loadingSvg.svg';
import editIcon from '../../../Assets/Pictures/editIcon.png';

import profilePicture from '../../../Assets/Pictures/profilePicture.png';

import userService from '../../../Services/userService';
import { Link } from 'react-router-dom';

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
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
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
            setIsEditing(false);
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
        setIsEditingPassword(false);
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
        <section style={{ backgroundColor: '#eee' }}>
          <div className="container">
            <div style={{ marginTop: '-30px' }} className="row">
              <div className="col">
                <nav
                  aria-label="breadcrumb"
                  className="bg-light rounded-3 p-3 mb-4"
                >
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/naslovna">Naslovna stranica</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href={`/racun/${userDataState.id}`}>Moj račun</Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      src={profilePicture}
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: 150 }}
                    />
                    <h5 className="my-3">{`${userDataState.firstName} (${userDataState.fathersName}) ${userDataState.lastName}`}</h5>
                    <p className="text-muted mb-1">
                      Nadležnost:{' '}
                      <strong>
                        {userDataState.position === 1
                          ? 'Imam'
                          : userDataState.position === 2
                          ? 'Blagajnik'
                          : userDataState.position === 3
                          ? 'Mutevelija'
                          : ''}
                      </strong>
                    </p>
                    <p className="text-muted mb-4">
                      {userDataState.address}, {userDataState.zipCode}
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <Button
                        style={{ marginRight: '15px' }}
                        size="sm"
                        type="button"
                        variant="primary"
                      >
                        Uredi sliku profila
                      </Button>
                      <Button size="sm" type="button" variant="warning">
                        Lista nadležnih
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="card mb-4 mb-lg-0">
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush rounded-3">
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">Medžlis</p>
                        <p className="mb-0">
                          {userDataState.dzemat.medzlis.name}
                        </p>{' '}
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">Džemat</p>
                        <p className="mb-0">{userDataState.dzemat.name}</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">Adresa (Džemat)</p>
                        <p className="mb-0">
                          {userDataState.dzemat.address}
                        </p>{' '}
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">Lokacija (Džemat)</p>
                        <p className="mb-0">
                          {userDataState.dzemat.location}
                        </p>{' '}
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">Broj pošte (Džemat)</p>
                        <p className="mb-0">
                          {userDataState.dzemat.zipCode}
                        </p>{' '}
                      </li>
                    </ul>
                  </div>
                </div>
                <p style={{ marginLeft: '5px', fontStyle: 'italic' }}>
                  {' '}
                  *Za sve promjene informacija vezanih za džemat, molimo
                  kontaktirajte podršku
                </p>{' '}
              </div>

              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Ime</p>
                      </div>
                      <div className="col-sm-8">
                        {!isEditing && (
                          <p className="text-muted mb-0">
                            {userDataState.firstName}
                          </p>
                        )}
                        {isEditing && (
                          <Form.Control
                            value={firstName}
                            onChange={ev => setFirstName(ev.target.value)}
                            type="text"
                            placeholder="John"
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Prezime</p>
                      </div>
                      <div className="col-sm-8">
                        {!isEditing && (
                          <p className="text-muted mb-0">
                            {userDataState.lastName}
                          </p>
                        )}
                        {isEditing && (
                          <Form.Control
                            value={lastName}
                            onChange={ev => setLastName(ev.target.value)}
                            type="text"
                            placeholder="Doe"
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Ime oca</p>
                      </div>
                      <div className="col-sm-8">
                        {!isEditing && (
                          <p className="text-muted mb-0">
                            {userDataState.fathersName}
                          </p>
                        )}
                        {isEditing && (
                          <Form.Control
                            value={fathersName}
                            onChange={ev => setFathersName(ev.target.value)}
                            type="text"
                            placeholder="Martin"
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-8">
                        {!isEditing && (
                          <p className="text-muted mb-0">
                            {userDataState.email}
                          </p>
                        )}
                        {isEditing && (
                          <Form.Control
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                            type="email"
                            placeholder="john@gmail.com"
                            size="sm"
                          />
                        )}{' '}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Korisničko ime</p>
                      </div>
                      <div className="col-sm-8">
                        {!isEditing && (
                          <p className="text-muted mb-0">
                            {userDataState.userName}
                          </p>
                        )}
                        {isEditing && (
                          <Form.Control
                            value={userName}
                            onChange={ev => setUserName(ev.target.value)}
                            type="text"
                            placeholder="johndoe123"
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Broj telefona</p>
                      </div>
                      <div className="col-sm-8">
                        {!isEditing && (
                          <p className="text-muted mb-0">
                            {userDataState.phoneNumber}
                          </p>
                        )}
                        {isEditing && (
                          <Form.Control
                            value={phoneNumber}
                            onChange={ev => setPhoneNumber(ev.target.value)}
                            type="text"
                            placeholder="+387 00 000 00 00"
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Prebivalište (Grad)</p>
                      </div>
                      <div className="col-sm-8">
                        {!isEditing && (
                          <p className="text-muted mb-0">
                            {userDataState.placeOfResidence}
                          </p>
                        )}
                        {isEditing && (
                          <Form.Control
                            value={placeOfResidence}
                            onChange={ev =>
                              setPlaceOfResidence(ev.target.value)
                            }
                            type="text"
                            placeholder="New York"
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Adresa</p>
                      </div>
                      <div className="col-sm-8">
                        {!isEditing && (
                          <p className="text-muted mb-0">
                            {userDataState.address}
                          </p>
                        )}
                        {isEditing && (
                          <Form.Control
                            value={address}
                            onChange={ev => setAddress(ev.target.value)}
                            type="text"
                            placeholder="Brooklyn, New York, USA"
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Broj pošte</p>
                      </div>
                      <div className="col-sm-8">
                        {!isEditing && (
                          <p className="text-muted mb-0">
                            {userDataState.zipCode}
                          </p>
                        )}
                        {isEditing && (
                          <Form.Control
                            value={zipCode}
                            onChange={ev => setZipCode(ev.target.value)}
                            type="text"
                            placeholder="10000"
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '-15px', marginBottom: '10px' }}>
                  {isEditing && (
                    <Button
                      style={{ marginRight: '10px' }}
                      variant="dark"
                      size="sm"
                      onClick={handleFormSubmit}
                    >
                      Ažuriraj
                    </Button>
                  )}
                  {!isUpdating && (
                    <Button
                      variant={isEditing ? 'danger' : 'success'}
                      size="sm"
                      onClick={() => {
                        if (isEditing) setIsEditing(false);
                        else {
                          setIsEditingPassword(false);
                          setPasswordError();
                          setIsEditing(true);
                        }
                      }}
                    >
                      {isEditing ? 'Prekid' : 'Uredi'}
                    </Button>
                  )}
                </div>

                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Trenutna lozinka</p>
                      </div>
                      <div className="col-sm-4">
                        {!isEditingPassword && (
                          <p className="text-muted mb-0">********</p>
                        )}
                        {isEditingPassword && (
                          <Form.Control
                            value={oldPassword}
                            onChange={ev => setOldPassword(ev.target.value)}
                            placeholder="********"
                            type="password"
                            size="sm"
                          />
                        )}{' '}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Nova lozinka</p>
                      </div>
                      <div className="col-sm-4">
                        {!isEditingPassword && (
                          <p className="text-muted mb-0">******** </p>
                        )}
                        {isEditingPassword && (
                          <Form.Control
                            value={newPassword}
                            onChange={ev => setNewPassword(ev.target.value)}
                            placeholder="********"
                            type="password"
                            size="sm"
                          />
                        )}{' '}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Potvrdite novu lozinku</p>
                      </div>
                      <div className="col-sm-4">
                        {!isEditingPassword && (
                          <p className="text-muted mb-0">******* </p>
                        )}
                        {isEditingPassword && (
                          <Form.Control
                            value={confirmPassword}
                            placeholder="********"
                            onChange={ev => setConfirmPassword(ev.target.value)}
                            type="password"
                            size="sm"
                          />
                        )}{' '}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '-15px', marginBottom: '10px' }}>
                  {isEditingPassword && (
                    <Button
                      style={{ marginRight: '10px', marginBottom: '10px' }}
                      variant="dark"
                      size="sm"
                      disabled={
                        (!newPassword && !confirmPassword) ||
                        newPassword !== confirmPassword
                      }
                      onClick={handleChangePasswordSubmit}
                    >
                      {isPasswordUpdating ? 'Ažuriram...' : 'Ažuriraj lozinku'}
                    </Button>
                  )}
                  {!isPasswordUpdating && (
                    <Button
                      style={{ marginRight: '10px', marginBottom: '10px' }}
                      variant={isEditingPassword ? 'danger' : 'success'}
                      size="sm"
                      onClick={() => {
                        if (isEditingPassword) {
                          setIsEditingPassword(false);
                          setPasswordError();
                          setOldPassword();
                          setNewPassword();
                          setConfirmPassword();
                        } else {
                          setIsEditing(false);
                          setIsEditingPassword(true);
                        }
                      }}
                    >
                      {isEditingPassword ? 'Prekid' : 'Promijeni lozinku'}
                    </Button>
                  )}
                  {passwordError && (
                    <Button
                      style={{ marginRight: '10px', marginBottom: '10px' }}
                      variant="danger"
                      size="sm"
                      disabled
                    >
                      {passwordError}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapperComponent>
  );
};

export default AccountPage;
