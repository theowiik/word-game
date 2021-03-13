import { useGame } from 'contexts/game';
import { AnswerRevealCard } from 'components/AnswerRevealCard';
import { useState, useEffect } from 'react';

export const PresentCorrectAnswer = () => {
  const [view, setView] = useState([]);
  const { currentWord, correctExplanation } = useGame();
  const delaySeconds = 2;
  const selectedExplanations = [
    {
      players: ['peter', 'piper'],
      explanation: 'Cool thing',
      correct: true,
      by: null
    },
    {
      players: ['mooowo'],
      explanation: 'Not so cool thing. bUt a very long sentence woo woo i ma so long, hahha look at me!! no one would type more than this right????',
      correct: false,
      by: 'peter'
    }
  ].sort(sortBy('correct'));

  function sortBy(key) {
    return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
  };

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
        , delaySeconds * 1000);

      return () => window.clearInterval(timer);
    }, [view]
  );

  return (
    <div className='m-14 w-full reveal-card'>
      <p className='text-yellow-400 tracking-wide uppercase'>
        Correct description of
      </p>
      <h1 className='text-6xl font-bold'>{currentWord}</h1>

      {view.reverse().map((explanation) => {
        return (
          <div className='transition animate__animated animate__fadeIn' key={explanation.explanation}>
            <AnswerRevealCard text={explanation.explanation} by={explanation.by} chose={explanation.players}
                              correct={explanation.correct} />
          </div>
        );
      })}
    </div>
  );
};
