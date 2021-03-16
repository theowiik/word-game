import React, { useMemo } from 'react';
import { states } from '../lib/constants';
const GameContext = React.createContext();

const actions = {
  SET_GLOBAL_STATE: 'SET_GLOBAL_STATE',
  SET_PIN: 'SET_PIN',
  SET_PLAYERS: 'SET_PLAYERS',
  SET_CURRENT_STATE_END_TIME: 'SET_CURRENT_STATE_END_TIME',
  SET_CURRENT_WORD: 'SET_CURRENT_WORD',
  SET_EXPLANATIONS: 'SET_EXPLANATIONS',
  SET_SELECTED_EXPLANATIONS: 'SET_SELECTED_EXPLANATIONS'
};

const initialState = {
  state: states.LOBBY,
  pin: '12345',
  players: [],
  currentStateEndTime: 0,
  currentWord: 'Default',
  explanations: [],
  selectedExplanations: [],
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
    case actions.SET_CURRENT_STATE_END_TIME: {
      return {
        ...state,
        currentStateEndTime: action.currentStateEndTime,
      };
    }
    case actions.SET_CURRENT_WORD: {
      return {
        ...state,
        currentWord: action.word,
      };
    }
    case actions.SET_EXPLANATIONS: {
      return {
        ...state,
        explanations: action.explanations,
      };
    }
    case actions.SET_SELECTED_EXPLANATIONS: {
      return {
        ...state,
        selectedExplanations: action.selectedExplanations
      }
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
    dispatch({ type: actions.SET_GLOBAL_STATE, state: state });
  };

  const setPin = (pin) => dispatch({ type: actions.SET_PIN, pin: pin });

  const setPlayers = (players) =>
    dispatch({ type: actions.SET_PLAYERS, players: players });

  const setCurrentStateEndTime = (time) =>
    dispatch({
      type: actions.SET_CURRENT_STATE_END_TIME,
      currentStateEndTime: time,
    });

  const setCurrentWord = (word) =>
    dispatch({ type: actions.SET_CURRENT_WORD, word: word });

  const setSelectedExplanations = (selectedExplanations) =>
    dispatch({ type: actions.SET_SELECTED_EXPLANATIONS, selectedExplanations: selectedExplanations });

  const setExplanations = (explanations) =>
    dispatch({ type: actions.SET_EXPLANATIONS, explanations: explanations });

  const value = useMemo(
    () => ({
      ...gameState,
      setGlobalGameState,
      setPin,
      setPlayers,
      setCurrentStateEndTime,
      setCurrentWord,
      setSelectedExplanations,
      setExplanations
    }),
    [gameState]
  );

  return <GameContext.Provider value={value} {...props} />;
};

export const useGame = () => {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const ManagedGameContext = ({ children }) => (
  <GameProvider>{children}</GameProvider>
);
