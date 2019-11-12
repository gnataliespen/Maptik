import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";

import Context from "../../state/context";
import { LOGOUT } from "../../state/types";

const Logout = () => {
  const { dispatch } = useContext(Context);
  const onSignout = () => {
    dispatch({ type: LOGOUT });
  };
  const onFailure = () => {
    console.log("o shit");
  };
  return (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      onFailure={onFailure}
      buttonText="Signout"
    />
  );
};
export default Logout;
