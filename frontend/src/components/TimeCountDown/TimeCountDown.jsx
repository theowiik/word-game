import React, { useEffect, useState } from 'react';
import { useGame } from 'contexts/game';

export const TimeCountDown = ({ label }) => {
  const { currentStateEndTime } = useGame();

  const [timeLeft, setTimeLeft] = useState(
    Math.floor((currentStateEndTime - new Date().getTime()) / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div>
      {timeLeft > 0 ? (
        <>
          <span className="mr-5">{label}</span>
          <span>{`${timeLeft} seconds`}</span>
        </>
      ) : (
        <span>Lets gooo 😎</span>
      )}
    </div>
  );
};
