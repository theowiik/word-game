import axios from 'axios';
import { Container, LobbyInfo, Navbar, UserTile } from 'components';
import { getRandomName } from 'lib/names';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gameExists } from 'services/database-service';
import { websocketBaseUrl } from 'services/urlConstants';
import { createStompClient } from 'services/websocketService';

export function Lobby({ name }) {
  const websocketEndpointUrl = `${websocketBaseUrl}/chat`;
  const subscribeToEndpoint = '/topic/messages';

  const handleMessage = (message) => {
    console.log('Recieved updated game state');

    const gameState = JSON.parse(message.body);

    if (Array.isArray(gameState.players)) {
      console.log(`New game state: ${gameState}`);
      setPlayers(gameState.players);
      setGame(gameState);
    } else {
      console.log('Game state is in a illegal form');
    }
  };

  const memoizedHandleMessage = useCallback(handleMessage, []);

  const stompClient = useMemo(
    () =>
      createStompClient(
        websocketEndpointUrl,
        subscribeToEndpoint,
        memoizedHandleMessage
      ),
    [websocketEndpointUrl, subscribeToEndpoint, memoizedHandleMessage]
  );

  const params = useParams();
  const pin = params.pin;
  const max = 10;
  const [players, setPlayers] = useState([]);
  const [gameFound, setGameFound] = useState(false);
  const history = useHistory();
  const colors = ['grass', 'peach'];
  const [game, setGame] = useState(null);

  const authorizeGame = async () => {
    if (await gameExists(pin)) {
      setGameFound(true);
    } else {
      history.push('/');
    }
  };

  const joinGame = () => {
    axios
      .post(`/games/${pin}/join/${getRandomName()}`, {})
      .then((res) => {
        console.log('Joined game');
        console.log(res);
      })
      .catch((err) => {
        console.log('Failed to join game');
        console.log(err);
      });
  };

  const startGame = () => {
    axios
      .post(`/games/${pin}/start`, {})
      .then((res) => {
        console.log('Started game');
        console.log(res);
      })
      .catch((err) => {
        console.log('Failed to start game');
        console.log(err);
      });
  };

  useEffect(() => {
    authorizeGame();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 dark:text-white">
      <Navbar label="Lobby" onBackClickPath="/" />
      <Container>
        <LobbyInfo lobbyPin={pin} max={max} current={players.length} />
        <p>{`Game exists: ${gameFound}`}</p>

        <p className="font-bold">Latest game state: {JSON.stringify(game)}</p>

        <div className="flex flex-wrap">
          {players.map((player, i) => {
            return (
              <div key={`player-${i}`}>
                <UserTile
                  name={player.name}
                  color={colors[i % colors.length]}
                />
              </div>
            );
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center mb-16 sm:mb-20 md:mb-32">
          <button onClick={joinGame} className="font-bold mr-5">
            Join Game
          </button>

          <br></br>

          <button onClick={startGame} className="font-bold">
            Start Game
          </button>
        </div>
      </Container>
    </div>
  );
}
