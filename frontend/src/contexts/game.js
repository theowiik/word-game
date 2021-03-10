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
  lobby: true,
  playing: false,
  end: false,
};

const initialRoundState = {
  presentWordInputExplaination: true,
  selectExplaination: false,
  presentAnswer: false,
  presentScore: false
}

function gameReducer(state, action) {
  switch (action.type) {
    case gameStates.OPEN_LOBBY: {
      return {
        lobby: true,
        playing: false,
        end: false,
      };
    }
    case gameStates.START_GAME: {
      return {
        lobby: false,
        playing: true,
        end: false,
      };
    }
    case gameStates.END_GAME: {
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

function roundReducer(state, action) {
  switch (action.type) {
    case gameStates.OPEN_LOBBY: {
      return {
        lobby: true,
        playing: false,
        end: false,
      };
    }
    case gameStates.START_GAME: {
      return {
        lobby: false,
        playing: true,
        end: false,
      };
    }
    case gameStates.END_GAME: {
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
  const [gameState, dispatch] = React.useReducer(gameReducer, initialGameState);
  const [roundState, roundDispatch] = React.useReducer(roundReducer, initialRoundState);

  const openLobby = () => dispatch({ type: gameStates.OPEN_LOBBY });
  const startGame = () => dispatch({ type: gameStates.START_GAME });
  const endGame = () => dispatch({ type: gameStates.END_GAME });

  const openPresentWordAndInput = () => roundDispatch({ type: roundStates.PRESENT_WORD_INPUT_EXPLANATION})
  const openSelectExplaination = () => roundDispatch({ type: roundStates.SELECT_EXPLANATION})
  const openPresentAnswer = () => roundDispatch({ type: roundStates.PRESENT_ANSWER})
  const openPresentScore = () => roundDispatch({ type: roundStates.PRESENT_SCORE})


  const value = useMemo(
    () => ({
      ...gameState,
      ...roundState,
      openLobby,
      startGame,
      endGame,
      openPresentWordAndInput,
      openSelectExplaination,
      openPresentAnswer,
      openPresentScore

    }),
    [gameState, roundState]
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
