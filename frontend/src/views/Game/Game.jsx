import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { gameExists } from "services/database-service";
import { GameLayout, Round, Lobby } from "components";
import { useGame } from "contexts/game";
import { Button } from "components/Button/Button";

const gameStates = {
  OPEN_LOBBY: "OPEN_LOBBY",
  START_GAME: "START_GAME",
  END_GAME: "END_GAME",
};

var selectedIndex = 0;
const tempGameStatesList = ["OPEN_LOBBY", "START_GAME", "END_GAME"]
var selectedRoundIndex = 0;
const tempRoundStatesList = ["PRESENT_WORD_INPUT_EXPLANATION", "SELECT_EXPLANATION", "PRESENT_ANSWER","PRESENT_SCORE",]

const roundStates = {
  PRESENT_WORD_INPUT_EXPLANATION: "PRESENT_WORD_INPUT_EXPLANATION",
  SELECT_EXPLANATION: "SELECT_EXPLANATION",
  PRESENT_ANSWER: "PRESENT_ANSWER",
  PRESENT_SCORE: "PRESENT_SCORE",
};

export const Game = () => {
  const params = useParams();
  const pin = params.pin;
  const [gameFound, setGameFound] = useState(false);

  const {
    globalGameState,
    setGlobalGameState,
    setGlobalRoundState,
    players,
    setPlayers,
  } = useGame();

  const history = useHistory();

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
      const currentState = eventPayload.state;
      setGlobalGameState(currentState);
    } catch (error) {
      console.log("Could not parse JSON");
    }
  }

  useEffect(() => {
    checkIfGameExists();
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
