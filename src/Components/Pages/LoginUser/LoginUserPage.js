import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import userService from "../../../Services/userService";

import LoginFormComponent from "../LoginFormComponent/LoginFormComponent";

const LoginUserPage = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  let dzematId = JSON.parse(localStorage.getItem("dzemat_id"));

  const handleFormSubmit = (email, password) => {
    dzematId = JSON.parse(localStorage.getItem("dzemat_id"));
    userService
      .supervisorLogin({ email, password, dzematId })
      .then((res) => {
        localStorage.setItem("user_jwt", JSON.stringify(res.data.data.token));
        window.location.replace("/naslovna");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  useEffect(() => {
    if (!dzematId) {
      navigate("/login/dzemat");
    }
  }, [dzematId, navigate]);

  return (
    <LoginFormComponent
      onFormSubmit={handleFormSubmit}
      errorOccured={error}
      loginStage={"second"}
    />
  );
};

export default LoginUserPage;
