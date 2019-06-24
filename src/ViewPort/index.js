import React from "react";
import SpaceShip from "../SpaceShip/";
import Asteroid from "../Asteroid/";
import { connect } from "react-redux";
import { randomNumBetweenExcluding } from "../math";
import PauseMenu from "./PauseMenu";
import StartScreen from "./StartScreen";
import EndGameMenu from "./EndGameMenu";
import BackDrop from './backdrop.gif'
import { store } from "../reduxConfig/store";
import "../style.css";
import {
  updateScreenSize,
  updateKeyValues,
  updateGameState,
  updateCurrentScore,
  updateAsteroidCount,
  loadPreviousGame,
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
        space: 0
      }
    };
    this.spaceShip = [];
    this.asteroids = [];
    this.projectiles = [];
  }

  handleKeys = (value, e) => {
    e.preventDefault();
    let keys = this.state.keys;
    if (e.keyCode === 37) keys.left = value;
    if (e.keyCode === 39) keys.right = value;
    if (e.keyCode === 38) keys.up = value;
    if (e.keyCode === 32) keys.space = value;
    if (e.keyCode === 27) this.props.updateGameState("paused");
    this.setState({
      keys: keys
    });
  };

  handleResize = () => {
    this.props.updateScreenSize(window.innerWidth, window.innerHeight, 1);
  };

  componentWillMount = () => {
    requestAnimationFrame(() => {
      this.update();
    });
  };

  startNewGame = () => {
    this.props.updateGameState(true);
    this.props.updateCurrentScore(0);
    this.handleResize();
    this.initializeControls();
    this.createShip(this.props.screen.width / 2, this.props.screen.height / 2, 0);
    this.asteroids = [];
    this.generateAsteroids(this.props.asteroidCount);
    this.setState({ context: this.refs.canvas.getContext("2d") });
  };

  initializeControls = () => {
    window.addEventListener("keyup", this.handleKeys.bind(this, false));
    window.addEventListener("keydown", this.handleKeys.bind(this, true));
    window.addEventListener("resize", this.handleResize.bind(this, false));
  };

  update = () => {
    if (this.props.inGame && this.props.inGame !== "paused") {
      this.gameLoop();
    }
    requestAnimationFrame(() => {
      this.update();
    });
  };

  gameLoop = () => {
    const context = this.state.context;
    context.save();
    let backdrop = new Image();
    backdrop.src = BackDrop;
    let pattern = context.createPattern(backdrop,'repeat')
    context.rect(0, 0, this.props.screen.width, this.props.screen.height);
    context.fillStyle = pattern;
    context.fill();

    if (this.asteroids.length === 0) {
      const newCount = this.props.asteroidCount + Math.random() * (3 - 1) + 1;
      this.props.updateAsteroidCount(newCount);
      this.generateAsteroids(newCount);
    }

    this.handleCollisionDetection(this.projectiles, this.asteroids);
    this.handleCollisionDetection(this.spaceShip, this.asteroids);

    this.updateObjects(this.asteroids, "asteroids");
    this.updateObjects(this.projectiles, "projectiles");
    this.updateObjects(this.spaceShip, "spaceShip");
    context.restore();
  };

  addScore = points => {
    console.log();
    if (this.props.inGame) {
      this.props.updateCurrentScore(this.props.currentScore + points);
    }
  };

  createShip = (x, y, rot) => {
    let spaceShip = new SpaceShip({
      position: {
        x: x,
        y: y
      },
      rotation:rot,
      create: this.createCanvasObject.bind(this),
      onDie: this.gameOver.bind(this)
    });
    this.createCanvasObject(spaceShip, "spaceShip");
  };

  generateAsteroids = count => {
    let spaceShip = this.spaceShip[0];
    for (let i = 0; i < count; i++) {
      const x = randomNumBetweenExcluding(
        0,
        this.props.screen.width,
        spaceShip.position.x - 60,
        spaceShip.position.x + 60
      );
      const y = randomNumBetweenExcluding(
        0,
        this.props.screen.height,
        spaceShip.position.y - 60,
        spaceShip.position.y + 60
      );
      this.createAsteroid(x, y);
    }
  };

  createAsteroid = (x, y) => {
    let asteroid = new Asteroid({
      size: 60,
      position: {
        x: x,
        y: y
      },
      create: this.createCanvasObject.bind(this),
      addScore: this.addScore.bind(this)
    });
    this.createCanvasObject(asteroid, "asteroids");
  };

  createCanvasObject = (item, itemType) => {
    this[itemType].push(item);
  };

  updateObjects = (items, itemType) => {
    items.forEach((item, index) => {
      item.delete
        ? this[itemType].splice(index, 1)
        : items[index].display(this.state);
    });
  };

  handleCollisionDetection = (items1, items2) => {
    for (let i = 0; i < items1.length; i++) {
      for (let k = 0; k < items2.length; k++) {
        const item1 = items1[i];
        const item2 = items2[k];
        const x = item1.position.x - item2.position.x;
        const y = item1.position.y - item2.position.y;
        var length = Math.sqrt(x * x + y * y);
        if (length < item1.radius + item2.radius) {
          item1.destroy();
          item2.destroy();
        }
      }
    }
  };

  gameOver = () => {
    this.spaceShip = [];
    this.asteroids = [];
    this.projectiles = [];


    window.removeEventListener("keyup", this.handleKeys);
    window.removeEventListener("keydown", this.handleKeys);
    window.removeEventListener("resize", this.handleResize);

    if (this.props.currentScore > this.props.topScore) {
      this.props.updateTopScore(this.props.currentScore);
      localStorage.setItem("topscore", this.props.currentScore);
    }
    this.props.updateGameState(false);
  };

  saveGame = playerName => {
    let savedStates = localStorage.getItem("savedStates")
      ? JSON.parse(localStorage.getItem("savedStates"))
      : [];
    const saveData = {
      date: new Date().toLocaleDateString(),
      asteroids: this.asteroids,
      spaceShip: this.spaceShip,
      projectiles: this.projectiles,
      context: this.state.context
    };

    if (!savedStates.filter(state => state.playerName === playerName).length) {
      savedStates = [{ ...store.getState(), ...saveData }, ...savedStates];
      localStorage.setItem("savedStates", JSON.stringify(savedStates));
    }

    savedStates.forEach((save, index) => {
      if (save.playerName === playerName) {
        savedStates[index] = { ...store.getState(), ...saveData };
      }
    });
    localStorage.setItem("savedStates", JSON.stringify(savedStates));
  };

  loadGame = save => {
    this.initializeControls();
    this.spaceShip = [];
    this.asteroids = [];

    for (let i = 0; i < save.asteroidCount; i++) {
      this.createAsteroid(
        save.asteroids[i].position.x,
        save.asteroids[i].position.y
      );
    }
    this.props.loadPreviousGame(save);
    this.createShip(save.spaceShip[0].position.x, save.spaceShip[0].position.y, save.spaceShip[0].rotation);
    this.setState({ context: this.refs.canvas.getContext("2d") }, () =>
      this.gameLoop()
    );
  };

  render = () => {
    return (
      <div>
        {this.state.context === null && (
          <div className="centeredMenu">
            <StartScreen loadGame={this.loadGame} onClick={this.startNewGame} />
          </div>
        )}
        {this.props.inGame === "paused" && (
          <div className="centeredMenu">
            <PauseMenu loadGame={this.loadGame} saveGame={this.saveGame} />
          </div>
        )}
        {!this.props.inGame && this.state.context != null && (
          <EndGameMenu onClick={this.startNewGame} />
        )}
        <span className="score current-score">
          Score: {this.props.currentScore}
        </span>
        <span className="score top-score">Best: {this.props.topScore}</span>
        <span className="controls">To Move: ◄ ▲ ▼ ► To Shoot: [SPACE]</span>
        <canvas 
          className="background"
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
  updateTopScore: score => dispatch(updateTopScore(score)),
  loadPreviousGame: gameState => dispatch(loadPreviousGame(gameState))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPort);
