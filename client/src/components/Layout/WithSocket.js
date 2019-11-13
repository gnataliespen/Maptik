import React, { useEffect, lazy, Suspense } from "react";
import io from "socket.io-client";
import { Loader } from "semantic-ui-react";

const Map = lazy(() => import("./Map"));

const WithSocket = () => {
  useEffect(() => {
    let socket = io(":4000");
    //socket.emit("hello");
    //socket.on("whats up", () => console.log("nm"));
  }, []);
  return (
    <Suspense fallback={<Loader active />}>
      <Map />
    </Suspense>
  );
};

export default WithSocket;
