import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import api from "../../util/apiConnection";
import setAuthToken from "../../util/setAuthToken";
import Context from "../../state/context";
import { LOGIN_USER, LOGIN_FAIL, CLEAR_USER } from "../../state/types";

const Login = () => {
  const { dispatch } = useContext(Context);

  const onSuccess = async googleUser => {
    dispatch({ type: CLEAR_USER });
    const idToken = googleUser.getAuthResponse().id_token;
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
      isSignedIn={true}
    />
  );
};
export default Login;
