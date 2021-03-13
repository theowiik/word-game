import { useGame } from 'contexts/game';
import React from 'react';

export const PresentCorrectAnswer = () => {
  const { currentWord, correctExplanation } = useGame();
  const delay = 1;
  const arr = ['Joe', 'Mama'];

  return (
    <div className="m-14 w-full">
      <p className="text-yellow-400 tracking-wide uppercase">
        Correct description of
      </p>
      <h1 className="text-6xl font-bold">{currentWord}</h1>

      <div className="transition p-20 rounded-lg bg-green-500 rounded-xl mt-14 text-white">
        <p className="text-center font-bold text-2xl">{`"${correctExplanation}"`}</p>
      </div>

      <div className="flex flex-row justify-end mt-2">
        {arr.map((item) => {
          return (
            <>
              <p className="font-bold inline-block py-1 px-2 uppercase rounded text-white bg-green-800 ml-2">
                +1 {item}
              </p>
            </>
          );
        })}
      </div>
    </div>
  );
};
