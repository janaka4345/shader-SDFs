import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

import vs from "../glsl/vertexShader";
import fs from "../glsl/fragment";

let cw = 400;
let ch = 400;
let myShader;
let img;

export default function SDF(props) {
  const [t, setT] = useState(0);

  return (
    <div>
      <div
      // style={{
      //   position: "absolute",
      //   top: 0,
      //   left: "50%",
      //   border: "red 2px solid",
      // }}
      >
        <ReactP5Wrapper sketch={sketch} />
      </div>
      <div
      // style={{ border: "blue 2px solid" }}
      >
        <button onClick={() => setT((prev) => (prev += 1))}>click</button>
        <h1>{t}</h1>
      </div>
    </div>
  );
}

function sketch(p5) {
  p5.preload = preload(p5);
  p5.setup = setup(p5);
  p5.draw = draw(p5);
  p5.mousePressed = () => mousePressed(p5);
}
function setup(p5) {
  return () => {
    p5.pixelDensity(1);
    p5.createCanvas(cw, ch, p5.WEBGL);
    // myShader = p5.createShader(vs, fs);
    myShader = p5.createShader(vs, fs);
    p5.shader(myShader);

    p5.background(255, 255, 255, 0);

    myShader.setUniform("u_resolution", [cw, ch]);

    myShader.setUniform("u_imgResolution", [cw, ch]);
  };
}
function preload(p5) {
  // img = p5.loadImage("./numberedgrid.png"); //numbered grid low rez
  img = p5.loadImage("./Test_grid_high_def.png"); //numbered grid high rez
}
function draw(p5) {
  return () => {
    myShader.setUniform("u_time", p5.frameCount / 1000.0); // we divide millis by 1000 to convert it to seconds
    // myShader.setUniform("u_mouse", [
    //   p5.mouseX,
    //   p5.map(p5.mouseY, 0, ch, ch, 0),
    // ]); // we flip Y so it's oriented properly in our shader
    // myShader.setUniform("u_color", 1.0, 1.0, 0.0, 1.0);
    p5.fill(0, 0, 255);
    p5.beginShape();
    p5.vertex(0, 0);
    p5.vertex(0, 1);
    p5.vertex(1, 1);
    p5.vertex(1, 0);
    p5.endShape(p5.CLOSE);

    myShader.setUniform("u_image", img);

    // p5.noLoop();
  };
}
function mousePressed(p5) {
  console.log(p5.frameRate());
  // console.log(myShader);
}
