import "./App.css";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import Lobby from "./Lobby";
import Home from "./Home";
import PresentWord from "./PresentWord";
import GameSettings from "./GameSettings";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/lobby" component={Lobby} exact />
        <Route path="/present-word" component={PresentWord} exact/>
        <Route path="/game-settings" component={GameSettings} exact/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
