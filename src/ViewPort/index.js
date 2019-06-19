import React from "react";
import SpaceShip from "../SpaceShip/";
import Asteroid from "../Asteroid/";
import { connect } from "react-redux";
import { randomNumBetweenExcluding } from "../math";
import {
  updateScreenSize,
  updateKeyValues,
  updateGameState,
  updateCurrentScore,
  updateAsteroidCount,
  updateTopScore
} from "../reduxConfig/actions";

class ViewPort extends React.Component {
  constructor() {
    super();
    this.state = {
      context: null,
      keys: {
        left: 0,
        right: 0,
        up: 0,
        down: 0,
        space: 0
      }
    };
    this.spaceShip = [];
    this.asteroids = [];
    this.projectiles = [];
  }

  handleResize = () => {
    this.props.updateScreenSize(
      window.innerWidth,
      window.innerHeight,
      window.devicePixelRatio || 1
    );
  };

  handleKeys = (value, e) => {
    e.preventDefault();
    let keys = this.state.keys;
    if (e.keyCode === 37) keys.left = value;
    if (e.keyCode === 39) keys.right = value;
    if (e.keyCode === 38) keys.up = value;
    if (e.keyCode === 32) keys.space = value;
    this.setState({
      keys: keys
    });
  };

  componentDidMount = () => {
    window.addEventListener("keyup", this.handleKeys.bind(this, false));
    window.addEventListener("keydown", this.handleKeys.bind(this, true));
    window.addEventListener("resize", this.handleResize.bind(this, false));

    this.setState({ context: this.refs.canvas.getContext("2d") });

    this.startNewGame();
    requestAnimationFrame(() => {
      this.update();
    });
  };

  componentWillUnmount = () => {
    window.removeEventListener("keyup", this.handleKeys);
    window.removeEventListener("keydown", this.handleKeys);
    window.removeEventListener("resize", this.handleResize);
  };

  update = () => {
    const context = this.state.context;

    context.scale(this.props.screen.ratio, this.props.screen.ratio);
    context.fillStyle = "red";
    context.fillRect(0, 0, this.props.screen.width, this.props.screen.height);

    if (this.asteroids.length === 0) {
      const newCount = this.props.asteroidCount + Math.random() * (3 - 1) + 1;;
      this.props.updateAsteroidCount(newCount);
      this.generateAsteroids(newCount);
    }

    this.handleCollisionCheck(this.projectiles, this.asteroids);
    this.handleCollisionCheck(this.spaceShip, this.asteroids);

    this.updateObjects(this.asteroids, "asteroids");
    this.updateObjects(this.projectiles, "projectiles");
    this.updateObjects(this.spaceShip, "spaceShip");

    requestAnimationFrame(() => {
      this.update();
    });
  };

  addScore = points => {
    console.log()
    if (this.props.inGame) {
      this.props.updateCurrentScore(this.props.currentScore + points);
    }
  };

  startNewGame = () => {
    this.props.updateGameState(true);
    this.props.updateCurrentScore(0);

    let spaceShip = new SpaceShip({
      position: {
        x: this.props.screen.width / 2,
        y: this.props.screen.height / 2
      },
      create: this.createCanvasObject.bind(this),
      onDie: this.gameOver.bind(this)
    });
    this.createCanvasObject(spaceShip, "spaceShip");
    this.asteroids = [];
    this.generateAsteroids(this.props.asteroidCount);
  };

  gameOver = () => {
    this.props.updateGameState(false);

    if (this.props.currentScore > this.state.topScore) {
      this.props.updateTopScore(this.props.currentScore)
      localStorage["topscore"] = this.props.currentScore;
    }
  };

  generateAsteroids = count => {
    let spaceShip = this.spaceShip[0];
    for (let i = 0; i < count; i++) {
      let asteroid = new Asteroid({
        size: 60,
        position: {
          x: randomNumBetweenExcluding(
            0,
            this.props.screen.width,
            spaceShip.position.x - 60,
            spaceShip.position.x + 60
          ),
          y: randomNumBetweenExcluding(
            0,
            this.props.screen.height,
            spaceShip.position.y - 60,
            spaceShip.position.y + 60
          )
        },
        create: this.createCanvasObject.bind(this),
        addScore: this.addScore.bind(this)
      });
      this.createCanvasObject(asteroid, "asteroids");
    }
  };

  createCanvasObject = (item, type) => {
    this[type].push(item);
  };

  updateObjects = (items, group) => {
    items.forEach((item, index) => {
      item.delete
        ? this[group].splice(index, 1)
        : items[index].display(this.state);
    });
  };

  handleCollisionCheck = (items1, items2) => {
    var a = items1.length - 1;
    var b;
    for (a; a > -1; --a) {
      b = items2.length - 1;
      for (b; b > -1; --b) {
        var item1 = items1[a];
        var item2 = items2[b];
        if (this.checkCollision(item1, item2)) {
          item1.destroy();
          item2.destroy();
        }
      }
    }
  };

  checkCollision = (obj1, obj2) => {
    var x = obj1.position.x - obj2.position.x;
    var y = obj1.position.y - obj2.position.y;
    var length = Math.sqrt(x * x + y * y);
    if (length < obj1.radius + obj2.radius) {
      return true;
    }
    return false;
  };

  render = () => {
    console.log(this.spaceShip);
    console.log(this.asteroids);
    let endgame;
    let message;

    if (this.props.currentScore <= 0) {
      message = "That's rough dog";
    } else if (this.props.currentScore >= this.state.topScore) {
      message = "New best score: " + this.props.currentScore;
    } else {
      message = this.props.currentScore;
    }

    if (!this.props.inGame) {
      endgame = (
        <div className="endgame">
          <p>{message}</p>
          <button onClick={this.startNewGame.bind(this)}>Try Again</button>
        </div>
      );
    }

    return (
      <div>
        {endgame}
        <span className="score current-score">
          Score: {this.props.currentScore}
        </span>
        <span className="score top-score">Best: {this.props.topScore}</span>
        <span className="controls">
          To Move: [◄][▲][▼][►] To Shoot: [SPACE]
        </span>
        <canvas
          ref="canvas"
          width={this.props.screen.width * this.props.screen.ratio}
          height={this.props.screen.height * this.props.screen.ratio}
        />
      </div>
    );
  };
}

const mapStateToProps = state => ({
  keys: state.keys,
  screen: state.screen,
  asteroidCount: state.asteroidCount,
  currentScore: state.currentScore,
  topScore: state.topScore,
  inGame: state.inGame
});

const mapDispatchToProps = dispatch => ({
  updateScreenSize: (width, height, ratio) =>
    dispatch(updateScreenSize(width, height, ratio)),
  updateKeyValues: keys => dispatch(updateKeyValues(keys)),
  updateGameState: gameState => dispatch(updateGameState(gameState)),
  updateCurrentScore: score => dispatch(updateCurrentScore(score)),
  updateAsteroidCount: count => dispatch(updateAsteroidCount(count)),
  updateTopScore: score => dispatch(updateTopScore(score))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPort);
