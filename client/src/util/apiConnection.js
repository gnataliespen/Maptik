import axios from "axios";

let url =
  process.env.NODE_ENV === "production" ? null : "http://localhost:4000/";

export default axios.create({
  baseURL: url,
});
