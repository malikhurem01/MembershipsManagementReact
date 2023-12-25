import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import income from '../../../Assets/Pictures/income.svg';
import archived from '../../../Assets/Pictures/archived.svg';
import homeIcon from '../../../Assets/Pictures/home-icon.svg';

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
                <img src={income} alt="stanje budžeta redovne članarine" />
                <p className={classes.menuOptionText}>Aktivni prihodi</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/clanarine/arhiva-baza?redirectTo=incomes">
              <div>
                {' '}
                <img src={archived} alt="stanje budžeta donacije" />
                <p className={classes.menuOptionText}>Arhivirani prihodi</p>
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

export default IncomesPage;
