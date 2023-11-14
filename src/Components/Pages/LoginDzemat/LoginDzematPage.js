import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import userService from "../../../Services/userService";

import LoginFormComponent from "../LoginFormComponent/LoginFormComponent";
import AuthContext from "../../../Store/auth-context-api";

export const loader = () => {
  localStorage.removeItem("dzemat_id");
  return null;
};

export default function LoginDzematPage() {
  const { handleSetDzemat, handleSetResponse } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleFormSubmit = (username, password) => {
    handleSetResponse({ loading: true, success: false });
    userService
      .dzematLogin({ username, password })
      .then((res) => {
        localStorage.setItem("dzemat_id", JSON.stringify(res.data.data.id));
        handleSetResponse({ loading: "done", success: true });
        handleSetDzemat(res.data.data);
        navigate("/login/korisnik");
      })
      .catch((err) => {
        handleSetResponse({ loading: "done", success: false });
        if (err.code === "ERR_NETWORK") throw new Error(err);
      });
  };

  return (
    <LoginFormComponent onFormSubmit={handleFormSubmit} loginStage={"first"} />
  );
}
