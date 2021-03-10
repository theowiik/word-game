import React from "react";
import { useGame } from "contexts/game";

export const Round = () => {
  const {
    players,
    presentWordInputExplaination,
    selectExplaination,
    presentAnswer,
    presentScore,
  } = useGame();

  const renderFromRoundState = () => {
    if (presentWordInputExplaination) {
      return <h1>Present word and give explaination</h1>;
    }
    if (selectExplaination) {
      return <h1>Select an explaination</h1>;
    }
    if (presentAnswer) {
      return <h1>Present right answer</h1>;
    }
    if (presentScore) {
      return <h1>Present score</h1>;
    }
  };

  return (
    <div>
      {/** Display players to the left */}

      {/** Display corresponding view for current state */}
      {renderFromRoundState()}
    </div>
  );
};
