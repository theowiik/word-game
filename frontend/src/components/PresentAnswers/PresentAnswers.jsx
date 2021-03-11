import React from 'react';
import { Timer, PresentAnswerTile } from 'components';

export const PresentAnswers = () => {
  const answers = [
    { answer: 'Theo e king' },
    { answer: 'Sudo e king' },
    { answer: 'Jopsidop e king' },
    { answer: 'Behöver ett långt svar så att dehär får bli ett långt svar' },
    { answer: 'Behöver ett långt svar så att dehär får bli ett långt svar' },
  ];

  return (
    <>
      <h1 className="text-center mt-14 text-6xl font-semibold">Resonabel</h1>

      <div className="mt-14 w-150">
        <Timer duration={200} />
      </div>

      <div className="flex items-center mt-10">
        <div className="grid grid-cols-3">
          {answers.map((answer) => {
            return (
              <PresentAnswerTile answer={answer.answer}></PresentAnswerTile>
            );
          })}
        </div>
      </div>
    </>
  );
};
