import axios from "axios";
//Set base url to server
let url =
  process.env.NODE_ENV === "production" ? null : "http://localhost:4000/";

export default axios.create({
  baseURL: url
});
