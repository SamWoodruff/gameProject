import { store } from "../reduxConfig/store";
export const singleShot = (context, args) => {
  args.position.x += args.velocity.x;
  args.position.y += args.velocity.y;

  if (
    args.position.x < 0 ||
    args.position.y < 0 ||
    args.position.x > store.getState().screen.width ||
    args.position.y > store.getState().screen.height
  ) {
    args.destroy();
  }
  context.save();
  context.translate(args.position.x, args.position.y);
  context.rotate((args.rotation * Math.PI) / 180);
  context.fillStyle = "white";
  context.lineWidth = 5;
  context.beginPath();
  context.arc(0, 0, 2, 0, 2 * Math.PI);
  context.closePath();
  context.fill();
  context.restore();
};

export const spreadShot = (context, args) => {
  if (
    args.position.x < 0 ||
    args.position.y < 0 ||
    args.position.x > store.getState().screen.width ||
    args.position.y > store.getState().screen.height
  ) {
    args.destroy();
  }
  context.save();
  context.translate(args.position.x, args.position.y);
 // context.rotate((args.rotation * Math.PI) / 180);
  context.fillStyle = "white";
  context.lineWidth = 5;
  context.beginPath();
  context.arc(0, 0, 2, 0, 2 * Math.PI);
  context.closePath();
  context.fill();
  context.restore();
};