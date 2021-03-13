import React, { useState, useEffect } from 'react';
import { Navbar } from 'components/Navbar/Navbar';
import { useGame } from 'contexts/game';

export const GameLayout = ({ children }) => {
  const { globalGameState } = useGame();
  const [label, setLabel] = useState('Rappakalja');

  useEffect(() => {
    switch (globalGameState) {
      case 'LOBBY':
        setLabel('Lobby');
        break;

      case 'END':
        setLabel('Summary');
        break;
      default:
        setLabel('');
        break;
    }
  }, [globalGameState]);

  return (
    <div className=" text-white bg-gray-800 min-h-screen">
      <Navbar label={label} />
      <div className="w-full h-full">{children}</div>
    </div>
  );
};
