import "./App.css";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import Page from "./Page";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" compontent={Home} />
        <Route path="/Page" component={Page} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
