import { Button, UserTile, Timer } from 'components';
import React, { useState } from 'react';
import { useGame } from 'contexts/game';

export const PresentWord = () => {

  const [hasPosted, setHasPosted] = useState(false);

  const { currentWord } = useGame();

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    console.log('Post ' + event.target.answer.value + ' to Server');
    //postAnswer(answer);
  };

  return (
    <div className="w-full">
      {/* WORD */}
      <div className=" w-full px-5 sm:px-20">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-center justify-center mb-10 ">
          {currentWord}
        </h1>{' '}
        <Timer duration={200} />
        {!hasPosted ? (
          <form onSubmit={handleAnswerSubmit} className="flex flex-col w-full">
            <textarea
              name="answer"
              className="p-5 rounded-lg text-white dark:bg-gray-600  border-none h-72 my-10"
              placeholder="Write your explanation.."
            ></textarea>

            <Button primary label="Submit your answer" />
          </form>
        ) : (
          <div className="w-full p-10 rounded-lg bg-gray-600 text-center text-bold">
            Your answer is submitted
          </div>
        )}
      </div>
    </div>
  );
};
