import React, { useState } from "react";
import { loadPreviousGame } from "../reduxConfig/actions";
import { connect } from "react-redux";

const LoadGame = ({ onClick, loadPreviousGame }) => {
  const [saves, setSaves] = useState(
    localStorage.getItem("savedStates")
      ? JSON.parse(localStorage.getItem("savedStates"))
      : []
  );
  const [selectedLoad, setSelectedLoad] = useState(-1);
  const selectLoad = (save, index) => {
    setSelectedLoad(index);
    onClick(save);
  };
  return (
    <div>
      {saves.map((save, index) => (
        <div 
        className={
          selectedLoad === index ? "selectedLoadInfo" : "loadInfo"
        }
      >
          <span onClick={() => selectLoad(save, index)}>
              <div>
                {save.playerName}
                <br />
                {save.date}
              </div>
          </span>
          <div>
            <button
              className="minus"
              onClick={() => removeSave(save, setSaves)}
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
const removeSave = (save, setSaves) => {
  let savedStates = localStorage.getItem("savedStates")
    ? JSON.parse(localStorage.getItem("savedStates"))
    : [];

  const newSaves = savedStates.filter(
    state => state.playerName !== save.playerName
  );
  localStorage.setItem("savedStates", JSON.stringify(newSaves));
  setSaves(newSaves);
};
const mapDispatchToProps = dispatch => ({
  loadPreviousGame: state => dispatch(loadPreviousGame(state))
});

export default connect(
  null,
  mapDispatchToProps
)(LoadGame);
