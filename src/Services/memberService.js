import axios from "axios";
import { routes, serverURL } from "../Data/serverRoutes";

const addMember = (token, member) => {
  return axios.post(`${serverURL}${routes.addNewMember}`, member, {
    headers: { Authorization: "Bearer " + token },
  });
};

const getMembers = () => {
  return JSON.parse(localStorage.getItem("clanovi"));
};

const memberService = { addMember, getMembers };

export default memberService;
