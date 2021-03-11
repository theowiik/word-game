import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { gameExists } from 'services/database-service';
import { GameLayout, Round, Lobby, Summary, Button } from 'components';
import { useGame } from 'contexts/game';
import { websocketBaseUrl } from 'services/urlConstants';
import { createStompClient } from 'services/websocketService';
import { getRandomName } from 'lib/names';


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

  const handleOnConnected = () => {
    joinGame()
  }


  const memoizedHandleMessage = useCallback(onMessageReceived, []);
  const memoizedHandleOnConnected = useCallback(handleOnConnected, []);

  const stompClient = useMemo(
    () =>
      createStompClient(
        websocketEndpointUrl,
        subscribeToEndpoint,
        memoizedHandleMessage,
        memoizedHandleOnConnected,
      ),
    [websocketEndpointUrl, subscribeToEndpoint, memoizedHandleMessage, memoizedHandleOnConnected]
  );


  

  const params = useParams();
  const pin = params.pin;
  const [gameFound, setGameFound] = useState(false);
  const history = useHistory()

  const {
    globalGameState,
    setGlobalGameState,
    setGlobalRoundState,
    setPlayers,
    setCurrentWord,
    setAnswers,
  } = useGame();

  const checkIfGameExists = async () => {
    if (await gameExists(pin)) {
      setGameFound(true);
    } else {
      history.push("/");
    }
  };

  function onMessageReceived(message) {
    let game;
    try {
      console.log('Attempting to parse: ');
      console.log(message.body);
      game = JSON.parse(message.body);
      console.log('RECIEVED GAMESTATE -----------')
      console.log(game.gameState)
      console.log(game)
      setGlobalGameState(game.gameState);
      setGlobalRoundState(game.roundState);

      
      setPlayers(game.players);
      //setCurrentWord(game.word);
      //setAnswers(game.answers);

    } catch (error) {
      console.log('Could not parse JSON');
    }
  }

  useEffect(() => {
    checkIfGameExists();

    //Test player
    setPlayers([{ name: 'Jesper', color: 'grass', score: 100 }]);

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
      {
        {
          LOBBY: <Lobby />,
          PLAYING: <Round />,
          END: <Summary />,
        }[globalGameState]
      }
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
    </GameLayout>
  );
};
