import React, { useContext } from "react";
import AuthContext from "../../Store/auth-context-api";

import { useNavigate } from "react-router-dom";

import logoIZ from "../../Assets/Pictures/logoIZ.png";

import classes from "./PageWrapperComponent.module.css";

const PageWrapperComponent = ({ returnArrow, children }) => {
  const navigate = useNavigate();

  const { userDataState } = useContext(AuthContext);

  const handleSetDzematInfo = (title) => {
    if (!userDataState) {
      return navigate("/login/dzemat");
    } else {
      if (title === "medzlis") {
        return userDataState.dzemat.medzlis.name;
      } else if (title === "dzemat") {
        return userDataState.dzemat.name;
      }
    }
  };
  /*
  {returnArrow && (
      <div className={classes.backArrow}>
        <NavLink to="/naslovna">
           <img src={leftArrow} alt="strelica nazad" />
              </NavLink>
            </div>
          )} */
  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.titleContainer}>
            <img src={logoIZ} alt="logo islamske zajednice" />
            <div className={classes.titleText}>
              <p>
                <span className={classes.titleTextBold}>
                  Program za praćenje i upravljanje budžetom
                </span>
                <br />
                Medžlis islamske zajednice {`${handleSetDzematInfo("medzlis")}`}
                <br />
                {`Džemat ${handleSetDzematInfo("dzemat")}`}
              </p>
            </div>
          </div>
        </div>
      </header>
      {children}
    </React.Fragment>
  );
};

export default PageWrapperComponent;
