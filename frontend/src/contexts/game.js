import React, { useMemo } from "react";
const GameContext = React.createContext();

const gameStates = {
  OPEN_LOBBY: "OPEN_LOBBY",
  START_GAME: "START_GAME",
  END_GAME: "END_GAME",
};

const roundStates = {
  PRESENT_WORD_INPUT_EXPLANATION: "PRESENT_WORD_INPUT_EXPLANATION",
  SELECT_EXPLANATION: "SELECT_EXPLANATION",
  PRESENT_ANSWER: "PRESENT_ANSWER",
  PRESENT_SCORE: "PRESENT_SCORE",
};

const initialGameState = {
  globalGameState: gameStates.OPEN_LOBBY,
  players: [],
};

const initialRoundState = {
  globalRoundState: roundStates.PRESENT_WORD_INPUT_EXPLANATION,
};

function gameReducer(state, action) {
  switch (action.type) {
    case "SET_GLOBAL_STATE": {
      return {
        ...state,
        globalGameState: action.state,
      };
    }
    case "SET_PLAYERS": {
      return {
        ...state,
        players: action.players,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}

function roundReducer(state, action) {
  switch (action.type) {
    case "SET_GLOBAL_STATE": {
      return {
        ...state,
        globalGameState: action.state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}

export const GameProvider = (props) => {
  const [gameState, dispatch] = React.useReducer(gameReducer, initialGameState);
  const [roundState, roundDispatch] = React.useReducer(
    roundReducer,
    initialRoundState
  );

  const setGlobalGameState = (state) => {
    dispatch({ type: "SET_GLOBAL_STATE", state: state });
  };
  const setPlayers = (players) =>
    dispatch({ type: "SET_PLAYERS", players: players });
  const setGlobalRoundState = (state) => {
    roundDispatch({ type: "SET_GLOBAL_STATE", state: state });
  };

  const value = useMemo(
    () => ({
      ...gameState,
      ...roundState,
      setGlobalGameState,
      setPlayers,
      setGlobalRoundState,
    }),
    [gameState, roundState]
  );

  return <GameContext.Provider value={value} {...props} />;
};

export const useGame = () => {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error(`useGame must be used within a GameProvider`);
  }
  return context;
};

export const ManagedGameContext = ({ children }) => (
  <GameProvider>{children}</GameProvider>
);
