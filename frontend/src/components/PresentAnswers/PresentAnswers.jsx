import React, { useState } from 'react';
import { Timer, PresentAnswerTile } from 'components';
import { useGame } from 'contexts/game';

export const PresentAnswers = () => {
  const { currentWord, explanations, currentProgress } = useGame();

  const [hasSelected, setHasSelected] = useState(false);

  return (
    <>
      <h1 className="text-center mt-14 text-6xl font-semibold">
        {currentWord}
      </h1>

      <div className="mt-14 w-full">
        <Timer progress={currentProgress} />
      </div>

      <div className="flex items-center mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {explanations.map((answer, index) => {
            return (
              <div key={`answer-${index}`}>
                <PresentAnswerTile
                  clickable={!hasSelected}
                  answer={answer.answer}
                  onClick={() => setHasSelected(true)}
                ></PresentAnswerTile>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
