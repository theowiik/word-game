import { useGame } from 'contexts/game';
import { AnswerRevealCard } from 'components/AnswerRevealCard';
import { useState, useEffect } from 'react';

export const PresentCorrectAnswer = () => {
  const [view, setView] = useState([]);
  const { currentWord, correctExplanation } = useGame();
  const delay = 1;
  const selectedExplanations = [
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

  useEffect(() => {
      const timer = setInterval(
        () => {
          if (view.length >= selectedExplanations.length) {
            window.clearInterval(timer);
            return;
          }

          setView((previousState) => {
            return [...previousState, selectedExplanations[previousState.length]];
          });
        }
        , 3000);

      return () => window.clearInterval(timer);
    }, [view]
  );

  return (
    <div className='m-14 w-full'>

      {view.map((selectedExplanation) => {
        return (
          <p>{selectedExplanation.explanation}</p>
        );
      })}

      <p className='text-yellow-400 tracking-wide uppercase'>
        Correct description of
      </p>
      <h1 className='text-6xl font-bold'>{currentWord}</h1>

      {selectedExplanations.map((pickedAnswer) => {
        return (
          <AnswerRevealCard text={pickedAnswer.explanation} by='me :)' chose={pickedAnswer.players}
                            correct={pickedAnswer.correct} />
        );
      })}
    </div>
  );
};
