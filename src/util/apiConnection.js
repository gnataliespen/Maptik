import axios from "axios";
//Set base url to server
let url =
  process.env.NODE_ENV === "production"
    ? "https://maptik.herokuapp.com/"
    : "http://localhost:4000/";

export default axios.create({
  baseURL: url
});
