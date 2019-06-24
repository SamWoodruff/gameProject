import React, {useState} from "react";
import ShipSelector from "./ShipSelector";
import LoadGame from './LoadMenu'
import { connect } from "react-redux";
import { updatePlayerName, updateGameState } from "../reduxConfig/actions";

const StartScreen = ({ onClick, playerName, updatePlayerName,loadGame }) => {
  const [showLoadMenu, setShowLoadMenu] = useState(false);
  return (
    <div className="menu">
      Start Screen
      <br />
      <br />
      Select Your Ship:
      <br />
      <br />
      <input
        type="text"
        value={playerName}
        onChange={e => updatePlayerName(e.target.value)}
      />
      
      <ShipSelector />
      <button onClick={()=>setShowLoadMenu(!showLoadMenu)}>Load</button>
      {showLoadMenu ? <LoadGame onClick={loadGame}/> : null}
      <br/>
      <button onClick={() => onClick()}>Start</button>
    </div>
  );
};

const mapStateToProps = state => ({
  playerName: state.playerName
});

const mapDispatchToProps = dispatch => ({
  updatePlayerName: name => dispatch(updatePlayerName(name)),
  updateGameState: gameState => dispatch(updateGameState(gameState))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);
