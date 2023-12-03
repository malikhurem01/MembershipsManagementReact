import React, { useContext, useEffect } from 'react';
import AuthContext from '../../Store/auth-context-api';

import { useNavigate } from 'react-router-dom';

import logoIZ from '../../Assets/Pictures/logoIZ.png';

import classes from './PageWrapperComponent.module.css';
import userService from '../../Services/userService';

const PageWrapperComponent = ({ returnArrow, children }) => {
  const navigate = useNavigate();

  const { userDataState, handleSetUser } = useContext(AuthContext);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user_jwt'));
    userService
      .currentUser(token)
      .then(res => {
        handleSetUser(res.data.data);
      })
      .catch(() => {
        window.location.replace('/login/dzemat');
      });
  }, [handleSetUser]);

  const handleSetDzematInfo = title => {
    if (!userDataState) {
      return navigate('/login/dzemat');
    } else {
      if (title === 'medzlis') {
        return userDataState.dzemat.medzlis.name;
      } else if (title === 'dzemat') {
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
                Medžlis islamske zajednice {`${handleSetDzematInfo('medzlis')}`}
                <br />
                {`Džemat ${handleSetDzematInfo('dzemat')}`}
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
