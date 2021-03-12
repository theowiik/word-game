import React from 'react';
import { useGame } from 'contexts/game';

export const PresentCorrectAnswer = () => {
  const { currentWord, correctAnswer } = useGame();

 

  return (
    <div className="m-14 w-full">
      <p className='text-yellow-400 tracking-wide uppercase' >Correct description of</p>
      <h1 className="text-6xl font-semibold">{currentWord}</h1>
      <div className="p-20 rounded-lg bg-green-500 rounded-xl mt-14 text-white">
        <p className="text-center font-bold text-2xl">{`"${correctAnswer}"`}</p>
      </div>
    </div>
  );
};
