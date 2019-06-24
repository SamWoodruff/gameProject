import { rotatePoint } from "../math";
import { store } from "../reduxConfig/store";

class Projectile {
  constructor(args) {
    let posDelta = rotatePoint(
      { x: 0, y: -20 },
      { x: 0, y: 0 },
      (args.ship.rotation * Math.PI) / 180
    );
    this.position = {
      x: args.ship.position.x + posDelta.x,
      y: args.ship.position.y + posDelta.y
    };
    this.rotation = args.ship.rotation;
    this.velocity = {
      x: posDelta.x / 2,
      y: posDelta.y / 2
    };
    this.radius = 2;
  }

  destroy = () => {
    this.delete = true;
  };

  display = state => {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.position.x < 0 ||
      this.position.y < 0 ||
      this.position.x > store.getState().screen.width ||
      this.position.y > store.getState().screen.height
    ) {
      this.destroy();
    }

    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate((this.rotation * Math.PI) / 180);
    context.fillStyle = "white";
    context.lineWidth = 5;
    context.beginPath();
    context.arc(0, 0, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
  };
}

export default Projectile;
