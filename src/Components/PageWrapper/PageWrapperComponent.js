import React, { useContext, useEffect } from "react";
import AuthContext from "../../Store/auth-context-api";
import userService from "../../Services/userService";

import { useNavigate } from "react-router-dom";

import logoIZ from "../../Assets/Pictures/logoIZ.png";

import classes from "./PageWrapperComponent.module.css";

const PageWrapperComponent = ({ returnArrow, children }) => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  useEffect(() => {
    userService
      .currentUser(JSON.parse(localStorage.getItem("user_jwt")))
      .catch(() => {
        navigate("/login/dzemat");
      });
  }, [navigate]);

  const handleSetDzematInfo = (title) => {
    if (!ctx.userDataState.dzemat) {
      return navigate("/login/dzemat");
    } else {
      if (title === "medzlis") {
        return ctx.userDataState.dzemat.medzlis.name;
      } else if (title === "dzemat") {
        return ctx.userDataState.dzemat.name;
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
