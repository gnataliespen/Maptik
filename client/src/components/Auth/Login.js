import React from "react";
import { GoogleLogin } from "react-google-login";
import api from "../../util/apiConnection";
import setAuthToken from "../../util/setAuthToken";

const Login = () => {
  const onSuccess = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    setAuthToken(idToken);
    try {
      let user = await api.get("/auth/google");
      console.log(user);
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response);
      }
    }
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
      onSuccess={onSuccess}
      isSignedIn={true}
    />
  );
};
export default Login;
