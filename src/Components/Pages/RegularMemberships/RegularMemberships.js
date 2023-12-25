import { NavLink } from 'react-router-dom';

import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';

import createDatabase from '../../../Assets/Pictures/createDatabase.svg';
import activeDatabase from '../../../Assets/Pictures/activeDatabase.svg';
import archivedDatabases from '../../../Assets/Pictures/archivedDatabases.svg';
import debtWarning from '../../../Assets/Pictures/opomenaDug.svg';
import reportLogo from '../../../Assets/Pictures/izvjestaj.svg';
import homeIcon from '../../../Assets/Pictures/home-icon.svg';

import classes from './RegularMemberships.module.css';

const RegularMemberships = () => {
  return (
    <PageWrapperComponent removeShadow={true} returnArrow={true}>
      <div className={classes.container}>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="/clanarine/kreiraj-bazu">
              <div>
                <img src={createDatabase} alt="kreiraj bazu" />
                <p className={classes.menuOptionText}>Kreiraj bazu</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/clanarine/aktivna-baza">
              <div>
                <img src={activeDatabase} alt="redovne članarine" />
                <p className={classes.menuOptionText}>Aktivna baza</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/clanarine/arhiva-baza?redirectTo=spreadsheet">
              <div>
                <img
                  src={archivedDatabases}
                  alt="stanje budžeta ostali prihodi"
                />
                <p className={classes.menuOptionText}>Arhiva baza</p>
              </div>
            </NavLink>
          </div>
        </div>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="/clanarine/izradi-opomene">
              <div>
                <img src={debtWarning} alt="Odjava" />
                <p className={classes.menuOptionText}>Opomena za dug</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/clanarine/izradi-izvjestaj">
              <div>
                <img src={reportLogo} alt="Odjava" />
                <p className={classes.menuOptionText}>Izradi izvještaj</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/naslovna">
              <div>
                <img src={homeIcon} alt="naslovna stranica" />
                <p className={classes.menuOptionText}>Naslovna stranica</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </PageWrapperComponent>
  );
};

export default RegularMemberships;
