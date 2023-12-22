import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import activeDatabase from '../../../Assets/Pictures/activeDatabase.svg';
import archivedDatabases from '../../../Assets/Pictures/archivedDatabases.svg';
import homeIcon from '../../../Assets/Pictures/home-icon.svg';

import classes from '../Main/MainPage.module.css';
import { NavLink } from 'react-router-dom';

const ExpensesPage = () => {
  return (
    <PageWrapperComponent>
      <div className={classes.container}>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="aktivni-projekti">
              <div>
                <img
                  src={activeDatabase}
                  alt="stanje budžeta redovne članarine"
                />
                <p className={classes.menuOptionText}>Aktivni troškovi</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/logout">
              <div>
                {' '}
                <img src={archivedDatabases} alt="stanje budžeta donacije" />
                <p className={classes.menuOptionText}>Arhivirani troškovi</p>
              </div>
            </NavLink>
          </div>
        </div>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="/naslovna">
              <div>
                {' '}
                <img src={homeIcon} alt="stanje budžeta ostali prihodi" />
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
