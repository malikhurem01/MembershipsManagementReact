import { NavLink, useParams } from 'react-router-dom';

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

const MainPage = ({ supervisorView }) => {
  const { dzematId } = useParams();

  const { userDataState } = useContext(AuthContext);

  return (
    <PageWrapperComponent>
      <div className={classes.container}>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink
              to={
                supervisorView
                  ? `/pregled/lista/dzemata/clanarine/${dzematId}`
                  : '/clanarine'
              }
            >
              {' '}
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
            <NavLink
              to={
                supervisorView
                  ? `/pregled/lista/dzemata/troskovi/${dzematId}`
                  : '/troskovi'
              }
            >
              {' '}
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
            <NavLink
              to={
                supervisorView
                  ? `/pregled/lista/dzemata/donacije/${dzematId}`
                  : '/donacije'
              }
            >
              {' '}
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
            <NavLink
              to={
                supervisorView
                  ? `/pregled/lista/dzemata/prihodi/${dzematId}`
                  : '/prihodi'
              }
            >
              {' '}
              <div>
                <OtherIncome className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>
                  Pregled stanja budžeta
                  <br />- ostali prihodi -
                </p>
              </div>
            </NavLink>
          </div>
          {!supervisorView && (
            <div className={classes.gridItem}>
              <NavLink to={`/racun/${userDataState.id}`}>
                <div>
                  <AccountLogo className={classes.gridItemLogo} />
                  <p className={classes.menuOptionText}>Moj račun</p>
                </div>
              </NavLink>
            </div>
          )}
          <div className={classes.gridItem}>
            <NavLink to={supervisorView ? '/naslovna/glavni-imam' : '/logout'}>
              <div>
                <LogoutLogo className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>
                  {supervisorView ? 'Nazad' : 'Odjava'}
                </p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </PageWrapperComponent>
  );
};

export default MainPage;
