import React from "react";
import { Menu, Icon } from "semantic-ui-react";

import Login from "./Auth/Login";
const Header = () => {
  const user = false;
  return (
    <Menu id="menu" inverted>
      <Menu.Item header id="primary">
        <Icon name="map" size="large" />
        GeoPins
      </Menu.Item>
      {user ? (
        <>
          <Menu.Item header>
            <Icon name="sign out" size="large" />
            Log Out
          </Menu.Item>
        </>
      ) : (
        <Menu.Item id="login-item" header>
          <Login />
          <p id="login-body"> or leave an anonymous pin</p>
        </Menu.Item>
      )}
    </Menu>
  );
};
export default Header;
