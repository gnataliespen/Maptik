import React, { useContext, useReducer, lazy, Suspense } from "react";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Loader } from "semantic-ui-react";

import Nav from "./components/Layout/Nav";
import Context from "./state/context";
import reducer from "./state/reducer";

import "./css/Style.css";

const Map = lazy(() => import("./components/Layout/Map"));

const options = {
  timeout: 5000
};

function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <AlertProvider template={AlertTemplate} {...options}>
        <Nav />
        <Suspense fallback={<Loader active />}>
          <Map />
        </Suspense>
      </AlertProvider>
    </Context.Provider>
  );
}

export default App;
