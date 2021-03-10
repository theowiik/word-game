import React, { useState } from "react";

export function PresentAnswerTile({ answer }) {
  const [isChosen, setChosen] = useState(false);

  function handleSetChosen() {
    setChosen(true);
  }

  return (
    <div
      className={`pl-2 pr-10 py-2 max-w-sm flex m-4 rounded-md h-20 items-center ${
        isChosen
          ? "bg-white transform scale-105"
          : " bg-gray-300 transform hover:scale-105 cursor-pointer transition-all ease-out duration-75"
      }`}
      onClick={handleSetChosen}
    >
      <div className="text-blue-900 font-bold text-sm">"{answer}"</div>
    </div>
  );
}
