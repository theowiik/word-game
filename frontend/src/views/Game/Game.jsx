import axios from 'axios';
import { Button, GameLayout, Lobby, Round, Summary } from 'components';
import { useGame } from 'contexts/game';
import { states } from 'lib/constants';
import { getRandomName } from 'lib/names';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gameExists } from 'services/database-service';
import { websocketBaseUrl } from 'services/urlConstants';
import { createStompClient } from 'services/websocketService';

{
  /** Temp to trigger statechanges */
}
var selectedIndex = 0;
const tempGameStatesList = [
  'LOBBY',
  'PRESENT_WORD_INPUT_EXPLANATION',
  'SELECT_EXPLANATION',
  'PRESENT_ANSWER',
  'PRESENT_SCORE',
  'END',
];

export const Game = () => {
  const params = useParams();
  const pin = params.pin;
  const websocketEndpointUrl = `${websocketBaseUrl}/chat`;
  const subscribeToEndpoint = `/topic/messages/${pin}`;

  const joinGame = () => {
    const form = new FormData();
    form.append('name', getRandomName());
    axios
      .post(`/games/${pin}/join/`, form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const connectedCallback = () => {
    joinGame();
  };

  const messageCallback = (message) => {
    let game;
    try {
      game = JSON.parse(message.body);
      setGlobalGameState(game.state);
      setPlayers(game.players);
      setCurrentWord(game.word);
      setCorrectExplanation(game.correctAnswer);
      //setExplanations(game.answers);
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
    setCurrentProgress,
    setCurrentWord,
    setCorrectExplanation,
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

    //Test player
    setPlayers([
      { name: 'Jesper', color: 'grass', score: 100 },
      { name: 'Hentoo', color: 'grass', score: 10 },
      { name: 'Jonathan', color: 'grass', score: 300 },
    ]);

    //Test data
    const answers = [
      { answer: 'Theo e king' },
      { answer: 'Sudo e king' },
      { answer: 'Hentoo e king' },
      { answer: 'Jopsidop e king' },
      { answer: 'Behöver ett långt svar så att dehär får bli ett långt svar' },
      { answer: 'Behöver ett långt svar så att dehär får bli ett långt svar' },
    ];
    setExplanations(answers);
    //TODO: make sure to give the context the right state from websocket on reload
  }, []);

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
      <Button
        onClick={() =>
          setGlobalGameState(
            tempGameStatesList[selectedIndex++ % tempGameStatesList.length]
          )
        }
        label="Byt gamestate"
        secondary
      />
      <h1 className="text-3xl">
        Debug: Current state {globalGameState || 'null/undefined'}
      </h1>
    </GameLayout>
  );
};
