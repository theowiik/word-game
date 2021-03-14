import React, { useState, useEffect } from 'react';
import { Timer, PresentAnswerTile } from 'components';
import { useGame } from 'contexts/game';
import axios from 'axios';
import { toast } from 'react-toastify';

export const PresentAnswers = () => {
  const [hasSelected, setHasSelected] = useState(false);

  const { currentWord, explanations, currentStateEndTime, pin } = useGame();

  const pickExplanation = (explanation) => {
    const form = new FormData();
    form.append('explanation', explanation);

    axios
      .post(`/games/${pin}/pick_explanation`, form)
      .then((res) => {
        console.log(res);
        toast.success('Picked explanation 😎');
        setHasSelected(true)
      })
      .catch((err) => {
        console.log('yoooo');
        toast.error('Failed to pick explanation 😩');
        console.log(err);
      });
  }

  return (
    <>
      <h1 className="text-center mt-14 text-6xl font-semibold">
        {currentWord}
      </h1>

      <div className="mt-14 w-full">
        <Timer start={new Date().getTime()} end={currentStateEndTime} />
      </div>

      <div className="flex items-center mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {explanations.map((answer, index) => {
            return (
              <div key={`answer-${index}`}>
                <PresentAnswerTile
                  clickable={!hasSelected}
                  answer={answer}
                  onClick={pickExplanation}
                ></PresentAnswerTile>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
