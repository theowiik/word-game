import classNames from 'classnames';
import { useEffect } from 'react';

const getCardClassNames = (props) => {
  return classNames({
    'p-10 rounded-lg rounded-xl mt-14 bg-white-400 text-white': true,
    'bg-gray-700': !props.correct,
    'bg-green-500': props.correct
  });
};

const getBadgeClassNames = (props) => {
  return classNames({
    'font-bold inline-block py-1 px-2 uppercase rounded ml-2': true,
    'bg-red-700': !props.correct,
    'bg-green-800 text-white': props.correct
  });
};

export function AnswerRevealCard({ text, by, chose, correct, index }) {
  const cardClassNames = getCardClassNames({ correct });
  const badgeClassNames = getBadgeClassNames({ correct });
  const delaySeconds = 5;

  useEffect(() => {
    const timer = setTimeout(
      () => {
        const element = document.querySelector(`#by-${index}`);
        element.classList.add('animate__animated', 'animate__bounceOutLeft');
      }
      , delaySeconds * 1000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={cardClassNames}>
        <p className='text-center font-bold text-2xl'>{text}</p>
      </div>

      <div className='flex flex-row justify-end mt-2'>
        <p className='text-3xl font-semibold'
           id={`by-${index}`}>{by ? by : 'Correct answer'}</p>
      </div>

      <div className='flex flex-row justify-end mt-2'>
        {chose.map((playerName) => {
          return (
            <>
              <p className={badgeClassNames}>
                {correct ? '+' : '-'}1 {playerName}
              </p>
            </>
          );
        })}
      </div>
    </>
  );
}