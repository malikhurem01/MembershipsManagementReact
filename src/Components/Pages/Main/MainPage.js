import { NavLink } from 'react-router-dom';

import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';

import { ReactComponent as BudgetBalance } from '../../../Assets/Pictures/stanjeBudzeta.svg';
import { ReactComponent as DonationsLogo } from '../../../Assets/Pictures/stanjeBudzetaDonacije.svg';
import { ReactComponent as OtherIncome } from '../../../Assets/Pictures/stanjeBudzetaOstaliPrihodi.svg';
import { ReactComponent as AccountLogo } from '../../../Assets/Pictures/accountLogo.svg';
import { ReactComponent as ExpensesLogo } from '../../../Assets/Pictures/expensesLogo.svg';
import { ReactComponent as LogoutLogo } from '../../../Assets/Pictures/odjavaLogo.svg';

import classes from './MainPage.module.css';
import { useContext } from 'react';
import AuthContext from '../../../Store/auth-context-api';

const MainPage = () => {
  const { userDataState } = useContext(AuthContext);
  return (
    <PageWrapperComponent>
      <div className={classes.container}>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="/clanarine">
              <div>
                <BudgetBalance className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>
                  Pregled stanja budžeta
                  <br />- redovne članarine -
                </p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/troskovi">
              <div>
                <ExpensesLogo className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>
                  Pregled stanja budžeta
                  <br />- troškovi -
                </p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/donacije">
              <div>
                <DonationsLogo className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>
                  Pregled stanja budžeta
                  <br />- donacije -
                </p>
              </div>
            </NavLink>
          </div>
        </div>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="/prihodi">
              <div>
                <OtherIncome className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>
                  Pregled stanja budžeta
                  <br />- ostali prihodi -
                </p>
              </div>
            </NavLink>
          </div>
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

export default MainPage;
