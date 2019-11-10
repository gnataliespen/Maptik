import api from "./apiConnection";
const setAuthToken = token => {
  api.defaults.headers.common["Content-Type"] = "application/json";
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete api.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
