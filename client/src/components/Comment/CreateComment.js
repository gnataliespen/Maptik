import React, { Fragment, useState, useContext } from "react";
import {
  Form,
  Divider,
  TextArea,
  Input,
  Segment,
  Icon,
  Button,
} from "semantic-ui-react";
import Context from "../../state/context";
import api from "../../util/apiConnection";
import { CREATE_COMMENT } from "../../state/types";

const CreateComment = () => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    dispatch,
    state: { currentPin },
  } = useContext(Context);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    let res = await api.put("/pins/comment", {
      comment,
      pinId: currentPin._id,
    });
    dispatch({ type: CREATE_COMMENT, payload: res.data });
    setComment("");
    setLoading(false);
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
      <Divider />
    </Fragment>
  );
};
export default CreateComment;
