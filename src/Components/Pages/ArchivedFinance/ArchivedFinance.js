import { Accordion, Button, Container, Modal, Table } from 'react-bootstrap';
import NavBar from '../../NavBar/NavBar';

import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';

import classes from '../ActiveDonationsPage/ActiveDonationsPage.module.css';
import React, { useCallback, useEffect, useState } from 'react';
import incomeItemsService from '../../../Services/incomeItemsService';
import expenseItemsService from '../../../Services/expenseItemsService';
import { factorDate } from '../../../Utils/factorDate';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const ArchivedFinance = ({ supervisorView }) => {
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState();
  const [params] = useSearchParams();

  const { dzematId, spreadsheetId } = useParams();
  const archiveType = params.get('archiveType');

  const navigate = useNavigate();

  const handleFetchArchivedItems = useCallback(() => {
    console.log(archiveType);
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    if (archiveType === 'incomes') {
      incomeItemsService
        .getArchivedIncomeItems(token, spreadsheetId, dzematId)
        .then(res => {
          setItems(res.data.data);
          setIsLoading(false);
        })
        .catch(() => {
          setItems(null);
          setIsLoading(false);
        });
    } else if (archiveType === 'donation') {
      incomeItemsService
        .getArchivedDonationIncomeItems(token, spreadsheetId, dzematId)
        .then(res => {
          setItems(res.data.data);
          setIsLoading(false);
        })
        .catch(() => {
          setItems(null);
          setIsLoading(false);
        });
    } else if (archiveType === 'expenses') {
      expenseItemsService
        .getArchivedExpenseItems(token, spreadsheetId, dzematId)
        .then(res => {
          setItems(res.data.data);
          setIsLoading(false);
        })
        .catch(() => {
          setItems(null);
          setIsLoading(false);
        });
    }
  }, [spreadsheetId, archiveType, dzematId]);

  useEffect(() => {
    handleFetchArchivedItems();
  }, [handleFetchArchivedItems]);

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
                Morate imati arhiviranu bazu kako biste pristupili arhiviranim
                {`${
                  archiveType === 'donation'
                    ? 'donacijama'
                    : archiveType === 'incomes'
                    ? 'prihodima'
                    : archiveType === 'expenses'
                    ? 'troškovima'
                    : ''
                }`}
              </h6>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                navigate(
                  supervisorView
                    ? '/pregled/lista/dzemata/clanarine/' + dzematId
                    : '/prihodi'
                );
              }}
            >
              Nazad
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {items && (
        <PageWrapperComponent>
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
                        <h5 className="my-3">
                          {`${
                            archiveType === 'donation'
                              ? 'Arhivirane donacije'
                              : archiveType === 'incomes'
                              ? 'Arhivirani prihodi'
                              : archiveType === 'expenses'
                              ? 'Arhivirani troškovi'
                              : ''
                          }`}
                        </h5>
                        <p className="text-muted mb-1">
                          Broj arhiviranih stavki:{' '}
                          <strong>
                            {archiveType === 'donation' &&
                              items?.incomeItems['$values']?.length}
                            {archiveType === 'incomes' &&
                              items?.incomeItems['$values']?.length}
                            {archiveType === 'expenses' &&
                              items?.expenseItems['$values']?.length}
                          </strong>
                        </p>
                        <p className="text-muted mb-4">
                          Baza za godinu:{' '}
                          <strong>{items?.spreadsheetYear}</strong>
                        </p>
                        <div className="d-flex justify-content-center mb-2">
                          <Button size="sm" type="button" variant="warning">
                            Arhiva
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="card mb-4 mb-lg-0">
                      <div className="card-body p-0">
                        <ul className="list-group list-group-flush rounded-3">
                          {(archiveType === 'donation' ||
                            archiveType === 'incomes') && (
                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                              <p className="mb-0">
                                Ukupno prihoda za{' '}
                                <strong> {items.spreadsheetYear}.</strong>{' '}
                                godinu
                              </p>
                              <p className="mb-0">
                                <strong>{items.totalIncomeAmount}</strong>
                                <strong>KM</strong>
                              </p>{' '}
                            </li>
                          )}
                          {archiveType === 'expenses' && (
                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                              <p className="mb-0">
                                Ukupno troškova za{' '}
                                <strong> {items.spreadsheetYear}.</strong>{' '}
                                godinu
                              </p>
                              <p className="mb-0">
                                <strong>{items.totalExpensesAmount}</strong>
                                <strong>KM</strong>
                              </p>{' '}
                            </li>
                          )}
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
                      {archiveType === 'incomes' &&
                        items?.incomeItems['$values']?.map((el, index) => {
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
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          );
                        })}
                      {archiveType === 'expenses' &&
                        items?.expenseItems['$values'] &&
                        items?.expenseItems['$values']?.map((el, index) => {
                          return (
                            <Accordion.Item eventKey={index}>
                              <Accordion.Header>{el.name}</Accordion.Header>
                              <Accordion.Body>
                                <div className="card-body">
                                  {el?.expenses['$values'] && (
                                    <ul className="list-group list-group-flush rounded-3">
                                      {el?.expenses['$values'].map(exp => {
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
                                            <strong>
                                              {el.totalExpenses}KM
                                            </strong>
                                          </p>
                                        </div>
                                        <div className="col-sm-4"></div>
                                      </li>
                                      <li className="list-group-item d-flex justify-content-between align-items-center p-1"></li>
                                    </ul>
                                  )}
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          );
                        })}
                      {archiveType === 'donation' &&
                        items?.incomeItems['$values']?.map((el, index) => {
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
                                              </tr>
                                            );
                                          }
                                        )}
                                      </tbody>
                                    </Table>
                                  )}
                                  <hr />
                                  <div className="d-flex justify-content-between align-items-center">
                                    <Button
                                      size="sm"
                                      disabled
                                      variant="success"
                                    >
                                      UKUPNO: &nbsp;&nbsp;
                                      <strong>{el.totalIncome}KM</strong>
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

export default ArchivedFinance;
