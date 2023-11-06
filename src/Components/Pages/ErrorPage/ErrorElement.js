import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);
  if (isRouteErrorResponse(error)) {
    return (
      <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="text-center">
          <h1 class="display-1 fw-bold">404</h1>
          <p class="fs-3">
            {" "}
            <span class="text-danger">Opps!</span> Stranica nije pronađena.
          </p>
          <p class="lead">
            Molimo vas pokušajte ponovo. Ukoliko se problem bude ponavljao,
            kontaktirajte podršku.
          </p>
          <a href="/logout" class="btn btn-primary">
            Nazad
          </a>
        </div>
      </div>
    );
  }
};

export default ErrorElement;
