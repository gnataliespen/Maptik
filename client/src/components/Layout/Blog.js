import React, { useContext } from "react";

import Context from "../../state/context";
import CreatePin from "../Pin/CreatePin";
import { Sidebar } from "semantic-ui-react";
const Blog = () => {
  const { state } = useContext(Context);
  let visibility = state.draft ? true : false;
  return (
    <Sidebar
      visible={visibility}
      id="blog"
      animation="overlay"
      direction="right"
      width="wide"
    >
      <CreatePin />
    </Sidebar>
  );
};
export default Blog;
