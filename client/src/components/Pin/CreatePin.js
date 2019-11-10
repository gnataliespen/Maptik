import React, { useState, useContext } from "react";
import { Form, Icon, Button, Image } from "semantic-ui-react";
import Context from "../../state/context";
import { CLEAR_DRAFT } from "../../state/types";
import axios from "axios";

const intialForm = {
  title: "",
  description: "",
  image: null,
  preview: "",
};
const CreatePin = () => {
  const [form, setForm] = useState(intialForm);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(Context);

  const handleChange = event => {
    const { name, value, files } = event.target;
    if (name === "media") {
      setForm({
        ...form,
        preview: window.URL.createObjectURL(files[0]),
        image: files[0],
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const url = await getImgUrl(form.image);
    setLoading(false);
    console.log(url);
  };
  const handleDelete = () => {
    dispatch({ type: CLEAR_DRAFT });
    setForm(intialForm);
  };
  const getImgUrl = async file => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ecomProject");
    data.append("cloud_name", "gnatscloud");
    try {
      const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
      return res.data.url;
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.error.message);
      } else {
        console.log(err);
      }
    }
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
          <Button color="purple" onClick={handleDelete}>
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
