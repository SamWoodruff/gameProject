export const UPDATE_SCREEN_SIZE = "UPDATE_SCREEN_SIZE";
export const updateScreenSize = (width, height) => ({
  type: UPDATE_SCREEN_SIZE,
  payload: {
    width: width,
    height: height
  }
});

export const UPDATE_KEY_VALUES = "UPDATE_KEY_VALUES";
export const updateKeyValues = (keys) => ({
    type:UPDATE_KEY_VALUES,
    payload:keys
});

export const UPDATE_GAME_STATE = "UPDATE_GAME_STATE";
export const updateGameState = (gameState) =>({
  type:UPDATE_GAME_STATE,
  payload:gameState
})

export const UPDATE_CURRENT_SCORE = "UPDATE_CURRENT_SCORE";
export const updateCurrentScore = (score) =>({
  type:UPDATE_CURRENT_SCORE,
  payload:score
})

export const UPDATE_ASTEROID_COUNT = "UPDATE_ASTEROID_COUNT"
export const updateAsteroidCount = count =>({
  type:UPDATE_ASTEROID_COUNT,
  payload:count
})
