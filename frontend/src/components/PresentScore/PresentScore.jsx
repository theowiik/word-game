import React, { useEffect, useState } from 'react';
import { useGame } from 'contexts/game';

export const PresentScore = () => {
  const { players, currentStateEndTime } = useGame();
  const [timeLeft, setTimeLeft] = useState(
    Math.floor((currentStateEndTime - new Date().getTime()) / 1000)
  );

  function compare(a, b) {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-center mt-14 text-6xl font-bold">
        Current score
      </h2>
      <div className="my-5 sm:p-20 w-full">
        {players.sort(compare).map((player, index) => {
          return (
            <div
              key={`player-${index}`}
              className="w-full p-5 bg-gray-700 rounded-lg font-bold mb-2 flex justify-between"
            >
              <span className="mr-10">{player.name}</span>
              <span>{`${player.score} points`}</span>
            </div>
          );
        })}
      </div>
      <div>
        {timeLeft > 0 ? (
          <>
            <span className="mr-5">Next round starts in:</span>
            <span>{`${timeLeft} seconds`}</span>
          </>
        ) : (
          <span>Lets gooo 😎</span>
        )}
      </div>
    </div>
  );
};
