import { useGame } from 'contexts/game';
import { AnswerRevealCard } from 'components/AnswerRevealCard';
import React from 'react';

export const PresentCorrectAnswer = () => {
  const { currentWord, correctExplanation } = useGame();
  const delay = 1;
  const pickedAnswers = [
    {
      players: ['peter', 'piper'],
      explanation: 'Cool thing',
      correct: true
    },
    {
      players: ['mooowo'],
      explanation: 'Not so cool thing. bUt a very long sentence woo woo i ma so long, hahha look at me!! no one would type more than this right????',
      correct: false
    }
  ];

  return (
    <div className='m-14 w-full'>
      <p className='text-yellow-400 tracking-wide uppercase'>
        Correct description of
      </p>
      <h1 className='text-6xl font-bold'>{currentWord}</h1>

      {pickedAnswers.map((pickedAnswer) => {
        return (
          <AnswerRevealCard text={pickedAnswer.explanation} by='me :)' chose={pickedAnswer.players}
                            correct={pickedAnswer.correct} />
        );
      })}
    </div>
  );
};
