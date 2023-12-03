import { Button } from 'react-bootstrap';

import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';

import classes from './EmailPage.module.css';

const EmailPage = () => {
  return (
    <PageWrapperComponent returnArrow={true}>
      <div className={classes.emailForm}>
        <h5>POŠALJITE E-MAIL ZAHVALE DONATORU</h5>
        <div className={classes.formContainer}>
          <input type="email" placeholder="E-mail donatora:" />
          <input type="number" placeholder="Iznos donacije (KM):" />
          <textarea rows={5} placeholder="Napomena:" />
          <Button variant="dark">POŠALJI</Button>
        </div>
      </div>
    </PageWrapperComponent>
  );
};

export default EmailPage;
