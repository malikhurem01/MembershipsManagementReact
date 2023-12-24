import {
  Accordion,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row
} from 'react-bootstrap';
import NavBar from '../../NavBar/NavBar';

import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';

import classes from '../ActiveDonationsPage/ActiveDonationsPage.module.css';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import incomeItemsService from '../../../Services/incomeItemsService';
import AuthContext from '../../../Store/auth-context-api';
import { factorDate } from '../../../Utils/factorDate';
import { useNavigate } from 'react-router-dom';

const ActiveIncomesPage = () => {
  const [items, setItems] = useState();
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddIncomeItem, setShowAddIncomeItem] = useState(false);
  const [showDeleteIncome, setShowDeleteIncome] = useState(false);
  const [showDeleteIncomeItem, setShowDeleteIncomeItem] = useState(false);
  const [selected, setSelected] = useState();
  const [isLoading, setIsLoading] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [note, setNote] = useState();
  const [name, setName] = useState();

  const navigate = useNavigate();

  const { userDataState } = useContext(AuthContext);

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

  const handleFetchActiveIncomeItems = useCallback(() => {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    incomeItemsService
      .getActiveIncomeItems(token)
      .then(res => {
        setItems(res.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setItems(null);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    handleFetchActiveIncomeItems();
  }, [handleFetchActiveIncomeItems]);

  const handleAddIncome = ev => {
    ev.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    incomeItemsService
      .addIncome(token, {
        dzematId: userDataState.dzematId,
        incomeItemId: selected.id,
        amount,
        date,
        note,
        incomeType: 1
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
        incomeType: 1
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
      {!items && (
        <Modal show={true} backdrop="static" keyboard={false} centered>
          {' '}
          <Modal.Header closeButton>
            <Modal.Title>Napomena</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <h6>
                Morate imati aktivnu bazu kako biste pristupili aktivnim
                prihodima{' '}
              </h6>
              <p style={{ fontStyle: 'italic' }}>
                <strong>
                  *Kreirajte bazu prije pristupanja aktivnim prihodima
                </strong>
              </p>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                navigate('/prihodi');
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
                <Modal.Title>Želite li ukloniti prihod?</Modal.Title>
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
                  {isLoading ? '...' : 'Izbriši prihod'}
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
                <Modal.Title>Novi prihod</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <React.Fragment>
                    <p style={{ fontStyle: 'italic' }}>
                      *Upišite iznos i datum prihodi
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
                    </Row>
                  </React.Fragment>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleShowAddIncome}>
                  Nazad
                </Button>
                <Button type="submit" variant="success">
                  {isLoading ? '...' : 'Dodaj prihod'}
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
                      route: `/prihodi/aktivni-prihodi`,
                      name: 'Aktivni prihodi'
                    }
                  ]}
                />
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card mb-4">
                      <div className="card-body text-center">
                        <h5 className="my-3">Aktivni prihodi</h5>
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
                          <Button
                            style={{ marginRight: '15px' }}
                            size="sm"
                            type="button"
                            variant="primary"
                            onClick={handleShowAddIncomeItem}
                          >
                            Kreiraj stavku
                          </Button>

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
                              Ukupno prihoda za <strong>tekuću</strong> godinu
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
                                <strong>Prihodi</strong>
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
                                  <ul className="list-group list-group-flush rounded-3">
                                    {el.income['$values'].map(exp => {
                                      return (
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-2">
                                          <div className="col-sm-3">
                                            <p className="mb-0">
                                              {factorDate(exp.date)}
                                            </p>
                                          </div>
                                          <div className="col-sm-8">
                                            <p className="text-muted mb-0">
                                              <strong>{exp.amount}KM</strong>
                                            </p>
                                          </div>
                                          <div className="col-sm-4">
                                            <Button
                                              variant="dark"
                                              size="sm"
                                              onClick={() => {
                                                setSelected({
                                                  id: exp.id,
                                                  incomeItemId: el.id
                                                });
                                                handleShowDeleteIncome();
                                              }}
                                            >
                                              Ukloni
                                            </Button>
                                          </div>
                                        </li>
                                      );
                                    })}

                                    <li className="list-group-item d-flex justify-content-between align-items-center p-2">
                                      <div className="col-sm-3">
                                        <p className="mb-0">
                                          <strong>UKUPNO</strong>
                                        </p>
                                      </div>
                                      <div className="col-sm-8">
                                        <p className="text-muted mb-0">
                                          <strong>{el.totalIncome}KM</strong>
                                        </p>
                                      </div>
                                      <div className="col-sm-4"></div>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-1"></li>
                                  </ul>
                                )}
                                <div className="d-flex justify-content-between align-items-center">
                                  <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => {
                                      handleShowAddIncome();
                                      setSelected(el);
                                    }}
                                  >
                                    Dodaj prihod
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

export default ActiveIncomesPage;
