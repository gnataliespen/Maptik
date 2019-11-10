import React, { useContext } from "react";

import Context from "../../state/context";
import CreatePin from "../Pin/CreatePin";
import { Sidebar, Icon, Button } from "semantic-ui-react";
import PinContent from "../Pin/PinContent";
import { CLEAR_PIN, CLEAR_DRAFT } from "../../state/types";
const Blog = () => {
  const { state, dispatch } = useContext(Context);
  const { draft, currentPin, currentUser } = state;
  let visibility = !draft && !currentPin ? false : true;

  const clearPinState = () => {
    !draft && currentPin
      ? dispatch({ type: CLEAR_PIN })
      : dispatch({ type: CLEAR_DRAFT });
  };
  return (
    <Sidebar
      visible={visibility}
      id="blog"
      animation="overlay"
      direction="right"
      width="wide"
    >
      <div className="blog-btns">
        <Button className="close" onClick={clearPinState}>
          <Icon name="remove circle" />
        </Button>
        {currentUser &&
          currentPin &&
          currentPin.author &&
          currentUser._id === currentPin.author._id && (
            <Button color="red" className="delete">
              Delete Pin
            </Button>
          )}
      </div>

      {!draft && currentPin ? <PinContent /> : <CreatePin />}
    </Sidebar>
  );
};
export default Blog;
