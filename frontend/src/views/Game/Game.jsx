import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { gameExists } from "services/database-service";
import { GameLayout, Round } from "components";
import { useGame } from "contexts/game";

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

export const Game = () => {
  const params = useParams();
  const pin = params.pin;
  const [gameFound, setGameFound] = useState(false);

  const {
    lobby,
    playing,
    end,
    players,
    setPLayers,
    openLobby,
    startGame,
    endGame,
    openPresentWordAndInput,
    openSelectExplaination,
    openPresentAnswer,
    openPresentScore,
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

      switch (eventPayload.state) {
        case gameStates.OPEN_LOBBY:
          openLobby();
          break;

        case gameStates.START_GAME:
          startGame();
          break;

        case gameStates.END_GAME:
          endGame();
          break;

        default:
          break;
      }
    } catch (error) {
      console.log("Could not parse JSON");
    }
  }

  useEffect(() => {
    checkIfGameExists();

    //TODO: make sure to give the context the right state from websocket on reload
  }, []);

  const renderFromGameState = () => {
    if (lobby) {
      return (
        <h1 onClick={startGame} className="text-white">
          Lobby
        </h1>
      );
    }
    if (playing) {
      return <Round />;
    }
    if (end) {
      return <h1 className="text-white">Färdigt</h1>;
    }
  };

  return <GameLayout>{renderFromGameState()}</GameLayout>;
};
