import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import Result from "./components/Result";
import MoreInfo from "./components/MoreInfo";
import Calculator from "./components/Calculator";

ReactDOM.render(
  <BrowserRouter>
    <div className="container">
      <Route exact path="/" component={Calculator} />
      <Route path="/info" component={MoreInfo} />
      <Route path="/result" component={Result} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
