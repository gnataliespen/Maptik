import { createContext } from "react";

export default createContext({
  currentUser: null,
  isAuth: false,
  loading: true,
  draft: null,
});
