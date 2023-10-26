const getToken = () => {
  return JSON.parse(localStorage.getItem("user_jwt"));
};

const utils = { getToken };

module.exports = utils;
