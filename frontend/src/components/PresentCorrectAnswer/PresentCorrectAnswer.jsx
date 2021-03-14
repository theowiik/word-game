import { useGame } from 'contexts/game';
import { AnswerRevealCard } from 'components/AnswerRevealCard';
import { useState, useEffect } from 'react';

export const PresentCorrectAnswer = () => {
  const [view, setView] = useState([]);
  const { currentWord, selectedExplanations } = useGame();
  const delaySeconds = 2;

  function sortBy(key) {
    return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
  }

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

      {console.log(view)}

      <div className="flex flex-col-reverse transition-all duration-300 ease-in-out">
        {view.map((explanation, i) => {
          return (
            <div className='transition animate__animated animate__fadeIn' key={i}>
              <AnswerRevealCard
                text={explanation.explanation}
                byPlayer={explanation.by}
                playersWhoChose={explanation.players}
                correct={explanation.correct}
                index={i}
                key={i}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
