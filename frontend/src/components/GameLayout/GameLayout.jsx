import React, { useState, useEffect } from "react";
import { Navbar } from "components/Navbar/Navbar";
import { useGame } from "contexts/game";

export const GameLayout = ({ children }) => {
  const { globalGameState } = useGame();
  const [label, setLabel] = useState("Rappakalja");

  useEffect(() => {
    switch (globalGameState) {
      case "OPEN_LOBBY":
        setLabel("Lobby");
        break;

      case "START_GAME":
        setLabel("");
        break;

      case "END_GAME":
        setLabel("Result");
        break;
      default:
        setLabel("Rappakalja");
        break;
    }
  }, [globalGameState]);

  return (
    <div className=" bg-white text-gray-800 dark:text-white dark:bg-gray-800">
      <Navbar label={label} />
      <div className="w-full min-h-screen">{children}</div>
    </div>
  );
};
