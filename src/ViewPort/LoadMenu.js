import React from "react";
import { loadPreviousGame } from '../reduxConfig/actions'
import { connect } from 'react-redux'

const LoadGame = ({ onClick, loadPreviousGame }) => {
  let saves = localStorage.getItem("savedStates")
    ? JSON.parse(localStorage.getItem("savedStates"))
    : [];
  
    return (
    <div>
      {saves.map(save => (
        <div onClick={()=>onClick(save) }>
          {save.playerName}
          {save.date}
        </div>
      ))}
    </div>
  );
};

const mapDispatchToProps = dispatch =>({
    loadPreviousGame: state => dispatch(loadPreviousGame(state))
})

export default connect(null, mapDispatchToProps)(LoadGame);
