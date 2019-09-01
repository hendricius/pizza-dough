import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import Result from "./pages/Result";
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

let deferredPrompt;
const btnAdd = document.getElementById("pwa");

if (btnAdd) {
  window.addEventListener("beforeinstallprompt", e => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    btnAdd.style.display = "block";
  });

  btnAdd.addEventListener("click", e => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = "none";
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
}
