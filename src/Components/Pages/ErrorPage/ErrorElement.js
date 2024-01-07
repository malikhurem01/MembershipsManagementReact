import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorElement = ({ type }) => {
  const error = useRouteError();
  console.log(error);
  if (type === 'unauthorized') {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">401</h1>
          <p className="fs-3">
            <span className="text-danger">!!!</span> Neovlašten pristup.
          </p>
          <p className="lead">
            Vaš korisnički nalog nema pristup ovom resursu. Podrška može biti
            obaviještena o ovome.
          </p>
          <a href="/logout" className="btn btn-primary">
            Nazad
          </a>
        </div>
      </div>
    );
  }
  if (isRouteErrorResponse(error)) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            <span className="text-danger">Opps!</span> Stranica nije pronađena.
          </p>
          <p className="lead">
            Molimo vas pokušajte ponovo. Ukoliko se problem bude ponavljao,
            kontaktirajte podršku.
          </p>
          <a href="/naslovna" className="btn btn-primary">
            Nazad
          </a>
        </div>
      </div>
    );
  }
};

export default ErrorElement;
