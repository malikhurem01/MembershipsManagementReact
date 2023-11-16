import axios from "axios";
import { routes, serverURL } from "../Data/serverRoutes";

const addPayment = (token, data) => {
  return axios.post(`${serverURL}${routes.addPayment}`, data, {
    headers: { Authorization: "Bearer " + token },
  });
};

const deletePayment = (token, data) => {
  return axios.post(`${serverURL}${routes.deletePayment}`, data, {
    headers: { Authorization: "Bearer " + token },
  });
};

const paymentService = { addPayment, deletePayment };

export default paymentService;
