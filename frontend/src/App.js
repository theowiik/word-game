import 'App.css';
import 'main.css';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Home, Game, StartGame } from 'views';
import { ManagedGameContext } from 'contexts/game';

function App() {
  return (
    <ManagedGameContext>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game/:pin" component={Game} />
          <Route exact path="/game-settings" component={StartGame} />
        </Switch>
      </BrowserRouter>
    </ManagedGameContext>
  );
}

export default App;
