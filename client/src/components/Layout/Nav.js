import React, { Fragment, useContext } from "react";
import { Menu, Icon, Image } from "semantic-ui-react";
import useMedia from "use-media";

import Context from "../../state/context";
import Logout from "../Auth/Logout";
import Login from "../Auth/Login";

const Nav = () => {
  const {
    state: { isAuth, currentUser }
  } = useContext(Context);

  //Check if user is on mobile
  const mobile = useMedia({ maxWidth: 775 }) ? { display: "none" } : null;

  return (
    <Menu id="menu" inverted>
      <Menu.Item header id="primary">
        <Icon name="map" size="large" color="yellow" />
        <h1>Maptic</h1>
      </Menu.Item>
      {isAuth ? (
        <Fragment>
          <Menu.Item header className="user">
            <Image avatar circular src={currentUser.picture} />{" "}
            <h2 style={mobile}>{currentUser.name}</h2>
          </Menu.Item>
          <Menu.Item position="right">
            <Logout />
          </Menu.Item>
        </Fragment>
      ) : (
        <Menu.Item header>
          <Login />
          <p className="login-body" style={mobile}>
            {" "}
            or leave an anonymous pin
          </p>
        </Menu.Item>
      )}
      <Menu.Item
        header
        className="instructions"
        position={isAuth ? null : "right"}
        style={mobile}
      >
        <Icon name="location arrow" color="yellow" />
        <p className="login-body"> Click on the map to get started</p>
      </Menu.Item>
    </Menu>
  );
};
export default Nav;
