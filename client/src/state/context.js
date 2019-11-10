import { createContext } from "react";

export default createContext({
  currentUser: null,
  isAuth: false,
  draft: null,
  pins: [],
  currentPin: null,
});
