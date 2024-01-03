import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import { ReactComponent as ActiveIncome } from '../../../Assets/Pictures/income.svg';
import { ReactComponent as ArchivedIncome } from '../../../Assets/Pictures/archived.svg';
import { ReactComponent as HomeIcon } from '../../../Assets/Pictures/home-icon.svg';

import classes from '../Main/MainPage.module.css';
import { NavLink } from 'react-router-dom';

const IncomesPage = () => {
  return (
    <PageWrapperComponent>
      <div className={classes.container}>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="aktivni-prihodi">
              <div>
                <ActiveIncome className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Aktivni prihodi</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/clanarine/arhiva-baza?redirectTo=incomes">
              <div>
                <ArchivedIncome className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Arhivirani prihodi</p>
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

export default IncomesPage;
