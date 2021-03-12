import React, { useMemo } from 'react';
const GameContext = React.createContext();

const states = {
  LOBBY: 'LOBBY',
  END: 'END',
  PRESENT_WORD_INPUT_EXPLANATION: 'PRESENT_WORD_INPUT_EXPLANATION',
  SELECT_EXPLANATION: 'SELECT_EXPLANATION',
  PRESENT_ANSWER: 'PRESENT_ANSWER',
  PRESENT_SCORE: 'PRESENT_SCORE',
};

const actions = {
  SET_GLOBAL_STATE: 'SET_GLOBAL_STATE',
  SET_PIN: 'SET_PIN',
  SET_PLAYERS: 'SET_PLAYERS',
  SET_CURRENT_WORD: 'SET_CURRENT_WORD',
  SET_ANSWERS: 'SET_ANSWERS',
};

const initialState = {
  state: states.LOBBY,
  pin: '12345',
  players: [],
  currentWord: 'Default',
  answers: [],
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SET_GLOBAL_STATE: {
      return {
        ...state,
        globalGameState: action.state,
      };
    }
    case actions.SET_PIN: {
      return {
        ...state,
        pin: action.pin,
      };
    }
    case actions.SET_PLAYERS: {
      return {
        ...state,
        players: action.players,
      };
    }
    case actions.SET_CURRENT_WORD: {
      return {
        ...state,
        currentWord: action.word,
      };
    }
    case actions.SET_ANSWERS: {
      return {
        ...state,
        answers: action.answers,
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
  const [gameState, dispatch] = React.useReducer(reducer, initialState);

  const setGlobalGameState = (state) => {
    console.log("im here!!!!!");
    dispatch({ type: actions.SET_GLOBAL_STATE, state: state });
  }

  const setPin = (pin) => dispatch({ type: actions.SET_PIN, pin: pin });

  const setPlayers = (players) =>
    dispatch({ type: actions.SET_PLAYERS, players: players });

  const setCurrentWord = (word) =>
    dispatch({ type: actions.SET_CURRENT_WORD, word: word });

  const setAnswers = (answers) =>
    dispatch({ type: actions.SET_ANSWERS, answers: answers });

  const value = useMemo(
    () => ({
      ...gameState,
      setGlobalGameState,
      setPin,
      setPlayers,
      setCurrentWord,
      setAnswers,
    }),
    [gameState]
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
