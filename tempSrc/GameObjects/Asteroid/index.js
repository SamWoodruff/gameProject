import { randomNumBetween, asteroidVertices } from '../ViewPort/math'
import { store } from '../../config/store'
class Asteroid{
  constructor(args) {
      this.velocity = {
        x: randomNumBetween(-1.5, 1.5),
        y: randomNumBetween(-1.5, 1.5)
      }
      this.position = args.position
      this.rotation = 0;
      this.rotationSpeed = (Math.random()*2-1)*Math.random()*2;
      this.radius = args.size
      this.score = (60/this.radius) * 5;
      this.create = args.create;
      this.addScore = args.addScore;
      this.vertices = asteroidVertices(5, args.size)
  }

  lifeSpan(state){
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.rotation += this.rotationSpeed

    if(this.rotationSpeed >= 360){
        this.rotation -= 360;
    }
    if(this.rotation < 0){
      this.rotation += 360;
    }
    console.log(store.getState().screen.height)

    if(this.position.y > store.getState().screen.height + this.radius) this.position.y = -this.radius;
    else if(this.position.y < -this.radius) this.position.y = store.getState().height + this.radius;
    if(this.position.x > store.getState().width + this.radius) this.position.x = -this.radius;
    else if(this.position.x < -this.radius) this.position.x = store.getState().width + this.radius;

    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation * Math.PI / 180);
    context.strokeStyle = '#FFF';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, -this.radius);
    for (let i = 1; i < this.vertices.length; i++) {
       context.lineTo(this.vertices[i].x, this.vertices[i].y);
    }
    context.closePath();
    context.stroke();
    context.restore();
  }
}



export default Asteroid