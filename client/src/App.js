import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Splash from "./pages/Splash";
import Header from "./components/Header";
import "./css/Style.css";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Splash} />
      </Switch>
    </Router>
  );
}

export default App;
