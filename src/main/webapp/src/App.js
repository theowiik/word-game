import "App.css";
import "main.css";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { Home, Lobby, PresentWord, StartGame } from "views";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/lobby/:pin" component={Lobby}/>
        <Route exact path="/present-word" component={PresentWord}/>
        <Route exact path="/game-settings" component={StartGame}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
