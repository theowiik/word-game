import React, { useState, useEffect } from "react";
import { Navbar } from "components/Navbar/Navbar";
import { useGame } from "contexts/game";

export const GameLayout = ({ children }) => {
  const { globalGameState } = useGame();
  const [label, setLabel] = useState("Rappakalja");

  useEffect(() => {
    switch (globalGameState) {
      case "LOBBY":
        setLabel("Lobby");
        break;

      case "PLAYING":
        setLabel("");
        break;

      case "END":
        setLabel("Summary");
        break;
      default:
        setLabel("Rappakalja");
        break;
    }
  }, [globalGameState]);

  return (
    <div className=" text-white bg-gray-800">
      <Navbar label={label} />
      <div className="w-full min-h-screen">{children}</div>
    </div>
  );
};
