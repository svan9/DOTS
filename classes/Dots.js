import Point from "./Point.js";
const randrange=(a,b)=>(Math.random()*(b-a)+a);

export default class Dots {
  /**
   * 
   * @param {{canvas: HTMLCanvasElement}} param0 
   */
  constructor({canvas}) {
    this.config = {
      maxDots: parseInt(4*canvas.width/50),
      background: "hsl(220, 10%, 10%)",
      dotcolor: "hsl(220, 88%, 90%)",
      linecolor: "hsl(210, 50%, 40%)",
    };
    /**
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;

    /**
     * @type {Point[]}
     */
    this.dots = [];

    this.mousedot = new Point();
    this.mousedot.lineRadius = 300;
    
    canvas.addEventListener("touchmove", (ev) => {
      this.mousedot.lineRadius = 300;
      this.mousedot.x = ev.changedTouches[0].clientX*2;
      this.mousedot.y = ev.changedTouches[0].clientY*2;
    }, false);
    canvas.addEventListener("touchend", (ev) => {
      this.mousedot.lineRadius = 0;
    }, false);
    canvas.addEventListener("mousemove", (ev) => {
      this.mousedot.x = ev.x*2;
      this.mousedot.y = ev.y*2;
      // console.log(ev);
    });

    this.start();
  }

  generateDot() {
    const vel = 0.4;
    let positon_x = randrange(0, this.canvas.width), positon_y = randrange(0, this.canvas.height);
    let velocity_x = randrange(-1*vel, vel), velocity_y = randrange(-1*vel, vel);
    return {positon: {x:positon_x, y:positon_y}, velocity: {x:velocity_x, y:velocity_y}};
  }

  start() {
    this.dots = new Array(this.config.maxDots).fill({}).map(e=>{
      let gen = this.generateDot();
      return new Point(`hsl(${randrange(10, 220)}, 50%, 50%)`, gen.positon, gen.velocity, randrange(150, 200));
    });

    
    let loop = (time) => {
      this.update(time);
      this.draw(time);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  update() {
    this.dots.forEach((dot) => {
      dot.update();
      if (
        dot.x >= this.canvas.width ||
        dot.x <= 0 ||
        dot.y >= this.canvas.height ||
        dot.x <= 0
        ) {
        let gen = this.generateDot();
        dot.change(gen.positon, gen.velocity);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = this.config.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    var d1, d2;
    for (let i = 0; i<this.dots.length; i++) {
      d1 = this.dots[i];
      for (let j = 0; j<this.dots.length; j++) {
        if (i == j) continue;
        d2 = this.dots[j];
        if (this.mousedot.isInRadius(d2)) {
          let l =
          Math.abs(Math.sqrt(this.mousedot.x*this.mousedot.x + this.mousedot.y*this.mousedot.y)-Math.sqrt(d2.x*d2.x + d2.y*d2.y)) / d1.lineRadius;
          this.ctx.lineWidth = 1;

          this.ctx.beginPath(); 
          
          this.ctx.moveTo(this.mousedot.x, this.mousedot.y);
          this.ctx.lineTo(d2.x, d2.y);
          
          this.ctx.lineWidth = .1;
          this.ctx.strokeStyle = `hsl(${200-l*50}, 50%, ${20+l*20}%)`;
          this.ctx.stroke();

        } 
        if (d1.isInRadius(d2)) {
          let l = Math.abs(Math.sqrt(d1.x*d1.x + d1.y*d1.y)-Math.sqrt(d2.x*d2.x + d2.y*d2.y)) / d1.lineRadius;
          this.ctx.lineWidth = 2*l;

          this.ctx.beginPath();

          this.ctx.moveTo(d1.x, d1.y);
          this.ctx.lineTo(d2.x, d2.y);

          this.ctx.strokeStyle = `hsl(${200-l*200}, 50%, ${10+l*20}%)`;
          this.ctx.stroke();
          
        }
      }
    }

    this.dots.forEach((dot) => {
      this.ctx.beginPath();
      this.ctx.arc(dot.x, dot.y, 4, 2 * Math.PI, false);
      this.ctx.fillStyle = dot.color;
      this.ctx.fill();
    });

  }
}