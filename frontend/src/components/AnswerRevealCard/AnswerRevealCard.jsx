import classNames from 'classnames';
import { useState, useEffect } from 'react';

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
  const delaySeconds = 2;
  const [view, setView] = useState([]);

  const tempYo = () => {
    console.log('test');
    reveal();
  };

  const reveal = () => {
    const by = document.querySelector(`#by-${index}`);

    by.classList.remove('invisible');
    by.classList.add('animate__animated', 'animate__fadeInDown');

    const interval = setInterval(() => {
      console.log('XXX');
      console.log(view.length);
      console.log(chose.length)

      if (view.length <= chose.length) {
        console.log('adding another');

        setView((prevState) => {
          return [...prevState, chose[prevState.length]];
        });

      } else {
        console.log('wasd!');
      }
    }, 1000);
  };

  useEffect(() => {
    const flag = false;

    const timer = setTimeout(
      () => {
        reveal();
      }
      , delaySeconds * 1000);

    return () => window.clearTimeout(timer);
  }, [view, chose]);

  return (
    <>
      <div className={cardClassNames} onClick={tempYo}>
        <p className='text-center font-bold text-2xl'>{text}</p>
      </div>

      <div className='flex flex-row justify-end mt-2'>
        <p className='text-3xl font-semibold invisible'
           id={`by-${index}`}>{by ? `by ${by}` : 'Correct answer'}</p>
      </div>

      <div className='flex flex-row justify-end mt-2'>
        {view.map((playerName, i) => {
          return (
            <p className={badgeClassNames} key={i}>
              {correct ? '+' : '-'}1 {playerName}
            </p>
          );
        })}
      </div>
    </>
  );
}