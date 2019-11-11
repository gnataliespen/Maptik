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

const CreateComment = () => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    state: { currentPin },
  } = useContext(Context);
  const handleSubmit = async event => {
    event.preventDefault();
    console.log(currentPin._id);
    setLoading(true);
    await api.put("/pins/comment", { comment, pinId: currentPin._id });
    setComment("");
    setLoading(false);
    console.log(comment);
  };
  return (
    <Fragment>
      <Segment>
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
            required
          />
          <Button type="submit" className="close" disabled={!comment.trim()}>
            <Icon name="send" color="green" />
          </Button>
        </Form>
      </Segment>
      <Divider />
    </Fragment>
  );
};
export default CreateComment;
