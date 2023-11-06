import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import InWorkModal from "./InWorkModal";

import mobitelIcon from "../../../Assets/Pictures/mobitel.png";
import laptopIcon from "../../../Assets/Pictures/laptop.png";

import classes from "./DeviceQuestionPage.module.css";

const DeviceQuestionPage = () => {
  const [inWork, setInWork] = useState(false);
  const navigate = useNavigate();

  const handleDeviceSelection = (device) => {
    if (device === "phone") {
      setInWork(true);
    } else if (device === "computer") {
      navigate("/login/dzemat");
    }
  };

  const handleCloseModal = () => {
    setInWork(false);
  };

  return (
    <React.Fragment>
      {inWork && <InWorkModal handleCloseModal={handleCloseModal} />}
      {!inWork && (
        <React.Fragment>
          <div className={classes.questionContainer}>
            <h3>Molimo odaberite vaš uređaj:</h3>
            <div
              className={classes.questionOptionContainer}
              onClick={() => handleDeviceSelection("phone")}
            >
              <h5>Mobilni uređaj</h5>
              <img src={mobitelIcon} alt="mobitel" />
            </div>
            <div
              className={classes.questionOptionContainer}
              onClick={() => handleDeviceSelection("computer")}
            >
              <h5>Računar/laptop</h5>
              <img src={laptopIcon} alt="računar" width={100} height={100} />
            </div>
          </div>
          <div>
            <Outlet />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DeviceQuestionPage;
