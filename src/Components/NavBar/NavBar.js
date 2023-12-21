import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ routes }) => {
  return (
    <div className="row font-weight-bold mt-3">
      <div className="col">
        <nav
          aria-label="breadcrumb"
          className="bg-light rounded-3 p-3"
          style={{ marginTop: '-16px ', marginBottom: '10px' }}
        >
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
