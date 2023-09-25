export default class Point {
  constructor(color, position = {x: 0, y:0}, velocity = {x:1, y:1}, lineRadius = 50) {
    this.lineRadius = lineRadius;
    this.velocity = velocity;
    this.x = position.x;
    this.y = position.y;
    this.color = color;
  }

  reflect() {
    this.velocity.x *= -1;
    this.velocity.y *= -1;
  }

  change(position = {x:this.x, y:this.y}, velocity = this.velocity, lineRadius = this.lineRadius) {
    this.lineRadius = lineRadius;
    this.velocity = velocity;
    this.x = position.x;
    this.y = position.y;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  static isInCircle(dx, dy, cx, cy, cr) {
    let x_, y_;
    x_ = dx - cx;
    y_ = dy - cy;

    if (x_*x_ + y_*y_ <= cr*cr) {
      return true;
    } 
    return false;
  }

  isInRadius(d) {
    return Point.isInCircle(d.x, d.y, this.x, this.y, this.lineRadius);
  }
}