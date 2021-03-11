import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gameExists } from "services/database-service";
import { GameLayout, Round, Lobby } from "components";
import { useGame } from "contexts/game";
import { Button } from "components/Button/Button";

const gameStates = {
  OPEN_LOBBY: "OPEN_LOBBY",
  START_GAME: "START_GAME",
  END_GAME: "END_GAME",
};

const roundStates = {
  PRESENT_WORD_INPUT_EXPLANATION: "PRESENT_WORD_INPUT_EXPLANATION",
  SELECT_EXPLANATION: "SELECT_EXPLANATION",
  PRESENT_ANSWER: "PRESENT_ANSWER",
  PRESENT_SCORE: "PRESENT_SCORE",
};

{/** Temp to trigger statechanges */}
var selectedIndex = 0;
const tempGameStatesList = ["OPEN_LOBBY", "START_GAME", "END_GAME"]
var selectedRoundIndex = 0;
const tempRoundStatesList = ["PRESENT_WORD_INPUT_EXPLANATION", "SELECT_EXPLANATION", "PRESENT_ANSWER","PRESENT_SCORE",]


export const Game = () => {
  const params = useParams();
  const pin = params.pin;
  const [gameFound, setGameFound] = useState(false);

  const {
    globalGameState,
    setGlobalGameState,
    setGlobalRoundState,
    setPlayers,
    setCurrentWord,
    setAnswers
  } = useGame();


  const checkIfGameExists = async () => {
    if (await gameExists(pin)) {
      setGameFound(true);
    } else {
      //history.push("/");
    }
  };

  function onMessageReceived(event) {
    let eventPayload;
    try {
      console.log("Attempting to parse: ");
      console.log(event.data);
      eventPayload = JSON.parse(event.data);
      
      setGlobalGameState(eventPayload.gameState);
      setGlobalRoundState(eventPayload.roundState);

      const game = eventPayload.game;
      setPlayers(game.players)
      setCurrentWord(game.word)
      setAnswers(game.answers)
      
    
    } catch (error) {
      console.log("Could not parse JSON");
    }
  }

  useEffect(() => {
    checkIfGameExists();

    //Test player
    setPlayers([{name: "Jesper", color: "grass", score: 100}])

    //Test data
    const answers = [
      { answer: 'Theo e king' },
      { answer: 'Sudo e king' },
      { answer: 'Hentoo e king'},
      { answer: 'Jopsidop e king' },
      { answer: 'Behöver ett långt svar så att dehär får bli ett långt svar' },
      { answer: 'Behöver ett långt svar så att dehär får bli ett långt svar' },
    ];
    setAnswers(answers)
    //TODO: make sure to give the context the right state from websocket on reload
  }, []);

  return (
    <GameLayout>
      {
        {
          OPEN_LOBBY: <Lobby />,
          START_GAME: <Round />,
          END_GAME: <h1>Game ended</h1>,
        }[globalGameState]
      }
      <Button onClick={() => setGlobalGameState(tempGameStatesList[selectedIndex++ % tempGameStatesList.length])} label='Byt gamestate' secondary />
      <Button onClick={() => setGlobalRoundState(tempRoundStatesList[selectedRoundIndex++ % tempRoundStatesList.length])} label='Byt roundstate' secondary />
    </GameLayout>
  );
};
