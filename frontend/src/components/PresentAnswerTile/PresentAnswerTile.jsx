import React, { useState } from "react";


/**
 * The tiles to present the answer of the players
 * @param explanation the text of the answer
 * @param onClick selects the tile if clicked
 * @param clickable prevents the player from choosing a new answer
 * @returns {JSX.Element}
 * @constructor
 */
export function PresentAnswerTile({ explanation , onClick, clickable}) {
  const [isChosen, setChosen] = useState(false);

  function handleSetChosen() {
    setChosen(true);
    onClick()
  }

  return (
    <div
      className={`pl-2 pr-10 py-2 max-w-sm flex m-4 rounded-md h-20 items-center ${
        isChosen
          ? "bg-indigo-400 transform scale-110"
          : " bg-gray-300 transform hover:scale-105 cursor-pointer transition-all ease-out duration-75"
      }`}
      onClick={clickable ? handleSetChosen : null}
    >
      <div className="text-blue-900 font-bold text-xl capitalize">"{explanation}"</div>
    </div>
  );
}
