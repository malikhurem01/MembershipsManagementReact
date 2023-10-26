import { Button } from "react-bootstrap";

import classes from "./DeviceQuestionPage.module.css";

const InWorkModal = ({ handleCloseModal }) => {
  return (
    <div className={classes.inWorkModal}>
      <h5>Aplikacija u izradi. Molimo koristite verziju za računar.</h5>
      <Button variant="danger" onClick={handleCloseModal}>
        Nazad
      </Button>
    </div>
  );
};

export default InWorkModal;
