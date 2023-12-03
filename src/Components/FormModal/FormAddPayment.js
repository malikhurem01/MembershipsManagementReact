import React, { useContext, useState } from 'react';
import { Form, Row, Col, FloatingLabel, Button } from 'react-bootstrap';

import ActiveSpreadsheetContext from '../../Store/active-spreadsheet-context';

import styles from './FormModal.module.css';

const FormAddPayment = ({ handleShowAddPayment, handleAddPayment }) => {
  const [amount, setAmount] = useState('');
  const [dateOfPayment, setDateOfPayment] = useState('');

  const { response } = useContext(ActiveSpreadsheetContext);

  const handlePaymentSubmit = ev => {
    ev.preventDefault();
    handleAddPayment({ amount, dateOfPayment });
  };

  return (
    <React.Fragment>
      {!response.loading && (
        <React.Fragment>
          <div className={styles.backdrop}></div>
          <div className={styles.modal}>
            <h4
              style={{
                borderBottom: '1px solid #cecece',
                marginBottom: '15px',
                paddingBottom: '5px'
              }}
            >
              Nova uplata
            </h4>
            <Form onSubmit={handlePaymentSubmit}>
              <h5>Podaci</h5>
              <Row className="g-2">
                <Col lg={6} md="auto" sm={8}>
                  <FloatingLabel
                    controlId="floatingAmount"
                    label="Iznos uplate"
                    className="mb-3"
                  >
                    <Form.Control
                      value={amount}
                      onChange={ev => setAmount(ev.target.value)}
                      type="number"
                      placeholder="Iznos"
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col lg={6} md="auto" sm={8}>
                  <FloatingLabel
                    controlId="floatingDateOfPayment"
                    label="Datum uplate"
                    className="mb-3"
                  >
                    <Form.Control
                      value={dateOfPayment}
                      onChange={ev => setDateOfPayment(ev.target.value)}
                      type="date"
                      placeholder="Datum uplate"
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Button
                type="submit"
                style={{ marginRight: '20px' }}
                variant="primary"
              >
                Spremi
              </Button>
              <Button onClick={handleShowAddPayment} variant="danger">
                Odustani
              </Button>
            </Form>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FormAddPayment;
