import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import Context from "../../state/context";
import { LOGOUT } from "../../state/types";
import setAuthToken from "../../util/setAuthToken";

const Logout = () => {
  const { dispatch } = useContext(Context);
  const onSignout = () => {
    dispatch({ type: LOGOUT });
    setAuthToken(null);
  };
  return <GoogleLogout onLogoutSuccess={onSignout} buttonText="Signout" />;
};
export default Logout;
