import 'App.css';
import { ManagedGameContext } from 'contexts/game';
import 'main.css';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Game, Home, StartGame } from 'views';

function App() {
  return (
    <ManagedGameContext>
      <BrowserRouter>
        <ToastContainer />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/game/new' component={StartGame} />
          <Route exact path='/game/:pin' component={Game} />
        </Switch>
      </BrowserRouter>
    </ManagedGameContext>
  );
}

export default App;
