export const UPDATE_SCREEN_SIZE = "UPDATE_SCREEN_SIZE";
export const updateScreenSize = (width, height, ratio) => ({
  type: UPDATE_SCREEN_SIZE,
  payload: {
    width: width,
    height: height,
    ratio: ratio
  }
});

export const UPDATE_KEY_VALUES = "UPDATE_KEY_VALUES";
export const updateKeyValues = keys => ({
  type: UPDATE_KEY_VALUES,
  payload: keys
});

export const UPDATE_GAME_STATE = "UPDATE_GAME_STATE";
export const updateGameState = gameState => ({
  type: UPDATE_GAME_STATE,
  payload: gameState
});

export const UPDATE_CURRENT_SCORE = "UPDATE_CURRENT_SCORE";
export const updateCurrentScore = score => ({
  type: UPDATE_CURRENT_SCORE,
  payload: score
});

export const UPDATE_TOP_SCORE = "UPDATE_TOP_SCORE";
export const updateTopScore = score => ({
  type: UPDATE_TOP_SCORE,
  payload: score
});

export const UPDATE_ASTEROID_COUNT = "UPDATE_ASTEROID_COUNT";
export const updateAsteroidCount = count => ({
  type: UPDATE_ASTEROID_COUNT,
  payload: count
});

export const CHANGE_SHIP = "CHANGE_SHIP";
export const changeShip = ship => ({
  type: CHANGE_SHIP,
  payload: ship
});

export const UPDATE_PLAYER_NAME = "UPDATE_PLAYER_NAME";
export const updatePlayerName = name => ({
  type: UPDATE_PLAYER_NAME,
  payload: name
});

export const LOAD_PREVIOUS_GAME = "LOAD_PREVIOUS_GAME";
export const loadPreviousGame = state => ({
  type: LOAD_PREVIOUS_GAME,
  payload: state
});
