import React, { useContext, useState, useEffect } from "react";
const GameContext = React.createContext();

export function useGameContext() {
    return useContext(GameContext);
  }

export function GameProvider({children}) {

    const [players, setPlayers] = useState([])


}