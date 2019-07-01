import Projectile from "../Projectile";
import AlienSprite from '../Alien/alien.png';
class Alien {
  constructor(args) {
    this.id = args.id
    this.position = args.position;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.rotationSpeed = 6;
    this.speed = 1.5;
    this.projectileColor = "red";
    this.inertia = 1;
    this.radius = 20;
    this.create = args.create;
    this.addScore = args.addScore;
    this.points = 200;
    this.playerPosition = args.playerPosition;
    this.rotation = (Math.atan2(
      args.position.y - args.playerPosition.y ,
      args.position.x - args.playerPosition.x  
    ) + 4.7) * 180/ Math.PI + 180;
    this.lastShot = 0
  }

  destroy = () => {
    this.addScore(this.points)
    this.delete = true;
  };

  updateKnownPlayerLocation = position => {
    this.playerPosition = position;
  };

  display = state => {
    let dx = this.playerPosition.x - this.position.x;
    let dy = this.playerPosition.y - this.position.y;
    let length = Math.sqrt(dx * dx + dy * dy);
    // normalize (= direction vector)
    // (a direction vector has a length of 1)
    if (length) {
      dx /= length;
      dy /= length;
    }

    if (
      Date.now() - this.lastShot > 5000
    ) {
      const projectile = new Projectile({ ship: this });
      this.create(projectile, "projectiles");
      this.lastShot = Date.now();
    }else{
      this.lastShot--
    }

    this.position.x += dx * this.speed;
    this.position.y += dy* this.speed;
    this.rotation = (Math.atan2(
      this.position.y - this.playerPosition.y ,
      this.position.x - this.playerPosition.x  
    ) + 4.7) * 180/ Math.PI;

    const context = state.context;
    context.save();

    let sprite = new Image();
    sprite.src = AlienSprite;
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * Math.PI/180);
    context.drawImage(
      sprite,
      0,
      0,
      sprite.width,
      sprite.height,
      -sprite.width / 2,
      -sprite.height / 2,
      sprite.width,
      sprite.height
    );
    context.restore();
  };
}

export default Alien;
