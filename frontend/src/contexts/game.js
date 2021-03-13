import React, { useMemo } from 'react';
import {states} from '../lib/constants'
const GameContext = React.createContext();

const actions = {
  SET_GLOBAL_STATE: 'SET_GLOBAL_STATE',
  SET_PIN: 'SET_PIN',
  SET_PLAYERS: 'SET_PLAYERS',
  SET_CURRENT_PROGRESS: 'SET_CURRENT_PROGRESS',
  SET_CURRENT_WORD: 'SET_CURRENT_WORD',
  SET_EXPLANATIONS: 'SET_EXPLANATIONS',
  SET_CORRECT_EXPLANATION: 'SET_CORRECT_EXPLANATION',
};

const initialState = {
  state: states.LOBBY,
  pin: '12345',
  players: [],
  currentProgress: 0,
  currentWord: 'Default',
  correctExplanation: '',
  explanations: [],
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
    case actions.SET_CURRENT_PROGRESS: {
      return {
        ...state,
        currentProgress: action.currentProgress,
      };
    }
    case actions.SET_CURRENT_WORD: {
      return {
        ...state,
        currentWord: action.word,
      };
    }
    case actions.SET_CORRECT_EXPLANATION: {
      return {
        ...state,
        correctExplanation: action.description,
      };
    }
    case actions.SET_EXPLANATIONS: {
      return {
        ...state,
        explanations: action.explanations,
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
    console.log('im here!!!!!');
    dispatch({ type: actions.SET_GLOBAL_STATE, state: state });
  };

  const setPin = (pin) => dispatch({ type: actions.SET_PIN, pin: pin });

  const setPlayers = (players) =>
    dispatch({ type: actions.SET_PLAYERS, players: players });

  const setCurrentProgress = (progress) =>
    dispatch({ type: actions.SET_CURRENT_PROGRESS, currentProgress: progress });

  const setCurrentWord = (word) =>
    dispatch({ type: actions.SET_CURRENT_WORD, word: word });

  const setCorrectExplanation = (description) =>
    dispatch({ type: actions.SET_CORRECT_EXPLANATION, description: description });

  const setExplanations = (explanations) =>
    dispatch({ type: actions.SET_EXPLANATIONS, explanations: explanations });

  const value = useMemo(
    () => ({
      ...gameState,
      setGlobalGameState,
      setPin,
      setPlayers,
      setCurrentProgress,
      setCurrentWord,
      setCorrectExplanation,
      setExplanations,
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
