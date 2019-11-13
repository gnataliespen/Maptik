import React, { Fragment, useState, useContext } from "react";
import { Form, TextArea, Icon, Button } from "semantic-ui-react";
import { useAlert } from "react-alert";

import Context from "../../state/context";
import api from "../../util/apiConnection";
import { CREATE_COMMENT } from "../../state/types";

const CreateComment = () => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    dispatch,
    state: { currentPin }
  } = useContext(Context);

  const alert = useAlert();

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    let updatedPin = await api.put("/pins/comment", {
      comment,
      pinId: currentPin._id
    });
    dispatch({ type: CREATE_COMMENT, payload: updatedPin.data });
    setComment("");
    setLoading(false);
    alert.show("Posted comment", { type: "success" });
  };

  return (
    <Fragment>
      <Form
        loading={loading}
        onSubmit={e => handleSubmit(e)}
        className="comment-form"
      >
        <Form.Field
          name="comment"
          control={TextArea}
          placeholder="Add a comment..."
          onChange={e => setComment(e.target.value)}
          value={comment}
          required
        />
        <Button type="submit" className="close" disabled={!comment.trim()}>
          <Icon name="send" color="green" />
        </Button>
      </Form>
    </Fragment>
  );
};
export default CreateComment;
