import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import { ReactComponent as ExpenseLogo } from '../../../Assets/Pictures/expense.svg';
import { ReactComponent as ArchivedLogo } from '../../../Assets/Pictures/archived.svg';
import { ReactComponent as HomeIcon } from '../../../Assets/Pictures/home-icon.svg';

import classes from '../Main/MainPage.module.css';
import { NavLink } from 'react-router-dom';

const ExpensesPage = () => {
  return (
    <PageWrapperComponent>
      <div className={classes.container}>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="aktivni-troskovi">
              <div>
                <ExpenseLogo className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Aktivni troškovi</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/clanarine/arhiva-baza?redirectTo=expenses">
              <div>
                <ArchivedLogo className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Arhivirani troškovi</p>
              </div>
            </NavLink>
          </div>
        </div>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="/naslovna">
              <div>
                <HomeIcon className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Naslovna stranica</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </PageWrapperComponent>
  );
};

export default ExpensesPage;
