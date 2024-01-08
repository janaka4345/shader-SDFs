import "./App.css";
/*
 *CONSIDER THE PIXEL DENSITY OF THE DEVICE  . NEED TO FIX FOR DIFFERENT DEVICES
 */

import SDF from "./components/SDF"; //sdf 01 moving sdfs
import SDFshapesRain from "./components/SDFshapesRain"; //sdf 01 moving sdfs
import SDFCircleRain from "./components/SDFCircleRain"; //sdf circle rain 01

function App() {
  return (
    <>
      {/* <SDF /> */}
      <SDFshapesRain />
      {/* <SDFCircleRain /> */}
    </>
  );
}

export default App;
