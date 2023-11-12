import axios from "axios";
import { routes, serverURL } from "../Data/serverRoutes";

const addMember = (token, member) => {
  return axios.post(`${serverURL}${routes.addNewMember}`, member, {
    headers: { Authorization: "Bearer " + token },
  });
};

const modifyMember = (token, member) => {
  return axios.patch(`${serverURL}${routes.modifyMember}`, member, {
    headers: { Authorization: "Bearer " + token },
  });
};

const filterMembers = (token, name, lastName, spreadsheetId) => {
  return axios.get(
    `${serverURL}${routes.filterMembers}?spreadsheetId=${spreadsheetId}&name=${name}&lastName=${lastName}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
};

const memberService = { addMember, modifyMember, filterMembers };

export default memberService;
