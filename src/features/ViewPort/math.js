// From: http://codepen.io/bungu/pen/rawvJe

/**
 * Generates vertices for asteroid polygon with certain count and radius
Number of vertices
 Maximal radius of polygon
Array of vertices: {x: Number, y: Number}
 */
export const asteroidVertices = (count, rad) =>{
  let p = [];
  for (let i = 0; i < count; i++) {
    p[i] = {
      x:
        (-Math.sin(((360 / count) * i * Math.PI) / 180) +
          (Math.round(Math.random() * 2 - 1) * Math.random()) / 3) *
        rad,
      y:
        (-Math.cos(((360 / count) * i * Math.PI) / 180) +
          (Math.round(Math.random() * 2 - 1) * Math.random()) / 3) *
        rad
    };
  }
  return p;
}

/**
   * Rotate point around center on certain angle
   {x: Number, y: Number}
   {x: Number, y: Number}
   Angle in radians
   */
export const rotatePoint = (p, center, angle) =>{
  return {
    x:
      (p.x - center.x) * Math.cos(angle) -
      (p.y - center.y) * Math.sin(angle) +
      center.x,
    y:
      (p.x - center.x) * Math.sin(angle) +
      (p.y - center.y) * Math.cos(angle) +
      center.y
  };
}

//rand num between two
export const randomNumBetween = (min, max) =>{
  return Math.random() * (max - min + 1) + min;
}

//rand num between 2 numbers excluding a certain range(exMin,exMax)
export const randomNumBetweenExcluding = (min, max, exMin, exMax) =>{
  let random = randomNumBetween(min, max);
  while (random > exMin && random < exMax) {
    random = Math.random() * (max - min + 1) + min;
  }
  return random;
}
