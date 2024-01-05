import React, { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  FloatingLabel,
  Form,
  Button,
  Row,
  Col,
  Modal,
  Container
} from 'react-bootstrap';

import { ReactComponent as LoadingSvg } from '../../Assets/Pictures/loadingSvg.svg';
import { ReactComponent as CreationFailed } from '../../Assets/Pictures/creationFailed.svg';
import { ReactComponent as CreationSuccess } from '../../Assets/Pictures/creationSuccess.svg';
import AuthContext from '../../Store/auth-context-api';

import classes from './FormModal.module.css';

const FormCreateSpreadsheet = ({
  handleCreateDatabase,
  response,
  waitingResponse
}) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [marriageFee, setMarriageFee] = useState('');
  const [widowerFee, setWidowerFee] = useState('');
  const [ageLimitFee, setAgeLimitFee] = useState('');

  const navigate = useNavigate();

  const ctx = useContext(AuthContext);

  const handleSubmit = ev => {
    ev.preventDefault();

    const data = {
      year,
      dzematId: ctx.userDataState.dzematId,
      marriageFee,
      widowerFee,
      ageLimitFee,
      archived: false
    };
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    handleCreateDatabase(token, data);
  };

  const handleNavigateBack = () => {
    navigate('/clanarine');
  };

  return (
    <React.Fragment>
      <Modal
        show={true}
        onHide={handleNavigateBack}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Form onSubmit={handleSubmit}>
          {' '}
          <Modal.Header closeButton>
            <Modal.Title>Kreiraj bazu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              {waitingResponse && (
                <React.Fragment>
                  <div className="d-flex flex-column align-items-center">
                    {response.statusCode == null && (
                      <LoadingSvg className={classes.loadingSvg} />
                    )}
                    {response.statusCode === 200 && (
                      <CreationSuccess className={classes.loadingSvg} />
                    )}
                    {response.statusCode >= 400 && (
                      <CreationFailed className={classes.loadingSvg} />
                    )}
                    <h5 className="mt-4">{response.message}</h5>
                  </div>
                </React.Fragment>
              )}

              {!waitingResponse && (
                <React.Fragment>
                  <p style={{ fontStyle: 'italic' }}>
                    *Upišite godinu za koju kreirate bazu
                  </p>
                  <Row>
                    <Col lg={12} md="auto" sm={10}>
                      <FloatingLabel
                        controlId="floatingYear"
                        label="Godina"
                        className="mb-3"
                      >
                        <Form.Control
                          value={year}
                          onChange={ev => setYear(ev.target.value)}
                          type="number"
                          placeholder="Godina"
                          label="Baza za godinu:"
                          required
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <p style={{ fontStyle: 'italic' }}>
                    *Upišite iznos članarine za ispod navedene kategorije
                  </p>
                  <Row>
                    <Col lg={4} md="auto" sm={10}>
                      <FloatingLabel
                        controlId="floatingMarriageFee"
                        label="Status brak"
                        className="mb-3"
                      >
                        <Form.Control
                          value={marriageFee}
                          onChange={ev => setMarriageFee(ev.target.value)}
                          type="number"
                          placeholder="Status brak"
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={4} md="auto" sm={10}>
                      <FloatingLabel
                        controlId="floatingWidowerFee"
                        label="Status udovac"
                        className="mb-3"
                      >
                        <Form.Control
                          value={widowerFee}
                          onChange={ev => setWidowerFee(ev.target.value)}
                          type="number"
                          placeholder="Status udovac"
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col lg={4} md="auto" sm={10}>
                      <FloatingLabel
                        controlId="floatingWidowerFee"
                        label="Granična dob"
                        className="mb-3"
                      >
                        <Form.Control
                          value={ageLimitFee}
                          onChange={ev => setAgeLimitFee(ev.target.value)}
                          type="number"
                          placeholder="Granična dob"
                          required
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                </React.Fragment>
              )}
            </Container>
          </Modal.Body>
          <Modal.Footer>
            {waitingResponse &&
              response?.statusCode >= 400 &&
              response?.statusCode <= 500 && (
                <Button variant="danger" onClick={handleNavigateBack}>
                  Nazad
                </Button>
              )}

            {!waitingResponse && (
              <Button type="submit" variant="success">
                Kreiraj
              </Button>
            )}
            {waitingResponse &&
              response?.statusCode >= 200 &&
              response?.statusCode < 300 && (
                <Button onClick={handleNavigateBack} variant="success">
                  Nazad
                </Button>
              )}
          </Modal.Footer>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default FormCreateSpreadsheet;
