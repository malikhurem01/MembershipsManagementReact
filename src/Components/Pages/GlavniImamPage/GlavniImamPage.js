import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import { ReactComponent as ListLogo } from '../../../Assets/Pictures/listLogo.svg';
import { ReactComponent as ReportLogo } from '../../../Assets/Pictures/izvjestaj.svg';
import { ReactComponent as AktuelnostiLogo } from '../../../Assets/Pictures/aktuelnostiLogo.svg';
import { ReactComponent as AccountLogo } from '../../../Assets/Pictures/accountLogo.svg';
import { ReactComponent as LogoutLogo } from '../../../Assets/Pictures/odjavaLogo.svg';

import classes from '../Main/MainPage.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from '../../../Store/auth-context-api';

const GlavniImamPage = () => {
  const { userDataState } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userDataState.position !== 5) {
      return navigate('/logout');
    }
  }, [userDataState.position, navigate]);
  return (
    <PageWrapperComponent>
      <div className={classes.container}>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="/pregled/lista/dzemata">
              <div>
                <ListLogo className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Popis džemata medžlisa</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/clanarine/arhiva-baza?redirectTo=donation">
              <div>
                <ReportLogo className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Izrada izvještaja</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/email-zahvale">
              <div>
                <AktuelnostiLogo className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Aktuelnosti</p>
              </div>
            </NavLink>
          </div>
        </div>
        <div className={classes.gridRow}></div>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to={`/racun/${userDataState.id}`}>
              <div>
                <AccountLogo className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Moj račun</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/logout">
              <div>
                <LogoutLogo className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Odjava</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </PageWrapperComponent>
  );
};

export default GlavniImamPage;
