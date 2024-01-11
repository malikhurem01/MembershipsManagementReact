import axios from 'axios';
import { routes, serverURL } from '../Data/serverRoutes';

const addMember = (token, member) => {
  return axios.post(`${serverURL}${routes.addNewMember}`, member, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const modifyMember = (token, member) => {
  return axios.patch(`${serverURL}${routes.modifyMember}`, member, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const filterMembers = (
  token,
  evNumber,
  firstName,
  lastName,
  fathersName,
  hasPayed,
  pageNumber,
  pageSize,
  spreadsheetId
) => {
  return axios.get(
    `${serverURL}${routes.filterMembers}?spreadsheetId=${spreadsheetId}&evNumber=${evNumber}&firstName=${firstName}&lastName=${lastName}&fathersName=${fathersName}&hasPayed=${hasPayed}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      headers: { Authorization: 'Bearer ' + token }
    }
  );
};

const addFamilyMember = (token, data) => {
  return axios.post(`${serverURL}${routes.addMemberFamily}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const deleteFamilyMember = (token, data) => {
  return axios.post(`${serverURL}${routes.deleteMemberFamily}`, data, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const getFamilyMembers = (token, memberId) => {
  return axios.get(
    `${serverURL}${routes.getMemberFamily}?memberId=${memberId}`,
    {
      headers: { Authorization: 'Bearer ' + token }
    }
  );
};

const memberService = {
  addMember,
  modifyMember,
  filterMembers,
  addFamilyMember,
  getFamilyMembers,
  deleteFamilyMember
};

export default memberService;
