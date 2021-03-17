import axios from 'axios';
import { Button, Timer } from 'components';
import { useGame } from 'contexts/game';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';


/**
 * The view to present the unusual word, the input field to write and answer and a timer.
 * @returns {JSX.Element}
 * @constructor
 */
export const PresentWord = () => {
  const [hasPosted, setHasPosted] = useState(false);
  const { currentWord, pin, currentStateEndTime } = useGame();
  const [disabledButton, setDisabledButton] = useState(true);
  const [startTime, setStartTime] = useState(new Date().getTime())

  const postExplanation = (explanation) => {
    const form = new FormData();
    form.append('explanation', explanation);

    axios
      .post(`/games/${pin}/add_explanation`, form)
      .then((res) => {
        console.log(res);
        toast.success('Submitted explanation 😎');
        setHasPosted(true);
      })
      .catch((err) => {
        console.log('yoooo');
        toast.error('Failed submitting answer 😩');
        console.log(err);
      });
  };

  const handleExplanationSubmit = (event) => {
    event.preventDefault();
    const explanation = event.target.explanation.value;
    postExplanation(explanation);
  };

  const handleChangedExplanation = (event) => {
    if (event.target.value !== '') {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  return (
    <div className="w-full">
      {/* WORD */}
      <div className="w-full px-5 sm:px-20">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-center justify-center mb-10 animate__animated animate__bounceIn animate__delay-1s">
          {currentWord}
        </h1>{' '}
        <Timer start={startTime} end={currentStateEndTime} />
        {!hasPosted ? (
          <form
            onSubmit={handleExplanationSubmit}
            className="flex flex-col w-full"
          >
            <input
              name="explanation"
              className="p-5 rounded-lg text-white bg-gray-600 text-center border-none h-44 my-10"
              placeholder="Write your explanation..."
              autoComplete="off"
              onChange={handleChangedExplanation}
            />

            <Button
              type="submit"
              primary={!disabledButton}
              disabled={disabledButton}
              label="Submit"
            />
          </form>
        ) : (
          <div className="w-full p-5 rounded-lg bg-gray-600 text-center text-bold">
            Your explanation is submitted
          </div>
        )}
      </div>
    </div>
  );
};
