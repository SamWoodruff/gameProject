import React, {useState} from "react";
import ShipSelector from "./ShipSelector";
import LoadGame from './LoadMenu'
import LeaderBoard from './LeaderBoard'
import { connect } from "react-redux";
import { store } from '../reduxConfig/store'
import { updatePlayerName, updateGameState } from "../reduxConfig/actions";

const StartScreen = ({ startGame, playerName, updatePlayerName,loadGame }) => {
  const [showLoadMenu, setShowLoadMenu] = useState(false);
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const start = () =>{
    if(store.getState().playerName && store.getState().selectedShip){
      startGame();
    }
  }

  return (
    <div className="menu">
      Start Screen
      <br />
      <br />
      Player Name:
      <br />
      <br />
      <input
        type="text"
        className="playerName"
        value={playerName}
        onChange={e => updatePlayerName(e.target.value)}
      />
      <br/>
      <br/>
      Select Your Ship:
      <ShipSelector />
      <button onClick={()=>setShowLeaderBoard(!showLeaderBoard)}>Leaderboard</button><br/>
       {showLeaderBoard ? <LeaderBoard show={true}/>: null}
      <button onClick={()=>setShowLoadMenu(!showLoadMenu)}>Load</button>
      {showLoadMenu ? <LoadGame onClick={loadGame}/> : null}
      <br/>
      <button onClick={() => start()}>Start</button>
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
