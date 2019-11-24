import React, { useState, useContext } from "react";
import { Form, Icon, Button, Image } from "semantic-ui-react";
import { useAlert } from "react-alert";

import Context from "../../state/Context";
import { CLEAR_DRAFT } from "../../state/types";
import getImgUrl from "../../util/getImgUrl";

const intialForm = {
  title: "",
  description: "",
  image: null,
  preview: ""
};

const CreatePin = ({ handleCreate, openModal }) => {
  const [form, setForm] = useState(intialForm);
  const [loading, setLoading] = useState(false);

  const { dispatch, state } = useContext(Context);

  const alert = useAlert();

  const handleChange = event => {
    const { name, value, files } = event.target;
    if (name === "media") {
      setForm({
        ...form,
        preview: window.URL.createObjectURL(files[0]),
        image: files[0]
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    //Create pin object
    const pinObj = {
      title: form.title.trim(),
      description: form.description.trim(),
      longitude: state.draft.longitude,
      latitude: state.draft.latitude
    };
    try {
      //If image upload to cloudinary and add url
      if (form.image) {
        const url = await getImgUrl(form.image);
        pinObj.image = url;
      }

      //From hoc WithSocket, sends new pin obj to backend where its saved in db
      handleCreate(pinObj);

      setForm(intialForm);

      alert.show("Created pin", { type: "success" });
    } catch (err) {
      alert.show("Failed to create pin", { type: "error" });
    }
    setLoading(false);
  };

  const clearDraft = () => {
    dispatch({ type: CLEAR_DRAFT });
    setForm(intialForm);
  };

  return (
    <div className="form">
      <h2 style={{ color: "green" }}>
        <Icon name="location arrow" /> Pin location
      </h2>
      <Form loading={loading}>
        <div style={{ display: "flex" }}>
          <Form.Input
            name="title"
            placeholder="Whats it called?"
            onChange={handleChange}
            value={form.title}
          />
          <input
            name="media"
            accept="image/*"
            id="file-upload"
            type="file"
            onChange={handleChange}
          />
          <label htmlFor="file-upload">
            <div className="save-btn">
              <Icon name="image" size="large" />
            </div>
          </label>
        </div>
        <Image
          src={form.preview}
          rounded
          centered
          size="small"
          onClick={openModal}
        />
        <div style={{ width: "100%" }}>
          <Form.TextArea
            name="description"
            placeholder="Tell us about it..."
            onChange={handleChange}
            value={form.description}
          />
        </div>
        <div className="btns">
          <Button className="discard-btn" onClick={clearDraft}>
            <Icon name="trash" size="small" /> Discard
          </Button>
          <Button
            type="submit"
            className="create-btn"
            onClick={handleSubmit}
            disabled={!form.title.trim()}
          >
            <Icon name="save" size="small" /> Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default CreatePin;
