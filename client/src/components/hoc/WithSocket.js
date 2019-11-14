import React, { useEffect, useContext } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";

import Context from "../../state/Context";
import { NEW_PIN, DELETE_PIN, UPDATE_PIN } from "../../state/types";
let socket;

const WithSocket = ({ Component }) => {
  const { dispatch } = useContext(Context);
  useEffect(() => {
    socket = io(":4000");
    //On pin change the backend will emit one of these events with the new pin data which is used to update state
    socket.on("new pin", data => {
      dispatch({ type: NEW_PIN, payload: data });
    });
    socket.on("deleted pin", data => {
      dispatch({
        type: DELETE_PIN,
        payload: data
      });
    });
    socket.on("updated pin", data => {
      dispatch({
        type: UPDATE_PIN,
        payload: data
      });
    });
  }, [dispatch]);

  const createPin = newPin => {
    //Add token so backend can verify author
    newPin.token = Cookies.get("token");
    socket.emit("create pin", newPin);
  };
  const deletePin = pinId => {
    //Add token so backend can verify author
    let token = Cookies.get("token");
    socket.emit("delete pin", { token, id: pinId });
  };
  const createComment = newComment => {
    //Add token so backend can verify author
    newComment.token = Cookies.get("token");
    socket.emit("create comment", newComment);
  };
  return (
    <Component
      createPin={createPin}
      deletePin={deletePin}
      createComment={createComment}
    />
  );
};

export default WithSocket;
