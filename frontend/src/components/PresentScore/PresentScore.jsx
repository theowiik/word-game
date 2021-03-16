import { useGame } from 'contexts/game';
import { TimeCountDown } from 'components/TimeCountDown';


/**
 * The view to displays the current score for the game
 * @returns {JSX.Element}
 * @constructor
 */
export const PresentScore = () => {
  const { players, currentStateEndTime } = useGame();

  function compare(a, b) {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-center mt-14 text-6xl font-bold">Current score</h2>
      <div className="my-5 sm:p-20 w-full">
        {players.sort(compare).map((player, index) => {
          return (
            <div
              key={`player-${index}`}
              className="w-full p-5 bg-gray-700 rounded-lg font-bold mb-2 flex justify-between"
            >
              <span className="mr-10">{player.name}</span>
              <span>{`${player.score} points`}</span>
            </div>
          );
        })}
      </div>
      <TimeCountDown label="Next round starts in:" />
    </div>
  );
};
