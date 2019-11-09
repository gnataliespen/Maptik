import React from "react";
import { GoogleLogin } from "react-google-login";
const Login = () => {
  const onSuccess = googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    console.log(idToken);
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
