import React, { useState, useContext } from "react";
import { Form, Icon, Button, Image } from "semantic-ui-react";

import Context from "../../state/context";
import { CLEAR_DRAFT, CREATE_PIN } from "../../state/types";
import api from "../../util/apiConnection";
import getImgUrl from "../../util/getImgUrl";

const intialForm = {
  title: "",
  description: "",
  image: null,
  preview: ""
};

const CreatePin = () => {
  const [form, setForm] = useState(intialForm);
  const [loading, setLoading] = useState(false);

  const { dispatch, state } = useContext(Context);

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
    //If image upload to cloudinary and add url
    if (form.image) {
      try {
        const url = await getImgUrl(form.image);
        pinObj.image = url;
      } catch (err) {
        console.log(err);
      }
    }
    try {
      //Post pin and add it to state
      let newPin = await api.post("/pins/create", pinObj);
      setForm(intialForm);
      dispatch({ type: CREATE_PIN, payload: newPin.data });
    } catch (err) {
      console.log(err);
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
        <Image src={form.preview} rounded centered size="small" />
        <div style={{ width: "100%" }}>
          <Form.TextArea
            name="description"
            placeholder="Tell us about it..."
            onChange={handleChange}
            value={form.description}
          />
        </div>
        <div className="btns">
          <Button color="purple" onClick={clearDraft}>
            <Icon name="trash" size="small" /> Discard
          </Button>
          <Button
            type="submit"
            color="green"
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
