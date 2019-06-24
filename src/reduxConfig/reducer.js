import {
  UPDATE_SCREEN_SIZE,
  UPDATE_KEY_VALUES,
  UPDATE_GAME_STATE,
  UPDATE_CURRENT_SCORE,
  UPDATE_ASTEROID_COUNT,
  CHANGE_SHIP,
  UPDATE_PLAYER_NAME,
  LOAD_PREVIOUS_GAME,
  UPDATE_TOP_SCORE
} from "./actions";

const initialState = {
  screen: {
    width: window.innerWidth,
    height: window.innerHeight,
    ratio: window.devicePixelRatio || 1
  },
  asteroidCount: 3,
  currentScore: 0,
  topScore: localStorage["topscore"] || 0,
  inGame: false,
  selectedShip: "",
  playerName: "",
  blasters: ["quickshot", "spreadShot", "doubleShot", "wrapShot"]
};

export const rootReducer = (state = initialState, action) => {
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
      return {
        ...state,
        currentScore: action.payload
      };
    case UPDATE_TOP_SCORE:
      return {
        ...state,
        topScore: action.payload
      };
    case UPDATE_ASTEROID_COUNT:
      return {
        ...state,
        asteroidCount: action.payload
      };
    case CHANGE_SHIP:
      return {
        ...state,
        selectedShip: action.payload
      };
    case UPDATE_PLAYER_NAME:
      return {
        ...state,
        playerName: action.payload
      };
    case LOAD_PREVIOUS_GAME:
      return {
        screen: action.payload.screen,
        asteroidCount: action.payload.asteroidCount,
        currentScore: action.payload.currentScore,
        topScore: action.payload.topScore,
        inGame: action.payload.inGame,
        selectedShip: action.payload.selectedShip,
        playerName: action.payload.playerName,
        blasters: action.payload.blasters
      };
    default:
      return { ...state };
  }
};
