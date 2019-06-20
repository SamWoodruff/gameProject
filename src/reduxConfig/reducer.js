import {
  UPDATE_SCREEN_SIZE,
  UPDATE_KEY_VALUES,
  UPDATE_GAME_STATE,
  UPDATE_CURRENT_SCORE,
  UPDATE_ASTEROID_COUNT,
  CHANGE_SHIP,
  UPDATE_PLAYER_NAME
} from "./actions";

//REMOVE:
import ship1 from '../SpaceShip/ship2.png'

const initialState = {
  screen: {
    width: window.innerWidth,
    height: window.innerHeight,
    ratio: window.devicePixelRatio || 1,
  },
  asteroidCount: 3,
  currentScore: 0,
  topScore: localStorage["topscore"] || 0,
  inGame: false,
  selectedShip: ship1,
  playerName:'',
  blasters: ['quickshot','spreadShot','doubleShot','wrapShot']
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
      return{
        ...state,
        currentScore:action.payload
      }
    case UPDATE_ASTEROID_COUNT:
      return{
        ...state,
        asteroidCount:action.payload
      }
    case CHANGE_SHIP:
      return{
        ...state,
        selectedShip: action.payload
      }
    case UPDATE_PLAYER_NAME:
      return{
        ...state,
        playerName: action.payload
      }
    default:
      return { ...state };
  }
};