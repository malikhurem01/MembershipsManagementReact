const getQueryParams = name => {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get(name);
  return param;
};

export default getQueryParams;
