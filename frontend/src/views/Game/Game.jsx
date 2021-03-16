import axios from 'axios';
import { GameLayout, Lobby, Round, Summary } from 'components';
import { useGame } from 'contexts/game';
import { states } from 'lib/constants';
import { getRandomName } from 'lib/names';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gameExists } from 'services/database-service';
import { websocketBaseUrl } from 'services/urlConstants';
import { createStompClient } from 'services/websocketService';
import { toast } from 'react-toastify';


/**
 * The game class controlling the flow of the game components
 * @returns {JSX.Element}
 * @constructor
 */
export const Game = () => {
  const params = useParams();
  const pin = params.pin;
  const websocketEndpointUrl = `${websocketBaseUrl}/chat`;
  const subscribeToEndpoint = `/topic/messages/${pin}`;


  /**
   * Sends requests to backend to join a game
   */
  const joinGame = () => {
    const form = new FormData();
    form.append('name', getRandomName());
    axios
      .post(`/games/${pin}/join`, form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.response.data);
        history.push('/');
      });
  };

  /**
   * Sets the name of the player
   */
  const setCurrentPlayerName = () => {
    axios
      .get(`/games/${pin}/whoami`)
      .then((res) => {
        localStorage.setItem('playerName', res.data);
      })
      .catch((err) => {});
  };

  const connectedCallback = () => {
    joinGame();
    setCurrentPlayerName();
  };

  /**
   * Sets different variables depending on the message it receives
   * @param message
   */
  const messageCallback = (message) => {
    let game;
    try {
      game = JSON.parse(message.body);
      setCurrentStateEndTime(game.currentStateEndTime);
      setPlayers(game.players);
      setCurrentWord(game.word);
      setSelectedExplanations(game.selectedExplanations);
      setExplanations(game.explanations);
      setGlobalGameState(game.state);
    } catch (error) {
      console.log(error);
    }
  };

  const memoizedMessageCallback = useCallback(messageCallback, []);
  const memoizedConnectedCallback = useCallback(connectedCallback, []);

  const stompClient = useMemo(() => {
    createStompClient(
      websocketEndpointUrl,
      subscribeToEndpoint,
      memoizedMessageCallback,
      memoizedConnectedCallback
    );
  }, [
    websocketEndpointUrl,
    subscribeToEndpoint,
    memoizedMessageCallback,
    memoizedConnectedCallback,
  ]);

  const [gameFound, setGameFound] = useState(false);
  const history = useHistory();

  const {
    globalGameState,
    setGlobalGameState,
    setPlayers,
    setCurrentStateEndTime,
    setCurrentWord,
    setSelectedExplanations,
    setExplanations,
    setPin,
  } = useGame();

  const checkIfGameExists = async () => {
    if (await gameExists(pin)) {
      setGameFound(true);
      setPin(pin);
    } else {
      history.push('/');
    }
  };

  useEffect(() => {
    checkIfGameExists();
  }, []);


  /**
   * Changes view depending on the state
   */
  return (
    <GameLayout>
      {(() => {
        if (globalGameState === states.LOBBY) {
          return <Lobby />;
        } else if (globalGameState === states.END) {
          return <Summary />;
        } else {
          return <Round />;
        }
      })()}
    </GameLayout>
  );
};
