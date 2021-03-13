import React from 'react';
import { useGame } from 'contexts/game';

export const Summary = () => {
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
  players.sort(compare);

  const winner = players[0];
  const restOfPlayers = players.slice(1);

  return (
    <div className="w-full h-full flex flex-col items-center mt-10">
      <div className="p-10 w-120 bg-gray-200 flex text-gray-800 rounded-lg">
        <div className="w-36">
          <img src="/trophy.png" alt="The trophy of the winner" />
        </div>
        <div className="h-42 flex flex-col justify-end">
          <h3 className="uppercase tracking-wide text-yellow-700">
            1:st place
          </h3>
          <p className="font-bold text-3xl">{winner.name}</p>
          <p>{`${winner.score} points`}</p>
        </div>
      </div>
      {restOfPlayers.map((player, index) => {
        return (
          <div key={`player-${index}`} className="w-120 p-5 bg-gray-700 rounded-lg font-bold mt-2 flex justify-between">
            <span>{`${player.name} at ${index + 2} place`}</span>
            <span>{`${player.score} points`}</span>
          </div>
        );
      })}
    </div>
  );
};
