import React, { useContext } from "react";

import Context from "../../state/context";
import CreatePin from "../Pin/CreatePin";
import { Sidebar, Icon, Button } from "semantic-ui-react";
import PinContent from "../Pin/PinContent";
import { CLEAR_PIN, CLEAR_DRAFT, DELETE_PIN } from "../../state/types";
import api from "../../util/apiConnection";

const Blog = () => {
  const { state, dispatch } = useContext(Context);
  const { draft, currentPin, currentUser } = state;
  let visibility = !draft && !currentPin ? false : true;

  const clearPinState = () => {
    !draft && currentPin
      ? dispatch({ type: CLEAR_PIN })
      : dispatch({ type: CLEAR_DRAFT });
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/pins/delete/${currentPin._id}`);
      dispatch({ type: DELETE_PIN, payload: currentPin._id });
    } catch (err) {
      console.log(err);
    }
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
            <Button color="red" className="delete" onClick={handleDelete}>
              Delete Pin
            </Button>
          )}
      </div>

      {!draft && currentPin ? <PinContent pin={currentPin} /> : <CreatePin />}
    </Sidebar>
  );
};
export default Blog;
