import React from "react";
import { useGame } from "contexts/game";

export const Round = () => {
  const { players, globalRoundState } = useGame();

  return (
    <div>
      {/** Display players to the left */}
        {players.map(player => {
            return (<h1>{player.name}</h1>)
        })}
      {/** Display corresponding view for current state */}
      {
        {
          PRESENT_WORD_INPUT_EXPLANATION: <h1>PRESENT_WORD_INPUT_EXPLANATION</h1>,
          SELECT_EXPLANATION: <h1>SELECT_EXPLANATION</h1>,
          PRESENT_ANSWER: <h1>PRESENT_ANSWER</h1>,
          PRESENT_SCORE: <h1>PRESENT_SCORE</h1>,
        }[globalRoundState]
      }
    </div>
  );
};
