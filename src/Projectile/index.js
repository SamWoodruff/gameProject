import { rotatePoint } from "../math";
import { store } from "../reduxConfig/store";
class Projectile {
  constructor(args) {
    let posDelta = rotatePoint(
      { x: 0, y: -20 },
      { x: 0, y: 0 },
      (args.ship.rotation * Math.PI) / 180
    );
    this.id = args.ship.id
    this.position = {
      x: args.ship.position.x + posDelta.x,
      y: args.ship.position.y + posDelta.y
    };
    this.rotation = args.ship.rotation;
    this.color = args.ship.projectileColor;
    this.velocity = {
      x: posDelta.x / 2,
      y: posDelta.y / 2
    };
    this.radius = 5;
    this.delete = false;
    setTimeout(() => this.destroy(), 3000);
  }

  destroy = () => {
    this.delete = true;
  };

  display = state => {
    const context = state.context;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.position.x < 0 ||
      this.position.y < 0 ||
      this.position.x > store.getState().screen.width ||
      this.position.y > store.getState().screen.height
    ) {
      if (store.getState().selectedWeapon.wrap) {
        if (this.position.x > store.getState().screen.width)
          this.position.x = 0;
        else if (this.position.x < 0)
          this.position.x = store.getState().screen.width;
        if (this.position.y > store.getState().screen.height)
          this.position.y = 0;
        else if (this.position.y < 0)
          this.position.y = store.getState().screen.height;
      } else {
        this.destroy();
      }
    }
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate((this.rotation * Math.PI) / 180);
    context.fillStyle = this.color;
    context.lineWidth = 5;
    context.beginPath();
    context.arc(0, 0, 5, 0, 5 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
  };
}

export default Projectile;
