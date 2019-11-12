import React, { Fragment, useContext } from "react";
import { Menu, Icon, Image } from "semantic-ui-react";

import Context from "../../state/context";
import Logout from "../Auth/Logout";
import Login from "../Auth/Login";

const Nav = () => {
  const {
    state: { isAuth, currentUser }
  } = useContext(Context);

  return (
    <Menu id="menu" inverted>
      <Menu.Item header id="primary">
        <Icon name="map" size="large" color="yellow" />
        Maptic
      </Menu.Item>
      {isAuth ? (
        <Fragment>
          <Menu.Item header>
            <Image avatar circular src={currentUser.picture} />{" "}
            {currentUser.name}
          </Menu.Item>
          <Menu.Item>
            <Logout />
          </Menu.Item>
        </Fragment>
      ) : (
        <Menu.Item header>
          <Login />
          <p className="login-body"> or leave an anonymous pin</p>
        </Menu.Item>
      )}
      <Menu.Item header className="instructions" position="right">
        <Icon name="location arrow" color="yellow" />
        <p className="login-body"> Click on the map to get started</p>
      </Menu.Item>
    </Menu>
  );
};
export default Nav;
