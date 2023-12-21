import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = ({ routes }) => {
  return (
    <div className="row font-weight-bold">
      <div className="col">
        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
          <ol className="breadcrumb mb-0">
            <li>
              <Link to="/naslovna">Naslovna stranica</Link>
            </li>
            {routes.map(el => {
              return (
                <React.Fragment>
                  &nbsp;/&nbsp;
                  <li>
                    <Link to={el.route}>{el.name}</Link>
                  </li>
                </React.Fragment>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
