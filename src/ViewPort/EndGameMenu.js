import React from 'react'
import LeaderBoard from './LeaderBoard'
import { connect } from 'react-redux'
import { updateGameState } from '../reduxConfig/actions'
const EndGameMenu = ({currentScore, topScore, onClick}) =>{
    let message;

    if (currentScore <= 0) {
      message = "That's rough dog";
    } else if (currentScore >= topScore) {
      message = "New best score: " + currentScore;
    } else {
      message = "Good Game! " + currentScore;
    }
    return(
        <div className="centeredMenu">
          <p>{message}</p>
          <button onClick={()=>onClick()}>Try Again</button>
          <LeaderBoard show ={true}/>
        </div>
    )
}

const mapDispatchToProps = dispatch =>({
    updateGameState: gameState => dispatch(updateGameState(gameState))
})

const mapStateToProps = state =>({
    currentScore: state.currentScore,
    topScore: state.topScore
})

export default connect(mapStateToProps,mapDispatchToProps)(EndGameMenu)