import React, { useState } from 'react';
import { Timer, PresentAnswerTile } from 'components';
import { useGame } from 'contexts/game';
import axios from 'axios';
import { toast } from 'react-toastify';


/**
 * The page to display all answers
 * @returns {JSX.Element}
 * @constructor
 */
export const PresentAnswers = () => {
  const [hasSelected, setHasSelected] = useState(false);

  const { currentWord, explanations,  pin } = useGame();

  const startTime = new Date().getTime();

  const pickExplanation = (explanation) => {
    const form = new FormData();
    form.append('explanation', explanation);

    axios
      .post(`/games/${pin}/select`, form)
      .then((res) => {
        console.log(res);
        toast.success('Picked explanation 😎');
        setHasSelected(true);
      })
      .catch((err) => {
        console.log('yoooo');
        toast.error('Failed to pick explanation 😩');
        console.log(err);
      });
  };

  return (
    <>
      <h1 className="text-center mt-14 text-6xl font-bold">{currentWord}</h1>

      <div className="mt-14 w-full">
        <Timer start={startTime} />
      </div>

      <div className="w-full items-center mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {explanations.map((explanation, index) => {
            return (
              <div key={`answer-${index}`}>
                <PresentAnswerTile
                  clickable={!hasSelected}
                  explanation={explanation}
                  onClick={() => pickExplanation(explanation)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
