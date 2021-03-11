import React from 'react';
import { useGame } from 'contexts/game';

export const PresentScore = () => {
  const { players } = useGame();

  //TODO: Sort by score

  return (
    <div className="w-full">
      <h2 className="text-center mt-14 text-6xl font-semibold">
        Current score
      </h2>
      <div className="p-20">
        {players.map((player) => {
          return (
            <div className="w-full p-5 bg-gray-700 rounded-lg font-bold mb-2 flex justify-between">
              <span>{player.name}</span>
              <span>{`${player.score} points`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
