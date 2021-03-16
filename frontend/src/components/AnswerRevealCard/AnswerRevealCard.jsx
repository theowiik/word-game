import classNames from 'classnames';
import { useEffect, useState } from 'react';

const getCardClassNames = (props) => {
  return classNames({
    'p-10 rounded-lg rounded-xl mt-8 text-white transition': true,
    'bg-green-500': props.showBy,
    'bg-gray-600': !props.showBy,
  });
};

const getBadgeClassNames = (props) => {
  return classNames({
    'font-bold inline-block py-1 px-2 uppercase rounded ml-2 mb-2': true,
    'animate__animated animate__fadeInDown': true,
    'bg-red-700': props.danger,
    'bg-green-800 text-white': props.success,
    'bg-gray-700': props.dark,
  });
};

/**
 * This component reveals the answer with an animation and adds effects depending on who picked what answer and if
 * it was correct or incorrect.
 * @param text the answer to display
 * @param byPlayer who wrote this answer
 * @param playersWhoChose who picked this specific answer
 * @param correct if it was the correct answer or not
 * @returns {JSX.Element}
 * @constructor
 */
export function AnswerRevealCard({ text, byPlayer, playersWhoChose, correct }) {
  const showByDelaySeconds = 6;
  const showChoseDelaySeconds = 3;
  const [showBy, setShowBy] = useState(false);
  const [showChose, setShowChose] = useState(false);
  const cardClassNames = getCardClassNames({ correct: correct });

  useEffect(() => {
    const byTimeout = setTimeout(() => {
      setShowBy(true);
    }, showByDelaySeconds * 1000);

    const choseTimeout = setTimeout(() => {
      setShowChose(true);
    }, showChoseDelaySeconds * 1000);

    return () => {
      clearTimeout(choseTimeout);
      clearTimeout(byTimeout);
    };
  }, []);

  return (
    <>
      <div className={cardClassNames}>
        <p className="text-center font-bold text-2xl">{text}</p>
      </div>

      <div className="flex flex-row flex-wrap justify-end mt-2">
        {showChose &&
          playersWhoChose.length > 0 &&
          playersWhoChose.map((player, i) => {
            return (
              <p
                className={getBadgeClassNames({
                  success: correct,
                  danger: !correct,
                })}
                key={i}
              >
                {correct ? '+20' : ''} {player.name}
              </p>
            );
          })}
        {showChose && playersWhoChose.length === 0 && (
          <p className={getBadgeClassNames({ dark: true })}>No one 😢</p>
        )}
      </div>

      <div className="flex flex-row justify-end">
        {showBy && (
          <div className="flex flex-col items-end">
            <p className="text-3xl font-semibold animate__animated animate__fadeInDown">
              {byPlayer ? `by ${byPlayer.name}` : 'Correct answer'}
            </p>
            <span className="text-sm">
              {playersWhoChose.length > 0
                ? `+${playersWhoChose.length * 10} points`
                : ''}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
