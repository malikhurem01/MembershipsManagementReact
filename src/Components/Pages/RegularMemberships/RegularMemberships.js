import { NavLink, useParams } from 'react-router-dom';

import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';

import { ReactComponent as CreateDatabaseLogo } from '../../../Assets/Pictures/createDatabase.svg';
import { ReactComponent as ActiveDatabase } from '../../../Assets/Pictures/activeDatabase.svg';
import { ReactComponent as ArchivedDatabase } from '../../../Assets/Pictures/archivedDatabases.svg';
import { ReactComponent as DebtWarning } from '../../../Assets/Pictures/opomenaDug.svg';
import { ReactComponent as ReportLogo } from '../../../Assets/Pictures/izvjestaj.svg';
import { ReactComponent as HomeLogo } from '../../../Assets/Pictures/home-icon.svg';
import { ReactComponent as MembersLogo } from '../../../Assets/Pictures/membersLogo.svg';

import classes from '../Main/MainPage.module.css';

const RegularMemberships = ({ supervisorView }) => {
  const { dzematId } = useParams();
  return (
    <PageWrapperComponent removeShadow={true} returnArrow={true}>
      <div className={classes.container}>
        <div className={classes.gridRow}>
          {!supervisorView && (
            <div className={classes.gridItem}>
              <NavLink to="/clanarine/kreiraj-bazu">
                <div>
                  <CreateDatabaseLogo className={classes.gridItemLogo} />
                  <p className={classes.menuOptionText}>Kreiraj bazu</p>
                </div>
              </NavLink>
            </div>
          )}
          <div className={classes.gridItem}>
            <NavLink
              to={
                supervisorView
                  ? `/pregled/lista/dzemata/clanarine/aktivna-baza/${dzematId}`
                  : '/clanarine/aktivna-baza'
              }
            >
              {' '}
              <div>
                <ActiveDatabase className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Aktivna baza</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink
              to={
                supervisorView
                  ? `/pregled/lista/dzemata/clanarine/arhiva-baza/${dzematId}?redirectTo=spreadsheet`
                  : '/clanarine/arhiva-baza?redirectTo=spreadsheet'
              }
            >
              <div>
                <ArchivedDatabase className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Arhiva baza</p>
              </div>
            </NavLink>
          </div>
        </div>
        <div className={classes.gridRow}>
          {!supervisorView && (
            <div className={classes.gridItem}>
              <NavLink to="/clanarine/izradi-opomene">
                <div>
                  <DebtWarning className={classes.gridItemLogo} />
                  <p className={classes.menuOptionText}>Opomena za dug</p>
                </div>
              </NavLink>
            </div>
          )}
          <div className={classes.gridItem}>
            <NavLink
              to={
                supervisorView
                  ? `/pregled/lista/dzemata/clanarine/izradi-izvjestaj/${dzematId}`
                  : '/clanarine/izradi-izvjestaj'
              }
            >
              {' '}
              <div>
                <ReportLogo className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Izradi izvještaj</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink
              to={
                supervisorView
                  ? '/pregled/lista/dzemata/' + dzematId
                  : '/naslovna'
              }
            >
              <div>
                <MembersLogo className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>
                  {supervisorView ? 'Pregled članova' : 'Upravljanje članovima'}
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
                  ? '/pregled/lista/dzemata/' + dzematId
                  : '/naslovna'
              }
            >
              <div>
                <HomeLogo className={classes.gridItemLogo} />
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
