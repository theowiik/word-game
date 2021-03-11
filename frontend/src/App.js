import "App.css";
import "main.css";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { Home, Game, Lobby, PresentWord, StartGame, VotingScreen } from "views";
import { ManagedGameContext } from "contexts/game";

function App() {


  return (
    <ManagedGameContext>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game/:pin" component={Game} />
          <Route exact path="/lobby/:pin" component={Lobby} />
          <Route exact path="/present-word" component={PresentWord} />
          <Route exact path="/game-settings" component={StartGame} />
          <Route exact path="/voting-screen" component={VotingScreen} />
        </Switch>
      </BrowserRouter>
    </ManagedGameContext>
  );
}

export default App;
