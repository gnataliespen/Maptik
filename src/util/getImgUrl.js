import axios from "axios";

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

export default getImgUrl;
