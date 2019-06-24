import React, { useState } from "react";
import { connect } from "react-redux";
import { updateGameState } from "../reduxConfig/actions";
import ShipSelector from "./ShipSelector";
import LoadGame from "./LoadMenu";

const PauseMenu = ({ updateGameState, saveGame, playerName,loadGame }) => {
  const [showShipMenu, setShowShipMenu] = useState(false);
  const [showLoadMenu, setLoadShipMenu] = useState(false);
  return (
    <div style={{ top: "50%", left: "50%" }}>
      <div className="menu">
        Paused
        <br />
        <br />
        <button onClick={() => updateGameState(true)}>Continue</button>
        <button onClick={() => setShowShipMenu(!showShipMenu)}>
          Change Ship
        </button>
        {showShipMenu ? <ShipSelector /> : null}
        <button onClick={() => saveGame(playerName)}>Save</button>
        <button onClick={() => setLoadShipMenu(!showLoadMenu)}>Load</button>
        {showLoadMenu ? <LoadGame onClick={loadGame}/> : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  inGame: state.inGame,
  playerName: state.playerName
});

const dispatchStateToProps = dispatch => ({
  updateGameState: gameState => dispatch(updateGameState(gameState))
});

export default connect(
  mapStateToProps,
  dispatchStateToProps
)(PauseMenu);
