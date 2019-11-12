import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";

import api from "../../util/apiConnection";
import setAuthToken from "../../util/setAuthToken";
import Context from "../../state/context";
import { LOGIN_USER, LOGIN_FAIL } from "../../state/types";

const Login = () => {
  const { dispatch } = useContext(Context);

  const onSuccess = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    //add token to req header
    setAuthToken(idToken);
    try {
      let user = await api.get("/auth/google");
      dispatch({ type: LOGIN_USER, payload: user.data });
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response);
      }
      dispatch({ type: LOGIN_FAIL });
    }
  };

  const onFailure = () => {
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
