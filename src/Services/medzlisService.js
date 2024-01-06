import axios from 'axios';
import { routes, serverURL } from '../Data/serverRoutes';

const getMedzlisDzematList = (token, medzlisId) => {
  return axios.get(`${serverURL}${routes.dzematList}?medzlisId=${medzlisId}`, {
    headers: { Authorization: 'Bearer ' + token }
  });
};

const medzlisService = {
  getMedzlisDzematList
};

export default medzlisService;
