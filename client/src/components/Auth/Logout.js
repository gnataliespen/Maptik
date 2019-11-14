import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { useAlert } from "react-alert";
import Cookies from "js-cookie";

import setAuthToken from "../../util/setAuthToken";
import Context from "../../state/Context";
import { LOGOUT } from "../../state/types";

const Logout = () => {
  const { dispatch } = useContext(Context);
  const alert = useAlert();

  const onSignout = () => {
    Cookies.remove("token");
    //This will remove token from req headers
    setAuthToken();
    dispatch({ type: LOGOUT });
    alert.show("Logged out", { type: "success" });
  };
  const onFailure = () => {
    alert.show("Could not log out", { type: "error" });
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
