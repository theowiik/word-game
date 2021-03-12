import axios from 'axios';
import { Button, GameLayout, Lobby, Summary, Round } from 'components';
import { useGame } from 'contexts/game';
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
const tempGameStatesList = ['LOBBY', 'PLAYING', 'END'];
var selectedRoundIndex = 0;
const tempRoundStatesList = [
  'PRESENT_WORD_INPUT_EXPLANATION',
  'SELECT_EXPLANATION',
  'PRESENT_ANSWER',
  'PRESENT_SCORE',
];

export const Game = () => {
  const websocketEndpointUrl = `${websocketBaseUrl}/chat`;
  const subscribeToEndpoint = '/topic/messages';

  const joinGame = () => {
    console.log(
      '---------------------------------- JDSSDSDAOINING GAME ----------------------'
    );

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

  const connectedCallback = () => {
    joinGame();
  };

  const messageCallback = (message) => {
    let game;
    try {
      console.log('Attempting to parse: ');
      console.log(message.body);
      game = JSON.parse(message.body);
      console.log('RECIEVED GAMESTATE -----------');
      console.log(game.state);
      console.log(game);
      setGlobalGameState(game.state);
      setPlayers(game.players);
      setCurrentWord(game.word);
      //setAnswers(game.answers);
    } catch (error) {
      console.log('Could not parse JSON');
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

  const params = useParams();
  const pin = params.pin;
  const [gameFound, setGameFound] = useState(false);
  const history = useHistory();

  const {
    globalGameState,
    setGlobalGameState,
    setGlobalRoundState,
    setPlayers,
    setCurrentWord,
    setAnswers,
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
    setAnswers(answers);
    //TODO: make sure to give the context the right state from websocket on reload
  }, []);

  return (
    <GameLayout>
      {(() => {
        if (globalGameState == 'LOBBY') {
          return <Lobby />;
        } else if (globalGameState == 'END') {
          return <Summary />;
        } else {
          return <Round />
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
      <Button
        onClick={() =>
          setGlobalRoundState(
            tempRoundStatesList[
              selectedRoundIndex++ % tempRoundStatesList.length
            ]
          )
        }
        label="Byt roundstate"
        secondary
      />
      <h1 className="text-3xl">Debug: Current state -> {globalGameState || 'null/undefined'}</h1>
    </GameLayout>
  );
};
