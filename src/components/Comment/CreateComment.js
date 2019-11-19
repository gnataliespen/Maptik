import React, { Fragment, useState, useContext } from "react";
import { Form, TextArea, Icon, Button, Image } from "semantic-ui-react";
import { useAlert } from "react-alert";

import Context from "../../state/Context";
import getImgUrl from "../../util/getImgUrl";

const initialComment = { image: null, text: "", preview: "" };

const CreateComment = ({ handleCreate, openModal }) => {
  const [comment, setComment] = useState(initialComment);
  const [loading, setLoading] = useState(false);

  const {
    state: { currentPin }
  } = useContext(Context);

  const alert = useAlert();

  const handleChange = async e => {
    const { name, value, files } = e.target;
    if (name === "media") {
      setComment({
        ...comment,
        image: files[0],
        preview: window.URL.createObjectURL(files[0])
      });
    } else {
      setComment({ ...comment, text: value });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    //Create pin obj
    const newPinObj = {
      text: comment.text,
      pinId: currentPin._id
    };
    try {
      //If the comment has an image upload to cloudinary and add url
      if (comment.image) {
        let url = await getImgUrl(comment.image);
        newPinObj.image = url;
      }
      //Passed down from WithSocket hoc, sends comment and pin info to backend where the pin is updated
      handleCreate(newPinObj);
      setComment(initialComment);
      alert.show("Posted comment", { type: "success" });
    } catch (err) {
      alert.show("Failed to post comment", { type: "error" });
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <Image
        src={comment.preview}
        rounded
        centered
        size="tiny"
        className="comment-img"
        onClick={openModal}
      />

      <Form
        loading={loading}
        onSubmit={e => handleSubmit(e)}
        className="comment-form"
      >
        <Form.Field
          name="comment"
          control={TextArea}
          placeholder="Add a comment..."
          onChange={handleChange}
          value={comment.text}
          required
        />
        <div className="comment-controls">
          <Button
            type="submit"
            className="close"
            aria-label="submit comment"
            disabled={!comment.text || !comment.text.trim()}
          >
            <Icon name="send" color="green" />
          </Button>
          <input
            name="media"
            accept="image/*"
            id="file-upload"
            type="file"
            onChange={handleChange}
          />
          <label htmlFor="file-upload">
            <div className="save-btn">
              <Icon name="file image outline" size="large" />
            </div>
          </label>
        </div>
      </Form>
    </Fragment>
  );
};
export default CreateComment;
