import React, { useEffect, useState } from 'react';
import { useGame } from 'contexts/game';

/**
 * The progress bar timer
 * @param start starttime
 * @returns {JSX.Element}
 * @constructor
 */
export function Timer({ start }) {
  const { currentStateEndTime } = useGame();

  const totalTime = Math.floor((currentStateEndTime - start) / 1000);

  const [timeLeft, setTimeLeft] = useState(totalTime - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="w-full overflow-hidden h-6 mb-4 text-xs flex rounded-full bg-green-100">
      <div
        style={{
          width: `${(100 - ((totalTime - timeLeft) / totalTime) * 100)}%`,
        }}
        className="transition-all ease-linear duration-1000 shadow-none whitespace-nowrap text-white justify-center bg-green-500"
      ></div>
    </div>
  );
}
