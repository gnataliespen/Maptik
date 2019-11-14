import React, { useEffect } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";

let socket;

const WithSocket = ({ Component }) => {
  useEffect(() => {
    socket = io(":4000");
    socket.on("new pin", data => console.log(data));
    socket.on("deleted pin", data => console.log(data));
    socket.on("updated pin", data => console.log(data));
  }, []);

  const createPin = newPin => {
    newPin.token = Cookies.get("token");
    socket.emit("create pin", newPin);
  };
  const deletePin = pinId => {
    let token = Cookies.get("token");
    socket.emit("delete pin", { token, id: pinId });
  };
  const createComment = newComment => {
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
