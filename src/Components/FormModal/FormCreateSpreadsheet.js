import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { FloatingLabel, Form, Button, Row, Col } from 'react-bootstrap';

import loadingSvg from '../../Assets/Pictures/loadingSvg.svg';
import creationFailed from '../../Assets/Pictures/creationFailed.svg';
import creationSuccess from '../../Assets/Pictures/creationSuccess.svg';

import classes from './FormModal.module.css';

const FormCreateSpreadsheet = ({
  handleCreateDatabase,
  response,
  waitingResponse,
  clearSubmit
}) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [marriageFee, setMarriageFee] = useState('');
  const [widowerFee, setWidowerFee] = useState('');
  const [ageLimitFee, setAgeLimitFee] = useState('');

  const navigate = useNavigate();

  const handleSubmit = ev => {
    ev.preventDefault();

    const data = {
      year,
      dzematId: JSON.parse(localStorage.getItem('dzemat_id')),
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

  const handleClearSubmit = () => {
    clearSubmit();
  };

  return (
    <React.Fragment>
      <div className={classes.modal}>
        <Form onSubmit={handleSubmit}>
          <h4
            style={{
              borderBottom: '1px solid #cecece',
              marginBottom: '15px',
              paddingBottom: '5px'
            }}
          >
            Kreiraj bazu
          </h4>
          <Row className="g-2">
            <Col lg={3} md="auto" sm={8}>
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
            <Col lg={3} md="auto" sm={8}>
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
            <Col lg={3} md="auto" sm={8}>
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
            <Col lg={3} md="auto" sm={8}>
              <FloatingLabel
                controlId="floatingWidowerFee"
                label="Granična dob (25 god.)"
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
          {waitingResponse && (
            <div className={classes.responseModal}>
              {response.statusCode == null && (
                <img src={loadingSvg} alt="učitavam kreiranje baze" />
              )}
              {response.statusCode === 200 && (
                <img src={creationSuccess} alt="baza uspješno kreirana" />
              )}
              {response.statusCode >= 400 && (
                <img src={creationFailed} alt="greška pri kreiranju baze" />
              )}
              <p>{response.message}</p>
            </div>
          )}
          {waitingResponse && response?.statusCode >= 400 && (
            <Button
              className={classes.responseButton}
              onClick={handleClearSubmit}
              variant="danger"
            >
              Poništi
            </Button>
          )}
          {waitingResponse &&
            response?.statusCode >= 200 &&
            response?.statusCode < 300 && (
              <Button
                className={classes.responseButton}
                onClick={handleClearSubmit}
                variant="success"
              >
                Nazad
              </Button>
            )}
          {!waitingResponse && (
            <React.Fragment>
              <Button
                style={{ marginRight: '20px' }}
                type="submit"
                variant="primary"
              >
                Kreiraj
              </Button>
              <Button variant="danger" onClick={handleNavigateBack}>
                Odustani
              </Button>
            </React.Fragment>
          )}
        </Form>
      </div>
    </React.Fragment>
  );
};

export default FormCreateSpreadsheet;
