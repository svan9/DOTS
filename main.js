import Dots from "./classes/Dots.js";

function start({canvas}) {
  const dots = new Dots({canvas});  
}

function resizeCanvas({canvas}) {
  let bound = canvas.getBoundingClientRect();
  canvas.width  = bound.width*2;
  canvas.height = bound.height*2;
}


window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas");
  canvas.style.top = "0px";
  canvas.style.left = "0px";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.position = "absolute";

  resizeCanvas({canvas});

  window.addEventListener("resize", () => resizeCanvas({canvas}));

  start({canvas});
  
}); 

