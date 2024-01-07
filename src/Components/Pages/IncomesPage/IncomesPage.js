import PageWrapperComponent from '../../PageWrapper/PageWrapperComponent';
import { ReactComponent as ActiveIncome } from '../../../Assets/Pictures/income.svg';
import { ReactComponent as ArchivedIncome } from '../../../Assets/Pictures/archived.svg';
import { ReactComponent as HomeIcon } from '../../../Assets/Pictures/home-icon.svg';

import classes from '../Main/MainPage.module.css';
import { NavLink, useParams } from 'react-router-dom';

const IncomesPage = ({ supervisorView }) => {
  const { dzematId } = useParams();
  return (
    <PageWrapperComponent>
      <div className={classes.container}>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink
              to={
                supervisorView
                  ? `/pregled/lista/dzemata/prihodi/aktivni-prihodi/${dzematId}`
                  : 'aktivni-prihodi'
              }
            >
              <div>
                <ActiveIncome className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Aktivni prihodi</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink
              to={
                supervisorView
                  ? `/pregled/lista/dzemata/clanarine/arhiva-baza/${dzematId}?redirectTo=incomes`
                  : '/clanarine/arhiva-baza?redirectTo=incomes'
              }
            >
              {' '}
              <div>
                <ArchivedIncome className={classes.gridItemLogo} />
                <p className={classes.menuOptionText}>Arhivirani prihodi</p>
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
