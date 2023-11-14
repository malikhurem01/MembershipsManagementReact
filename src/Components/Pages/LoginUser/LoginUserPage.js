import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import userService from "../../../Services/userService";

import LoginFormComponent from "../LoginFormComponent/LoginFormComponent";
import AuthContext from "../../../Store/auth-context-api";

const LoginUserPage = () => {
  const { handleSetResponse, temporaryDzemat } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleFormSubmit = (email, password) => {
    handleSetResponse({ loading: true, success: false });
    userService
      .supervisorLogin({ email, password, dzematId: temporaryDzemat.id })
      .then((res) => {
        localStorage.setItem("user_jwt", JSON.stringify(res.data.data.token));
        handleSetResponse({ loading: "done", success: true });
        window.location.replace("/naslovna");
      })
      .catch((err) => {
        handleSetResponse({ loading: "done", success: false });
        if (err.code === "ERR_NETWORK") throw new Error(err);
      });
  };

  useEffect(() => {
    if (!temporaryDzemat) {
      navigate("/login/dzemat");
    }
  }, [temporaryDzemat, navigate]);

  return (
    <LoginFormComponent onFormSubmit={handleFormSubmit} loginStage={"second"} />
  );
};

export default LoginUserPage;
