import React from 'react';
import { useGame } from 'contexts/game';
import { Button } from 'components';

export const PresentScore = () => {
  const { players } = useGame();

  function compare(a, b) {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  }

  const handleClick = () => {
    //TODO: Post new word from db.
    //TODO: post change roundState to PRESENT_WORD
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-center mt-14 text-6xl font-semibold">
        Current score
      </h2>
      <div className="p-20 w-full">
        {players.sort(compare).map((player) => {
          return (
            <div className="w-full p-5 bg-gray-700 rounded-lg font-bold mb-2 flex justify-between">
              <span>{player.name}</span>
              <span>{`${player.score} points`}</span>
            </div>
          );
        })}
      </div>
      <div>
        <Button onClick={handleClick} label="Start new round" primary />
      </div>
    </div>
  );
};
