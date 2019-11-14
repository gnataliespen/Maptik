import React, { useContext } from "react";
import useMedia from "use-media";
import { useAlert } from "react-alert";

import Context from "../../state/Context";
import CreatePin from "../Pin/CreatePin";
import { Sidebar, Icon, Button } from "semantic-ui-react";
import PinContent from "../Pin/PinContent";
import { CLEAR_PIN, CLEAR_DRAFT } from "../../state/types";
import WithModal from "../hoc/WithModal";

const Blog = ({ createPin, deletePin, createComment, deleteComment }) => {
  const { state, dispatch } = useContext(Context);
  const { draft, currentPin, currentUser } = state;
  const alert = useAlert();

  //Change side bar to be on top for mobile users
  const mobile = useMedia({ maxWidth: 650 }) ? "top" : "right";

  //Blog content should only show if a pin is selected
  let visibility = !draft && !currentPin ? false : true;

  const clearPinState = () => {
    //Check which state to clear
    !draft && currentPin
      ? dispatch({ type: CLEAR_PIN })
      : dispatch({ type: CLEAR_DRAFT });
  };

  const handleDelete = async () => {
    //Passed down from WithSocket hoc, sends pin id to backend where the pin is deleted
    deletePin(currentPin._id);
    alert.show("Deleted pin", { type: "success" });
  };

  return (
    <Sidebar
      visible={visibility}
      id="blog"
      animation="overlay"
      direction={mobile}
      width="wide"
    >
      <div className="blog-btns">
        <Button
          className="close"
          aria-label="Close pin view"
          onClick={clearPinState}
        >
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

      {!draft && currentPin ? (
        <WithModal
          pin={currentPin}
          createComment={createComment}
          deleteComment={deleteComment}
          Component={PinContent}
        />
      ) : (
        <WithModal handleCreate={createPin} Component={CreatePin} />
      )}
    </Sidebar>
  );
};
export default Blog;
