import React, { useState } from "react";
import { connect } from "react-redux";
const _ = require("lodash"); //lodash used for _sortBy
const LeaderBoard = ({ inGame, currentScore, playerName, show }) => {
  const [leaderBoard, setLeaderBoard] = useState(
    localStorage.getItem("leaderBoard")
      ? JSON.parse(localStorage.getItem("leaderBoard"))
      : []
  );
  if (inGame === false && currentScore) {
    leaderBoard.push({ playerName: playerName, score: currentScore });
    let sortedLeaderBoard = _.sortBy(leaderBoard, "score");
    // localStorage.setItem(
    //   "leaderBoard",
    //   JSON.stringify(sortedLeaderBoard.reverse())
    // );
  }
  return (
    show && 
      <div className="leaderboard">
        {leaderBoard.map(score =>
        <div>
          {score.playerName} {score.score}
        </div>
        )}
      </div>
  );
};

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  currentScore: state.currentScore,
  inGame: state.inGame,
  playerName: state.playerName
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderBoard);
