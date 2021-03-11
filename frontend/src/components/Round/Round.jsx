import React from "react";
import { useGame } from "contexts/game";
import { PresentAnswers } from 'components'

export const Round = () => {
  const { players, globalRoundState } = useGame();

  return (
    <div>
      {/** Display players to the left */}
      {players.map((player) => {
        return <h1>{player.name}</h1>;
      })}
      {/** Display corresponding view for current state */}
      {
        {
          SELECT_EXPLANATION: <PresentAnswers />,
          PRESENT_WORD_INPUT_EXPLANATION: <PresentWord />,
          PRESENT_ANSWER: <h1>PRESENT_ANSWER</h1>,
          PRESENT_SCORE: <h1>PRESENT_SCORE</h1>,
        }[globalRoundState]
      }
    </div>
  );
};
