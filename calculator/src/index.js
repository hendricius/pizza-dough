import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import Result from "./pages/Result";
import MoreInfo from "./pages/MoreInfo";
import Calculator from "./pages/Calculator";

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Route
      render={({ location }) => {
        return (
          <TransitionGroup className="container">
            <CSSTransition key={location.key} timeout={200} classNames="fade">
              <Switch location={location}>
                <Route exact path="/" component={Calculator} />
                <Route path="/info" component={MoreInfo} />
                <Route path="/result" component={Result} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        );
      }}
    />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
