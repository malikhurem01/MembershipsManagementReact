import { Button, Container, Row } from 'react-bootstrap';

import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';

import classes from './EmailPage.module.css';

const EmailPage = () => {
  return (
    <PageWrapperComponent>
      <div className={classes.container}>
        <Container>
          <Row>
            <Col lg={6} md="auto" xs={8}></Col>
          </Row>
        </Container>
      </div>
    </PageWrapperComponent>
  );
};

export default EmailPage;
