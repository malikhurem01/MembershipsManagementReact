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
        window.location.replace('/login/korisnik');
      });
  }, [handleSetUser]);

  const handleSetInstitutionInfo = title => {
    if (!userDataState) {
      return navigate('/login/korisnik');
    } else {
      if (title === 'medzlis') {
        if (userDataState.position === 5) return userDataState.medzlis.name;
        else if (userDataState.position < 5 && userDataState.position > 0) {
          return userDataState.dzemat.medzlis.name;
        }
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
                Medžlis islamske zajednice{' '}
                {`${handleSetInstitutionInfo('medzlis')}`}
                {userDataState.position < 5 && (
                  <React.Fragment>
                    <br />
                    {`Džemat ${handleSetInstitutionInfo('dzemat')}`}
                  </React.Fragment>
                )}
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
