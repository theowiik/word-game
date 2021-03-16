import React, { useState, useEffect } from 'react';
import { Navbar } from 'components/Navbar/Navbar';
import { useGame } from 'contexts/game';


/**
 * The template style for every page. Has a title that changes depending on state and changes background color as well
 * as text to be white.
 * @param children what to include in the page
 * @returns {JSX.Element}
 * @constructor
 */
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
    <div className="text-white bg-gray-800 min-h-screen">
     {(globalGameState==='END' || globalGameState==='LOBBY') && <Navbar label={label} />}
      <div className="w-full h-full">{children}</div>
    </div>
  );
};
