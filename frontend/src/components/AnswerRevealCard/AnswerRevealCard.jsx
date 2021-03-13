import classNames from 'classnames';

const getCardClassNames = (props) => {
  return classNames({
    'p-20 rounded-lg rounded-xl mt-14 bg-white-400 text-white': true,
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

export function AnswerRevealCard({ text, by, chose, correct }) {
  const cardClassNames = getCardClassNames({ correct });
  const badgeClassNames = getBadgeClassNames({ correct });

  return (
    <>
      <div className={cardClassNames}>
        <p className='text-center font-bold text-2xl'>{text}</p>
      </div>

      <div className='flex flex-row justify-end mt-2'>
        <p className='text-3xl font-semibold'>{by}</p>
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