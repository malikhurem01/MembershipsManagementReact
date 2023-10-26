import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import userService from "../../../Services/userService";

import LoginFormComponent from "../LoginFormComponent/LoginFormComponent";

const LoginDzematPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleFormSubmit = (username, password) => {
    userService
      .dzematLogin({ username, password })
      .then((res) => {
        localStorage.setItem("dzemat_id", JSON.stringify(res.data.data.id));
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  useEffect(() => {
    localStorage.removeItem("dzemat_id");
  }, []);

  useEffect(() => {
    if (success) {
      navigate("/login/korisnik");
    }
  }, [navigate, success]);

  return (
    <LoginFormComponent
      onFormSubmit={handleFormSubmit}
      errorOccured={error}
      loginStage={"first"}
    />
  );
};

export default LoginDzematPage;
