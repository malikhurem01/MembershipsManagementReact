import {
  Accordion,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
  Table
} from 'react-bootstrap';
import NavBar from '../../NavBar/NavBar';

import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';

import classes from './ActiveDonationsPage.module.css';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import incomeItemsService from '../../../Services/incomeItemsService';
import AuthContext from '../../../Store/auth-context-api';
import { factorDate } from '../../../Utils/factorDate';
import { useNavigate, useParams } from 'react-router-dom';

const ActiveDonationsPage = ({ supervisorView }) => {
  const [items, setItems] = useState();
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddIncomeItem, setShowAddIncomeItem] = useState(false);
  const [showDeleteIncome, setShowDeleteIncome] = useState(false);
  const [showDeleteIncomeItem, setShowDeleteIncomeItem] = useState(false);
  const [showAddDonator, setShowAddDonator] = useState(false);
  const [selected, setSelected] = useState();
  const [isLoading, setIsLoading] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [note, setNote] = useState();
  const [name, setName] = useState();
  const [donatorFirstName, setDonatorFirstName] = useState();
  const [donatorFathersName, setDonatorFathersName] = useState();
  const [donatorLastName, setDonatorLastName] = useState();
  const [donatorAddress, setDonatorAddress] = useState();
  const [donatorPhoneNumber, setDonatorPhoneNumber] = useState();
  const [donatorEmail, setDonatorEmail] = useState();
  const [donators, setDonators] = useState();
  const [selectedDonator, setSelectedDonator] = useState();

  const navigate = useNavigate();

  const { userDataState } = useContext(AuthContext);

  const { dzematId } = useParams();

  const handleShowAddIncome = () => {
    setShowAddIncome(prevState => !prevState);
  };

  const handleShowAddIncomeItem = () => {
    setShowAddIncomeItem(prevState => !prevState);
  };

  const handleShowDeleteIncome = () => {
    setShowDeleteIncome(prevState => !prevState);
  };

  const handleShowDeleteIncomeItem = () => {
    setShowDeleteIncomeItem(prevState => !prevState);
  };

  const handleShowAddDonator = () => {
    setShowAddDonator(prevState => !prevState);
  };

  const handleFetchActiveIncomeItems = useCallback(() => {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    incomeItemsService
      .getActiveDonationIncomeItems(token, dzematId)
      .then(res => {
        setItems(res.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setItems(null);
        setIsLoading(false);
      });
  }, [dzematId]);

  const handleFetchDonators = useCallback(() => {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    incomeItemsService
      .getDonators(token)
      .then(res => {
        setDonators(res.data.data['$values']);
        setIsLoading(false);
      })
      .catch(() => {
        setDonators();
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    handleFetchActiveIncomeItems();
  }, [handleFetchActiveIncomeItems]);

  useEffect(() => {
    handleFetchDonators();
  }, [handleFetchDonators]);

  const handleAddIncome = ev => {
    ev.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    incomeItemsService
      .addIncome(token, {
        dzematId: userDataState.dzematId,
        incomeItemId: selected.id,
        donatorId: selectedDonator,
        amount,
        date,
        note,
        incomeType: 0
      })
      .then(res => {
        handleFetchActiveIncomeItems();
        setIsLoading(false);
        handleShowAddIncome();
      })
      .catch(() => {
        setItems(null);
        setIsLoading(false);
      });
  };

  const handleAddIncomeItem = ev => {
    ev.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    incomeItemsService
      .createIncomeItem(token, {
        dzematId: userDataState.dzematId,
        spreadsheetId: items.spreadsheetId,
        name,
        incomeType: 0
      })
      .then(() => {
        handleFetchActiveIncomeItems();
        setIsLoading(false);
        handleShowAddIncomeItem();
      })
      .catch(() => {
        setItems(null);
        setIsLoading(false);
      });
  };

  const handleAddDonator = ev => {
    ev.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    incomeItemsService
      .addDonator(token, {
        dzematId: userDataState.dzematId,
        firstName: donatorFirstName,
        fathersName: donatorFathersName,
        lastName: donatorLastName,
        address: donatorAddress,
        phoneNumber: donatorPhoneNumber,
        email: donatorEmail
      })
      .then(() => {
        setIsLoading(false);
        handleShowAddDonator();
        handleFetchDonators();
        setDonatorFirstName();
        setDonatorLastName();
        setDonatorAddress();
        setDonatorPhoneNumber();
        setDonatorEmail();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteIncome = ev => {
    ev.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    incomeItemsService
      .deleteIncome(token, {
        id: selected.id,
        dzematId: userDataState.dzematId,
        incomeItemId: selected.incomeItemId
      })
      .then(() => {
        handleFetchActiveIncomeItems();
        setIsLoading(false);
        handleShowDeleteIncome();
      })
      .catch(() => {
        setItems(null);
        setIsLoading(false);
      });
  };

  const handleDeleteIncomeItem = ev => {
    ev.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    incomeItemsService
      .deleteIncomeItem(token, {
        id: selected.id,
        dzematId: userDataState.dzematId
      })
      .then(() => {
        handleFetchActiveIncomeItems();
        setIsLoading(false);
        handleShowDeleteIncomeItem();
      })
      .catch(() => {
        setItems(null);
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      {!items && !isLoading && (
        <Modal show={true} backdrop="static" keyboard={false} centered>
          {' '}
          <Modal.Header closeButton>
            <Modal.Title>Napomena</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <h6>
                Morate imati aktivnu bazu kako biste pristupili aktivnim
                donacijama{' '}
              </h6>
              <p style={{ fontStyle: 'italic' }}>
                <strong>
                  *Kreirajte bazu prije pristupanja aktivnim donacijama
                </strong>
              </p>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                navigate('/donacije');
              }}
            >
              Nazad
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {items && (
        <PageWrapperComponent>
          <Modal
            show={showDeleteIncome}
            onHide={handleShowDeleteIncome}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Form onSubmit={handleDeleteIncome}>
              {' '}
              <Modal.Header closeButton>
                <Modal.Title>Želite li ukloniti donaciju?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <p style={{ fontStyle: 'italic' }}>
                    *Ova radnja se ne može poništiti
                  </p>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleShowDeleteIncome}>
                  Nazad
                </Button>
                <Button type="submit" variant="danger">
                  {isLoading ? '...' : 'Izbriši donaciju'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <Modal
            show={showDeleteIncomeItem}
            onHide={handleShowDeleteIncomeItem}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Form onSubmit={handleDeleteIncomeItem}>
              {' '}
              <Modal.Header closeButton>
                <Modal.Title>
                  Želite li ukloniti stavku {`${selected?.name}`}?
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <p style={{ fontStyle: 'italic' }}>
                    *Ova radnja se ne može poništiti
                  </p>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={handleShowDeleteIncomeItem}
                >
                  Nazad
                </Button>
                <Button type="submit" variant="danger">
                  {isLoading ? '...' : 'Izbriši stavku'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <Modal
            show={showAddIncome}
            onHide={handleShowAddIncome}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Form onSubmit={handleAddIncome}>
              {' '}
              <Modal.Header closeButton>
                <Modal.Title>Nova donacija</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  {donators?.length === 0 && (
                    <p style={{ fontStyle: 'italic' }}>
                      <strong>
                        *Da biste dodali donaciju, morate imati donatora u bazi
                        podataka
                      </strong>
                    </p>
                  )}
                  {donators?.length > 0 && (
                    <React.Fragment>
                      <p style={{ fontStyle: 'italic' }}>
                        *Upišite iznos i datum donacije
                      </p>{' '}
                      <Row>
                        <Col lg={6} md="auto" sm={8}>
                          <FloatingLabel
                            value={amount}
                            onChange={ev => setAmount(ev.target.value)}
                            controlId="floatingAmount"
                            label="Iznos"
                            className="mb-3"
                          >
                            <Form.Control
                              type="number"
                              placeholder="Iznos"
                              required
                            />
                          </FloatingLabel>
                        </Col>
                        <Col lg={6} md="auto" sm={8}>
                          <FloatingLabel
                            value={date}
                            onChange={ev => setDate(ev.target.value)}
                            controlId="floatingDateOfPayment"
                            label="Datum"
                            className="mb-3"
                          >
                            <Form.Control
                              type="date"
                              placeholder="Datum"
                              required
                            />
                          </FloatingLabel>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6} md="auto" sm={8}>
                          <FloatingLabel
                            value={note}
                            onChange={ev => setNote(ev.target.value)}
                            controlId="floatingAmount"
                            label="Napomena"
                            className="mb-3"
                          >
                            <Form.Control type="text" placeholder="Napomena" />
                          </FloatingLabel>
                        </Col>
                        <Col lg={6} md="auto" sm={8}>
                          <FloatingLabel
                            controlId="floatingDonator"
                            label="Odaberi donatora"
                            required
                          >
                            <Form.Select
                              value={selectedDonator}
                              onChange={ev =>
                                setSelectedDonator(ev.target.value)
                              }
                              aria-label="Donator"
                              required
                            >
                              <option value="">Odaberite donatora</option>
                              {donators?.length > 0 &&
                                donators.map(el => {
                                  return (
                                    <option
                                      value={el.id}
                                    >{`${el.firstName} ${el.lastName}`}</option>
                                  );
                                })}
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                      </Row>
                    </React.Fragment>
                  )}
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleShowAddIncome}>
                  Nazad
                </Button>
                {donators?.length > 0 && (
                  <Button type="submit" variant="success">
                    {isLoading ? '...' : 'Dodaj donaciju'}
                  </Button>
                )}
              </Modal.Footer>
            </Form>
          </Modal>
          <Modal
            show={showAddDonator}
            onHide={handleShowAddDonator}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Form onSubmit={handleAddDonator}>
              {' '}
              <Modal.Header closeButton>
                <Modal.Title>Novi donator</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <p style={{ fontStyle: 'italic' }}>
                    *Upišite ime, prezime i kontakt podatke donatora
                  </p>
                  <Row>
                    <Col lg={4} md="auto" sm={8}>
                      <FloatingLabel
                        controlId="floatingFirstName"
                        label="*Ime"
                        className="mb-3"
                      >
                        <Form.Control
                          value={donatorFirstName}
                          onChange={ev => setDonatorFirstName(ev.target.value)}
                          type="text"
                          placeholder="Ime"
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={4} md="auto" sm={8}>
                      <FloatingLabel
                        controlId="floatingFathersName"
                        label="*Ime oca"
                        className="mb-3"
                      >
                        <Form.Control
                          value={donatorFathersName}
                          onChange={ev =>
                            setDonatorFathersName(ev.target.value)
                          }
                          type="text"
                          placeholder="Prezime"
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={4} md="auto" sm={8}>
                      <FloatingLabel
                        controlId="floatingLastName"
                        label="*Prezime"
                        className="mb-3"
                      >
                        <Form.Control
                          value={donatorLastName}
                          onChange={ev => setDonatorLastName(ev.target.value)}
                          type="text"
                          placeholder="Prezime"
                          required
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} md="auto" sm={8}>
                      <FloatingLabel
                        controlId="floatingAddress"
                        label="Adresa"
                        className="mb-3"
                      >
                        <Form.Control
                          value={donatorAddress}
                          onChange={ev => setDonatorAddress(ev.target.value)}
                          type="text"
                          placeholder="Adresa"
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={4} md="auto" sm={8}>
                      <FloatingLabel
                        controlId="floatingPhoneNumber"
                        label="*Broj telefona"
                        className="mb-3"
                      >
                        <Form.Control
                          value={donatorPhoneNumber}
                          onChange={ev =>
                            setDonatorPhoneNumber(ev.target.value)
                          }
                          type="text"
                          placeholder="Broj telefona"
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={4} md="auto" sm={8}>
                      <FloatingLabel
                        controlId="floatingEmail"
                        label="Email"
                        className="mb-3"
                      >
                        <Form.Control
                          value={donatorEmail}
                          onChange={ev => setDonatorEmail(ev.target.value)}
                          type="email"
                          placeholder="Email"
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleShowAddDonator}>
                  Nazad
                </Button>
                <Button type="submit" variant="success">
                  {isLoading ? 'Dodajem...' : 'Dodaj donatora'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <Modal
            show={showAddIncomeItem}
            onHide={handleShowAddIncomeItem}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Form onSubmit={handleAddIncomeItem}>
              {' '}
              <Modal.Header closeButton>
                <Modal.Title>Nova stavka</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <p style={{ fontStyle: 'italic' }}>
                    *Upišite naziv nove stavke{' '}
                  </p>

                  <FloatingLabel
                    value={name}
                    onChange={ev => setName(ev.target.value)}
                    controlId="floatingName"
                    label="Naziv"
                    className="mb-3"
                  >
                    <Form.Control type="text" placeholder="Naziv" required />
                  </FloatingLabel>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleShowAddIncomeItem}>
                  Nazad
                </Button>
                <Button type="submit" variant="success">
                  {isLoading ? '...' : 'Dodaj stavku'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <div className={classes.container}>
            <section style={{ backgroundColor: '#eee' }}>
              <div className="container">
                <NavBar
                  style={{ marginTop: '-15px' }}
                  routes={[
                    {
                      route: `/donacije/aktivne-donacije`,
                      name: 'Aktivne donacije'
                    }
                  ]}
                />
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card mb-4">
                      <div className="card-body text-center">
                        <h5 className="my-3">Aktivne donacije</h5>
                        <p className="text-muted mb-1">
                          Broj aktivnih stavki:{' '}
                          <strong>
                            {items?.incomeItems['$values']?.length || 0}
                          </strong>
                        </p>
                        <p className="text-muted mb-4">
                          Baza za godinu:{' '}
                          <strong>{items?.spreadsheetYear}</strong>
                        </p>
                        <div className="d-flex justify-content-center mb-2">
                          {!supervisorView && (
                            <React.Fragment>
                              <Button
                                style={{ marginRight: '15px' }}
                                size="sm"
                                type="button"
                                variant="primary"
                                onClick={handleShowAddIncomeItem}
                              >
                                Kreiraj stavku
                              </Button>

                              <Button
                                style={{ marginRight: '15px' }}
                                size="sm"
                                type="button"
                                variant="primary"
                                onClick={handleShowAddDonator}
                              >
                                Dodaj donatora
                              </Button>
                            </React.Fragment>
                          )}
                          <Button size="sm" type="button" variant="warning">
                            Arhiva
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="card mb-4 mb-lg-0">
                      <div className="card-body p-0">
                        <ul className="list-group list-group-flush rounded-3">
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <p className="mb-0">
                              Ukupno donacija za <strong>tekuću</strong> godinu
                            </p>
                            <p className="mb-0">
                              <strong>{items?.totalIncomeAmount}KM</strong>
                            </p>{' '}
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <p className="mb-0">
                              Ukupno troškova za <strong>tekuću</strong> godinu
                            </p>
                            <p className="mb-0">NAPRAVITI</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8">
                    <Accordion defaultActiveKey="0">
                      <div className="card mb-1">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">
                                <strong>Donacije</strong>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      {items?.incomeItems['$values']?.map((el, index) => {
                        return (
                          <Accordion.Item eventKey={index}>
                            <Accordion.Header>{el.name}</Accordion.Header>
                            <Accordion.Body>
                              <div className="card-body">
                                {el.income['$values'] && (
                                  <Table striped bordered hover responsive>
                                    <thead>
                                      <tr>
                                        <th>#</th>
                                        <th>Donator</th>
                                        <th>Iznos</th>
                                        <th>Datum</th>
                                        {!supervisorView && <th>Opcije</th>}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {el.income['$values'].map(
                                        (inc, index) => {
                                          return (
                                            <tr>
                                              <td>{index + 1}</td>
                                              <td>{`${inc.donator?.firstName} (${inc.donator?.fathersName}) ${inc.donator?.lastName}`}</td>
                                              <td>{inc.amount}KM</td>
                                              <td className="col-sm-3">
                                                {factorDate(inc.date)}
                                              </td>
                                              {!supervisorView && (
                                                <td
                                                  style={{
                                                    textAlign: 'center'
                                                  }}
                                                >
                                                  <Button
                                                    variant="dark"
                                                    size="sm"
                                                    onClick={() => {
                                                      setSelected({
                                                        id: inc.id,
                                                        incomeItemId: el.id
                                                      });
                                                      handleShowDeleteIncome();
                                                    }}
                                                  >
                                                    Ukloni
                                                  </Button>
                                                </td>
                                              )}
                                            </tr>
                                          );
                                        }
                                      )}
                                    </tbody>
                                  </Table>
                                )}
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                  <Button size="sm" disabled variant="success">
                                    UKUPNO: &nbsp;&nbsp;
                                    <strong>{el.totalIncome}KM</strong>
                                  </Button>
                                </div>
                                <hr />
                                {!supervisorView && (
                                  <div className="d-flex justify-content-between align-items-center">
                                    <Button
                                      variant="success"
                                      size="sm"
                                      onClick={() => {
                                        handleShowAddIncome();
                                        setSelected(el);
                                      }}
                                    >
                                      Dodaj donaciju
                                    </Button>
                                    <Button
                                      variant="dark"
                                      size="sm"
                                      onClick={() => {
                                        handleShowDeleteIncomeItem();
                                        setSelected(el);
                                      }}
                                    >
                                      Ukloni stavku
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        );
                      })}
                    </Accordion>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </PageWrapperComponent>
      )}
    </React.Fragment>
  );
};

export default ActiveDonationsPage;
