import { useState } from "react";
import { useNavigate } from "react-router-dom";

import userService from "../../../Services/userService";

import LoginFormComponent from "../LoginFormComponent/LoginFormComponent";

export const loader = () => {
  localStorage.removeItem("dzemat_id");
  return null;
};

export default function LoginDzematPage() {
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleFormSubmit = (username, password) => {
    userService
      .dzematLogin({ username, password })
      .then((res) => {
        localStorage.setItem("dzemat_id", JSON.stringify(res.data.data.id));
        navigate("/login/korisnik");
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          throw new Error(err);
        } else {
          setError(true);
        }
      });
  };

  return (
    <LoginFormComponent
      onFormSubmit={handleFormSubmit}
      errorOccured={error}
      loginStage={"first"}
    />
  );
}
