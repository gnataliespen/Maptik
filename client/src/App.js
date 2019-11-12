import React, { useContext, useReducer } from "react";

import Map from "./components/Layout/Map";
import Nav from "./components/Layout/Nav";
import Context from "./state/context";
import reducer from "./state/reducer";

import "./css/Style.css";

function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <Nav />
      <Map />
    </Context.Provider>
  );
}

export default App;
