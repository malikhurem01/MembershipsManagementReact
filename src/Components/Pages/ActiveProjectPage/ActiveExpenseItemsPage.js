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

import classes from './ActiveExpenseItemsPage.module.css';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import expenseItemsService from '../../../Services/expenseItemsService';
import AuthContext from '../../../Store/auth-context-api';
import { factorDate } from '../../../Utils/factorDate';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const ActiveExpenseItemsPage = ({ supervisorView }) => {
  const [items, setItems] = useState();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddExpenseItem, setShowAddExpenseItem] = useState(false);
  const [showDeleteExpense, setShowDeleteExpense] = useState(false);
  const [showDeleteExpenseItem, setShowDeleteExpenseItem] = useState(false);
  const [selected, setSelected] = useState();
  const [isLoading, setIsLoading] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState();
  const [note, setNote] = useState();
  const [name, setName] = useState();

  const navigate = useNavigate();

  const { userDataState } = useContext(AuthContext);

  const { dzematId } = useParams();

  const handleShowAddExpense = () => {
    setShowAddExpense(prevState => !prevState);
  };

  const handleShowAddExpenseItem = () => {
    setShowAddExpenseItem(prevState => !prevState);
  };

  const handleShowDeleteExpense = () => {
    setShowDeleteExpense(prevState => !prevState);
  };

  const handleShowDeleteExpenseItem = () => {
    setShowDeleteExpenseItem(prevState => !prevState);
  };

  const handleFetchActiveExpenseItems = useCallback(() => {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    expenseItemsService
      .getActiveExpenseItems(token, dzematId)
      .then(res => {
        setItems(res.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setItems(null);
        setIsLoading(false);
      });
  }, [dzematId]);

  useEffect(() => {
    handleFetchActiveExpenseItems();
  }, [handleFetchActiveExpenseItems]);

  const handleAddExpense = ev => {
    ev.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    expenseItemsService
      .addExpense(token, {
        dzematId: userDataState.dzematId,
        expenseItemId: selected.id,
        amount,
        date,
        note
      })
      .then(res => {
        handleFetchActiveExpenseItems();
        setIsLoading(false);
        handleShowAddExpense();
      })
      .catch(() => {
        setItems(null);
        setIsLoading(false);
      });
  };

  const handleAddExpenseItem = ev => {
    ev.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    expenseItemsService
      .createExpenseItem(token, {
        dzematId: userDataState.dzematId,
        spreadsheetId: items.spreadsheetId,
        name
      })
      .then(() => {
        handleFetchActiveExpenseItems();
        setIsLoading(false);
        handleShowAddExpenseItem();
      })
      .catch(() => {
        setItems(null);
        setIsLoading(false);
      });
  };

  const handleDeleteExpense = ev => {
    ev.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    expenseItemsService
      .deleteExpense(token, {
        id: selected.id,
        dzematId: userDataState.dzematId,
        expenseItemId: selected.expenseItemId
      })
      .then(() => {
        handleFetchActiveExpenseItems();
        setIsLoading(false);
        handleShowDeleteExpense();
      })
      .catch(() => {
        setItems(null);
        setIsLoading(false);
      });
  };

  const handleDeleteExpenseItem = ev => {
    ev.preventDefault();
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    expenseItemsService
      .deleteExpenseItem(token, {
        id: selected.id,
        dzematId: userDataState.dzematId
      })
      .then(() => {
        handleFetchActiveExpenseItems();
        setIsLoading(false);
        handleShowDeleteExpenseItem();
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
                Morate imati aktivnu bazu kako biste pristupili troškovima{' '}
              </h6>
              <p style={{ fontStyle: 'italic' }}>
                <strong>*Kreirajte bazu prije pristupanja troškovima</strong>
              </p>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                navigate('/troskovi');
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
            show={showDeleteExpense}
            onHide={handleShowDeleteExpense}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Form onSubmit={handleDeleteExpense}>
              {' '}
              <Modal.Header closeButton>
                <Modal.Title>Želite li ukloniti trošak?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <p style={{ fontStyle: 'italic' }}>
                    *Ova radnja se ne može poništiti
                  </p>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleShowDeleteExpense}>
                  Nazad
                </Button>
                <Button type="submit" variant="danger">
                  {isLoading ? '...' : 'Izbriši trošak'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <Modal
            show={showDeleteExpenseItem}
            onHide={handleShowDeleteExpenseItem}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Form onSubmit={handleDeleteExpenseItem}>
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
                  onClick={handleShowDeleteExpenseItem}
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
            show={showAddExpense}
            onHide={handleShowAddExpense}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Form onSubmit={handleAddExpense}>
              {' '}
              <Modal.Header closeButton>
                <Modal.Title>Novi trošak</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <p style={{ fontStyle: 'italic' }}>
                    *Upišite iznos i datum troška
                  </p>
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
                    <Col lg={12} md="auto" sm={8}>
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
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleShowAddExpense}>
                  Nazad
                </Button>
                <Button type="submit" variant="danger">
                  {isLoading ? '...' : 'Dodaj trošak'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <Modal
            show={showAddExpenseItem}
            onHide={handleShowAddExpenseItem}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Form onSubmit={handleAddExpenseItem}>
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
                <Button variant="secondary" onClick={handleShowAddExpenseItem}>
                  Nazad
                </Button>
                <Button type="submit" variant="danger">
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
                      route: `/troskovi/aktivni-projekti`,
                      name: 'Aktivni troškovi'
                    }
                  ]}
                />
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card mb-4">
                      <div className="card-body text-center">
                        <h5 className="my-3">Aktivni troškovi</h5>
                        <p className="text-muted mb-1">
                          Broj aktivnih stavki:{' '}
                          <strong>
                            {items?.expenseItems['$values']?.length || 0}
                          </strong>
                        </p>
                        <p className="text-muted mb-4">
                          Baza za godinu:{' '}
                          <strong>{items?.spreadsheetYear}</strong>
                        </p>
                        <div className="d-flex justify-content-center mb-2">
                          {!supervisorView && (
                            <Button
                              style={{ marginRight: '15px' }}
                              size="sm"
                              type="button"
                              variant="primary"
                              onClick={handleShowAddExpenseItem}
                            >
                              Kreiraj stavku
                            </Button>
                          )}
                          <NavLink
                            to={
                              supervisorView
                                ? `/pregled/lista/dzemata/clanarine/arhiva-baza/${dzematId}?redirectTo=expenses`
                                : '/clanarine/arhiva-baza?redirectTo=expenses'
                            }
                          >
                            {' '}
                            <Button size="sm" type="button" variant="warning">
                              Arhiva
                            </Button>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    <div className="card mb-4 mb-lg-0">
                      <div className="card-body p-0">
                        <ul className="list-group list-group-flush rounded-3">
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <p className="mb-0">
                              Ukupno troškova za <strong>tekuću</strong> godinu
                            </p>
                            <p className="mb-0">
                              <strong>{items?.totalExpensesAmount}KM</strong>
                            </p>{' '}
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <p className="mb-0">
                              Ukupno priliva za <strong>tekuću</strong> godinu
                            </p>
                            <p className="mb-0">
                              {' '}
                              <strong>{items?.totalIncomeAmount}KM</strong>
                            </p>
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
                                <strong>Troškovi</strong>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      {items?.expenseItems['$values']?.map((el, index) => {
                        return (
                          <Accordion.Item eventKey={index}>
                            <Accordion.Header>{el.name}</Accordion.Header>
                            <Accordion.Body>
                              <div className="card-body">
                                {el.expenses['$values'] && (
                                  <ul className="list-group list-group-flush rounded-3">
                                    {el.expenses['$values'].map(exp => {
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
                                          {!supervisorView && (
                                            <div className="col-sm-4">
                                              <Button
                                                variant="dark"
                                                size="sm"
                                                onClick={() => {
                                                  setSelected({
                                                    id: exp.id,
                                                    expenseItemId: el.id
                                                  });
                                                  handleShowDeleteExpense();
                                                }}
                                              >
                                                Ukloni
                                              </Button>
                                            </div>
                                          )}
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
                                          <strong>{el.totalExpenses}KM</strong>
                                        </p>
                                      </div>
                                      <div className="col-sm-4"></div>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-1"></li>
                                  </ul>
                                )}
                                {!supervisorView && (
                                  <div className="d-flex justify-content-between align-items-center">
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      onClick={() => {
                                        handleShowAddExpense();
                                        setSelected(el);
                                      }}
                                    >
                                      Dodaj trošak
                                    </Button>
                                    <Button
                                      variant="dark"
                                      size="sm"
                                      onClick={() => {
                                        handleShowDeleteExpenseItem();
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

export default ActiveExpenseItemsPage;
