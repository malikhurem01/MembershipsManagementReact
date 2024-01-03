import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import { ReactComponent as ActiveDonation } from '../../../Assets/Pictures/donation.svg';
import { ReactComponent as ArchivedDonation } from '../../../Assets/Pictures/archived.svg';
import { ReactComponent as EmailLogo } from '../../../Assets/Pictures/emailLogo.svg';
import { ReactComponent as HomeIcon } from '../../../Assets/Pictures/home-icon.svg';

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
                <ActiveDonation className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Aktivne donacije</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/clanarine/arhiva-baza?redirectTo=donation">
              <div>
                <ArchivedDonation className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Arhivirane donacije</p>
              </div>
            </NavLink>
          </div>
        </div>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="/email-zahvale">
              <div>
                <EmailLogo className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>E-mail zahvale</p>
              </div>
            </NavLink>
          </div>
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

export default DonationsPage;
