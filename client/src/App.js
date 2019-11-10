import React, { useContext, useReducer } from "react";

import Home from "./components/Layout/Home";
import Nav from "./components/Layout/Nav";
import Context from "./state/context";
import reducer from "./state/reducer";

import "./css/Style.css";

function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <Nav />
      <Home />
    </Context.Provider>
  );
}

export default App;
