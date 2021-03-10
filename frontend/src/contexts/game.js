import React, { useMemo } from "react";
const GameContext = React.createContext();

const initialState = {
  lobby: true,
  playing: false,
  end: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_LOBBY": {
      return {
        lobby: true,
        playing: false,
        end: false,
      };
    }
    case "START_GAME": {
      return {
        lobby: false,
        playing: true,
        end: false,
      };
    }
    case "END_GAME": {
      return {
        lobby: false,
        playing: false,
        end: true,
      };
    }
    default: {
      return {
        lobby: true,
        playing: false,
        end: false,
      };
    }
  }
}
export const GameProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const openLobby = () => dispatch({ type: "OPEN_LOBBY" });
  const startGame = () => dispatch({ type: "START_GAME" });
  const endGame = () => dispatch({ type: "END_GAME" });

  const value = useMemo(
    () => ({
      ...state,
      openLobby,
      startGame,
      endGame,
    }),
    [state]
  );

  return <GameContext.Provider value={value} {...props} />;
};

export const useGame = () => {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error(`useGame must be used within a UIProvider`);
  }
  return context;
};

export const ManagedGameContext = ({ children }) => (
  <GameProvider>{children}</GameProvider>
);
