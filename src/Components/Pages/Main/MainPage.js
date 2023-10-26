import { NavLink } from "react-router-dom";

import PageWrapperComponent from "../../PageWrapper/PageWrapperComponent";

import budgetBalance from "../../../Assets/Pictures/stanjeBudzeta.svg";
import budgetBalanceDonations from "../../../Assets/Pictures/stanjeBudzetaDonacije.svg";
import budgetBalanceOtherIncome from "../../../Assets/Pictures/stanjeBudzetaOstaliPrihodi.svg";
import accountLogo from "../../../Assets/Pictures/accountLogo.svg";
import expensesLogo from "../../../Assets/Pictures/expensesLogo.svg";
import odjavaLogo from "../../../Assets/Pictures/odjavaLogo.svg";

import classes from "./MainPage.module.css";

const MainPage = () => {
  return (
    <PageWrapperComponent>
      <div className={classes.container}>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="/clanarine">
              <div>
                {" "}
                <img
                  src={budgetBalance}
                  alt="stanje budžeta redovne članarine"
                />
                <p className={classes.menuOptionText}>
                  Pregled stanja budžeta
                  <br />- redovne članarine -
                </p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/logout">
              <div>
                {" "}
                <img
                  src={budgetBalanceDonations}
                  alt="stanje budžeta donacije"
                />
                <p className={classes.menuOptionText}>
                  Pregled stanja budžeta
                  <br />- donacije -
                </p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/logout">
              <div>
                {" "}
                <img
                  src={budgetBalanceOtherIncome}
                  alt="stanje budžeta ostali prihodi"
                />
                <p className={classes.menuOptionText}>
                  Pregled stanja budžeta
                  <br />- ostali prihodi -
                </p>
              </div>
            </NavLink>
          </div>
        </div>
        <div className={classes.gridRow}>
          <div className={classes.gridItem}>
            <NavLink to="/logout">
              <div>
                {" "}
                <img src={expensesLogo} alt="Odjava" />
                <p className={classes.menuOptionText}>
                  Pregled stanja budžeta
                  <br />- troškovi -
                </p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/logout">
              <div>
                {" "}
                <img src={accountLogo} alt="Odjava" />
                <p className={classes.menuOptionText}>Moj račun</p>
              </div>
            </NavLink>
          </div>
          <div className={classes.gridItem}>
            <NavLink to="/logout">
              <div>
                {" "}
                <img src={odjavaLogo} alt="Odjava" />
                <p className={classes.menuOptionText}>Odjava</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </PageWrapperComponent>
  );
};

export default MainPage;
