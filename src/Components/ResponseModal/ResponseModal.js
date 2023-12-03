import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';

import ActiveSpreadsheetContext from '../../Store/active-spreadsheet-context';

import loadingSvg from '../../Assets/Pictures/loadingSvg.svg';
import creationFailed from '../../Assets/Pictures/creationFailed.svg';
import creationSuccess from '../../Assets/Pictures/creationSuccess.svg';

import styles from '../FormModal/FormModal.module.css';

const ResponseModal = ({ reInitialize }) => {
  const { response, handleSetResponse } = useContext(ActiveSpreadsheetContext);

  const handleClear = () => {
    handleSetResponse({ loading: false });
    reInitialize();
  };

  return (
    <React.Fragment>
      <div className={styles.backdrop}></div>
      <div className={styles.responseModalAbsolute}>
        {response.statusCode == null && (
          <img src={loadingSvg} alt="učitavam.." />
        )}
        {response.statusCode === 200 && (
          <img src={creationSuccess} alt="uspješno.." />
        )}
        {response.statusCode >= 400 && (
          <img src={creationFailed} alt="neuspješno.." />
        )}
        <p>{response.message}</p>
        {response.loading === true &&
          response?.statusCode >= 400 &&
          response.action !== 'archive' && (
            <Button
              className={styles.responseButton}
              onClick={handleClear}
              variant="danger"
            >
              Poništi
            </Button>
          )}
        {response.loading &&
          response?.statusCode >= 200 &&
          response?.statusCode < 300 &&
          response.action !== 'add_member' &&
          response.action !== 'archive' &&
          response.action !== 'modify_member' &&
          response.action !== 'add_payment' &&
          response.action !== 'family_member' &&
          response.action !== 'payment_delete' && (
            <Button
              className={styles.responseButton}
              onClick={handleClear}
              variant="success"
            >
              Nazad
            </Button>
          )}
      </div>
    </React.Fragment>
  );
};

export default ResponseModal;
