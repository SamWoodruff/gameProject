import React from "react";
import SpaceShip from "../SpaceShip";
import Asteroid from "../Asteroid";
import { connect } from "react-redux";
import {
  updateScreenSize,
  updateKeyValues,
  updateGameState,
  updateCurrentScore,
  updateAsteroidCount
} from "../../config/actions";
import { randomNumBetweenExcluding, randomNumBetween } from "./math";
import "./style.css";
import { store } from "../../config/store";

class ViewPort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: "",
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

  handleKeys(value, e) {
    const keys = { ...this.state.keys };
    if (e.keyCode === 37) keys.left = value;
    if (e.keyCode === 39) keys.right = value;
    if (e.keyCode === 38) keys.up = value;
    if (e.keyCode === 32) keys.space = value;
    this.setState({
      keys
    });
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeys.bind(this, false));
    window.addEventListener("keydown", this.handleKeys.bind(this, true));
    window.addEventListener("resize", this.handleResize.bind(this, false));

    const context = this.refs.canvas.getContext("2d");
    this.setState({ context: context });
    this.startNewGame();
    requestAnimationFrame(() => {
      this.updateGame();
    });
  }

  updateGame = () => {
    const context = this.state.context;
    context.save();

    context.fillStyle = "#000";
    context.fillRect(0, 0, this.props.screen.width, this.props.screen.heigth);

    if (!this.asteroids.length) {
      let count = randomNumBetween(this.props.asteroidCount, 5);
      this.props.updateAsteroidCount(count);
      this.generateAsteroids(count);
    }

    this.checkCollisionsWith(this.projectiles, this.asteroids);
    this.checkCollisionsWith(this.asteroids, this.spaceShip);

    this.updateDisplayedObjects(this.asteroids, "asteroids");
    this.updateDisplayedObjects(this.projectiles, "projectiles");
    this.updateDisplayedObjects(this.spaceShip, "spaceShip");

    context.restore();
    requestAnimationFrame(() => {
      this.updateGame();
    });
  };

  handleResize() {
    this.props.updateScreenSize(window.innerWidth, window.innerHeight);
  }

  createObject = (object, objectType) => {
    this[objectType].push(object);
  };

  gameOver = () => {};

  addScore = () => {};

  startNewGame = () => {
    this.props.updateGameState(true);
    this.props.updateCurrentScore(0);
    let temp = new SpaceShip({
      position: {
        x: store.getState().screen.width / 2,
        y: store.getState().screen.height / 2
      },
      create: this.createObject.bind(this),
      onDie: this.gameOver.bind(this)
    });
    this.createObject(temp, "spaceShip");
    this.asteroids = [];
    this.createAsteroids(store.getState().asteroidCount);
  };

  createAsteroids = num => {
    let player = this.spaceShip[0];
    for (let i = 0; i < num; i++) {
      let asteroid = new Asteroid({
        position: {
          x: randomNumBetweenExcluding(
            0,
            this.props.screen.width,
            player.position.x - 60,
            player.position.x + 60
          ),
          y: randomNumBetweenExcluding(
            0,
            this.props.screen.height,
            player.position.y - 60,
            player.position.y + 60
          )
        },
        create: this.createObject.bind(this),
        addScore: this.addScore.bind(this)
      });
      this.createObject(asteroid, "asteroids");
    }
  };

  updateDisplayedObjects(items, group) {
    items.forEach((item,index)=>{
      item.delete ? this[group].splice(index, 1) : items[index].render(this.state)
    })
  }

  checkCollisionsWith(array1, array2) {
    var a = array1.length - 1;
    var b;
    for (a; a > -1; --a) {
      b = array2.length - 1;
      for (b; b > -1; --b) {
        var index1 = array1[a];
        var index2 = array2[b];
        if (this.checkCollision(index1, index2)) {
          index1.destroy();
          index2.destroy();
        }
      }
    }
  }

  checkCollision(obj1, obj2) {
    var x = obj1.position.x - obj2.position.x;
    var y = obj1.position.y - obj2.position.y;
    var length = Math.sqrt(x * x + y * y);
    if (length < obj1.radius + obj2.radius) {
      return true;
    }
    return false;
  }

  render() {
    console.log(this.asteroids);
    console.log(this.spaceShip);
    return (
      <div>
        <span className="score current-score">
          Score: {this.props.currentScore}
        </span>
        <span className="score top-score">Best: {this.props.topScore}</span>
        <span className="controls">
          To Move: [◄][▲][▼][►] To Shoot: [SPACE]
        </span>
        <canvas ref="canvas" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  keys: state.keys,
  screen: state.screen,
  asteroidCount: state.asteroidCount,
  currentScore: state.currentScore,
  topScore: state.topScore
});

const mapDispatchToProps = dispatch => ({
  updateScreenSize: (width, height) =>
    dispatch(updateScreenSize(width, height)),
  updateKeyValues: keys => dispatch(updateKeyValues(keys)),
  updateGameState: gameState => dispatch(updateGameState(gameState)),
  updateCurrentScore: score => dispatch(updateCurrentScore(score)),
  updateAsteroidCount: count => dispatch(updateAsteroidCount(count))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPort);
