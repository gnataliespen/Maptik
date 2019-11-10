import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import Context from "../../state/context";
import { LOGOUT } from "../../state/types";

const Logout = () => {
  const { dispatch } = useContext(Context);
  const onSignout = () => {
    dispatch({ type: LOGOUT });
  };
  return <GoogleLogout onLogoutSuccess={onSignout} buttonText="Signout" />;
};
export default Logout;
