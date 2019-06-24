import React, {useState} from "react";
import { loadPreviousGame } from "../reduxConfig/actions";
import { connect } from "react-redux";

const LoadGame = ({ onClick, loadPreviousGame }) => {
  const [saves, setSaves] = useState(localStorage.getItem("savedStates")
  ? JSON.parse(localStorage.getItem("savedStates"))
  : [])

  // let saves = localStorage.getItem("savedStates")
  //   ? JSON.parse(localStorage.getItem("savedStates"))
  //   : [];

  return (
    <div>
      {saves.map(save => (
        <div>
          <span onClick={() => onClick(save)}>
            {save.playerName}
            {save.date}
          </span>
          <button onClick={()=>removeSave(save,setSaves)}>-</button>
        </div>
      ))}
    </div>
  );
};
const removeSave = (save,setSaves) => {
  let savedStates = localStorage.getItem("savedStates")
  ? JSON.parse(localStorage.getItem("savedStates"))
  : [];

  const newSaves = savedStates.filter(state => state.playerName !== save.playerName)
  localStorage.setItem("savedStates", JSON.stringify(newSaves));
  setSaves(newSaves)
};
const mapDispatchToProps = dispatch => ({
  loadPreviousGame: state => dispatch(loadPreviousGame(state))
});

export default connect(
  null,
  mapDispatchToProps
)(LoadGame);
