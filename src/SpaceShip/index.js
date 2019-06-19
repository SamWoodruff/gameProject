import Projectile from "../Projectile";
import { store } from "../reduxConfig/store";
class SpaceShip {
  constructor(args) {
    this.position = args.position;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.rotation = 0;
    this.rotationSpeed = 6;
    this.speed = 0.15;
    this.inertia = 1;
    this.radius = 20;
    this.lastShot = 0;
    this.create = args.create;
    this.onDie = args.onDie;
  }

  destroy = () => {
    this.delete = true;
    this.onDie();
  };

  rotate = dir => {
    if (dir === "LEFT") {
      this.rotation -= this.rotationSpeed;
    }
    if (dir === "RIGHT") {
      this.rotation += this.rotationSpeed;
    }
  };

  accelerate = () => {
    this.velocity.x -= Math.sin((-this.rotation * Math.PI) / 180) * this.speed;
    this.velocity.y -= Math.cos((-this.rotation * Math.PI) / 180) * this.speed;
  };

  display = state => {
    if (state.keys.up) {
      this.accelerate(1);
    }
    if (state.keys.left) {
      this.rotate("LEFT");
    }
    if (state.keys.right) {
      this.rotate("RIGHT");
    }
    if (state.keys.space && Date.now() - this.lastShot > 300) {
      const projectile = new Projectile({ ship: this });
      this.create(projectile, "projectiles");
      this.lastShot = Date.now();
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x *= this.inertia;
    this.velocity.y *= this.inertia;

    if (this.rotation >= 360) {
      this.rotation -= 360;
    }
    if (this.rotation < 0) {
      this.rotation += 360;
    }

    if (this.position.x > store.getState().screen.width) this.position.x = 0;
    else if (this.position.x < 0)
      this.position.x = store.getState().screen.width;
    if (this.position.y > store.getState().screen.height) this.position.y = 0;
    else if (this.position.y < 0)
      this.position.y = store.getState().screen.height;

    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate((this.rotation * Math.PI) / 180);
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, -15);
    context.lineTo(1,10);
    context.lineTo(10,5);
    context.lineTo(5,-10);
    context.lineTo(5,10);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  };
}

export default SpaceShip;
