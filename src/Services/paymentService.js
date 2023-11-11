import axios from "axios";
import { routes, serverURL } from "../Data/serverRoutes";

const addPayment = (token, data) => {
  return axios.post(`${serverURL}${routes.addPayment}`, data, {
    headers: { Authorization: "Bearer " + token },
  });
};

const deletePayment = (token, data) => {
  console.log(token);
  console.log(data);
  return axios.delete(`${serverURL}${routes.deletePayment}`, data, {
    headers: { Authorization: "Bearer " + token },
  });
};

const paymentService = { addPayment, deletePayment };

export default paymentService;
