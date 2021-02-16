import "./App.css";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import Lobby from "./Lobby";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/lobby" component={Lobby} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
