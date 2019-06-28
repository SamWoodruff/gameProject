import { asteroidVertices, randomNumBetween } from "../math";
import { store } from "../reduxConfig/store";
import AsteroidTexture from './asteroid.jpeg'
class Asteroid {
  constructor(args) {
    this.id = args.id;
    this.position = args.position;
    this.velocity = {
      x: randomNumBetween(-1.5, 1.5),
      y: randomNumBetween(-1.5, 1.5)
    };
    this.rotation = 0;
    this.rotationSpeed = randomNumBetween(-1, 1);
    this.radius = args.size;
    this.points = 1000//Math.floor(this.radius / 2);
    this.create = args.create;
    this.addScore = args.addScore;
    this.vertices = asteroidVertices(15, args.size);
  }

  destroy = () => {
    this.delete = true;
    this.addScore(this.points);
    if (this.radius > 20) {
      for (let i = 0; i < 2; i++) {
        let asteroid = new Asteroid({
          size: this.radius / 2,
          position: {
            x: randomNumBetween(-10, 20) + this.position.x,
            y: randomNumBetween(-10, 20) + this.position.y
          },
          create: this.create.bind(this),
          addScore: this.addScore.bind(this)
        });
        this.create(asteroid, "asteroids");
      }
    }
  };

  display = state => {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.rotation += this.rotationSpeed;
    if (this.rotation >= 360) {
      this.rotation -= 360;
    }
    if (this.rotation < 0) {
      this.rotation += 360;
    }

    if (this.position.x > store.getState().screen.width + this.radius)
      this.position.x = -this.radius;
    else if (this.position.x < -this.radius)
      this.position.x = store.getState().screen.width + this.radius;
    if (this.position.y > store.getState().screen.height + this.radius)
      this.position.y = -this.radius;
    else if (this.position.y < -this.radius)
      this.position.y = store.getState().screen.height + this.radius;

    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate((this.rotation * Math.PI) / 180);
    context.beginPath();
    context.moveTo(0, -this.radius);
    for (let i = 1; i < this.vertices.length; i++) {
      context.lineTo(this.vertices[i].x, this.vertices[i].y);
    }
    let texture = new Image();
    texture.src = AsteroidTexture;
    context.fillStyle = context.createPattern(texture,"repeat");
    context.fill()
    context.closePath();
    context.stroke();
    context.restore();
  };
}

export default Asteroid;
