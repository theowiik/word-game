import "App.css";
import "main.css";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { Home, Lobby, PresentWord, StartGame } from "views";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/lobby" component={Lobby} exact />
        <Route path="/present-word" component={PresentWord} exact />
        <Route path="/game-settings" component={StartGame} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
