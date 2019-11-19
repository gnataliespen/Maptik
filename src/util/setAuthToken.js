import api from "./apiConnection";
import Cookies from "js-cookie";

const setAuthToken = () => {
  let token = Cookies.get("token");
  api.defaults.headers.common["Content-Type"] = "application/json";
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete api.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
