import * as React from "react";
import "./App.css";
import {
  Route,
  HashRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";
import rootReducers from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";

import LoginComp from "./pages/login/login";
import HomeComp from "./components/Home/home";

const store = createStore(rootReducers, applyMiddleware(logger));
class App extends React.Component {
  public render() {
    var token: string = localStorage.getItem("token");
    var redirect = <Redirect to="/login" push></Redirect>;
    if (token !== null && token.length > 10) {
      <Redirect to="/app/dashboard" push></Redirect>
    }
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                redirect
              }
            />
            <Route path="/login" component={LoginComp}></Route>
            <Route path="/app" component={HomeComp}></Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
