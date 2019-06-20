import React, { useState } from "react";
import { connect } from "react-redux";
import { updateGameState } from "../reduxConfig/actions";
import ShipSelector from "./ShipSelector";
const PauseMenu = ({ updateGameState }) => {
  const [showShipMenu, setShowShipMenu] = useState(false);
  return (
    <div style={{ top: "50%", left: "50%" }}>
      <div className="menu">
        Paused
        <br />
        <br />
        <button onClick={() => updateGameState(true)}>Continue</button>
        <button onClick={() => setShowShipMenu(!showShipMenu)}>Change Ship</button>
        {showShipMenu ? <ShipSelector />: null}
        <button>Save</button>
        <button>Load</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  inGame: state.inGame
});

const dispatchStateToProps = dispatch => ({
  updateGameState: gameState => dispatch(updateGameState(gameState))
});

export default connect(
  mapStateToProps,
  dispatchStateToProps
)(PauseMenu);
