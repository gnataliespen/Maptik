import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { useAlert } from "react-alert";

import api from "../../util/apiConnection";
import setAuthToken from "../../util/setAuthToken";
import Context from "../../state/context";
import { LOGIN_USER, LOGIN_FAIL } from "../../state/types";

const Login = () => {
  const { dispatch } = useContext(Context);
  const alert = useAlert();

  const onSuccess = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    //Add token to req header
    setAuthToken(idToken);
    try {
      let user = await api.get("/auth/google");
      dispatch({ type: LOGIN_USER, payload: user.data });
      alert.show("Logged in", { type: "success" });
    } catch (err) {
      dispatch({ type: LOGIN_FAIL });
      return alert.show("Could not log in", { type: "error" });
    }
  };

  const onFailure = () => {
    alert.show("Google auth failed", { type: "error" });
    dispatch({ type: LOGIN_FAIL });
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      //If true will return GoogleUser object on load
      isSignedIn={true}
    />
  );
};
export default Login;
