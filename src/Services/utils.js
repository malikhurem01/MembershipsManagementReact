const getToken = () => {
  return JSON.parse(localStorage.getItem("user_jwt"));
};

const getParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

const utils = { getToken, getParam };

module.exports = utils;
