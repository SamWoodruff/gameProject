import React, { useState } from "react";
import ShipSelector from "./ShipSelector";
import { connect } from "react-redux";
import { updatePlayerName } from "../reduxConfig/actions";

const StartScreen = ({ onClick, playerName, updatePlayerName }) => {
  const [inputField, setInputField] = useState('');
  console.log('here')
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
        value={inputField}
        onChange={() => setInputField('here')}
      />
      <ShipSelector />
      <button onClick={() => onClick()}>Start</button>
    </div>
  );
};

const mapStateToProps = state => ({
  playerName: state.playerName
});

const mapDispatchToProps = dispatch => ({
  updatePlayerName: name => dispatch(updatePlayerName(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);
