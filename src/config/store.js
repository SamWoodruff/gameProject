import { createStore } from "redux";

import {
  UPDATE_SCREEN_SIZE,
  UPDATE_KEY_VALUES,
  UPDATE_GAME_STATE,
  UPDATE_CURRENT_SCORE,
  UPDATE_ASTEROID_COUNT
} from "./actions";
const initialState = {
  screen: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  asteroidCount: 5,
  currentScore: 0,
  topScore: localStorage["topscore"] || 0,
  inGame: false
};

export const rootReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case UPDATE_SCREEN_SIZE:
      return {
        ...state,
        screen: action.payload
      };
    case UPDATE_KEY_VALUES:
      return {
        ...state,
        keys: action.payload
      };
    case UPDATE_GAME_STATE:
      return {
        ...state,
        inGame: action.payload
      };
    case UPDATE_CURRENT_SCORE:
      return{
        ...state,
        currentScore:action.payload
      }
    case UPDATE_ASTEROID_COUNT:
      return{
        ...state,
        asteroidCount:action.payload
      }
    default:
      return { ...state };
  }
};
export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
