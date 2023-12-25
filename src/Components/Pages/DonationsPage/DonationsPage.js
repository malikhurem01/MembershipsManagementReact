import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import donation from '../../../Assets/Pictures/donation.svg';
import archived from '../../../Assets/Pictures/archived.svg';
import emailLogo from '../../../Assets/Pictures/emailLogo.svg';
import homeIcon from '../../../Assets/Pictures/home-icon.svg';

import classes from '../Main/MainPage.module.css';
import { NavLink } from 'react-router-dom';

const DonationsPage = () => {
  return (
    <PageWrapperComponent>
      <div className={classes.container}>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="aktivne-donacije">
              <div>
                <img src={donation} alt="stanje budžeta redovne članarine" />
                <p className={classes.menuOptionText}>Aktivne donacije</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/logout">
              <div>
                {' '}
                <img src={archived} alt="stanje budžeta donacije" />
                <p className={classes.menuOptionText}>Arhivirane donacije</p>
              </div>
            </NavLink>
          </div>
        </div>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="/email-zahvale">
              <div>
                {' '}
                <img src={emailLogo} alt="stanje budžeta donacije" />
                <p className={classes.menuOptionText}>E-mail zahvale</p>
              </div>
            </NavLink>
          </div>
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

export default DonationsPage;
