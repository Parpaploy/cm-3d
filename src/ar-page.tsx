import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import Ar from "./components/ar";
import Navbar from "./navbar";

const ARPage: React.FC = () => {
  const controls = useControls({
    xRotation: {
      value: 0.5,
      min: 0,
      max: 6.28,
      step: 0.01,
    },
    yRotation: {
      value: 2.35,
      min: 0,
      max: 6.28,
      step: 0.01,
    },
    zRotation: {
      value: 0,
      min: 0,
      max: 6.28,
      step: 0.01,
    },
    posX: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.1,
    },
    posY: {
      value: 0.3,
      min: -10,
      max: 10,
      step: 0.1,
    },
    posZ: {
      value: -1,
      min: -10,
      max: 10,
      step: 0.1,
    },
    scale: {
      value: 0.3,
      min: 0.1,
      max: 5,
      step: 0.1,
    },
  });

  const rotation: [number, number, number] = [
    controls.xRotation,
    controls.yRotation,
    controls.zRotation,
  ];

  const position: [number, number, number] = [
    controls.posX,
    controls.posY,
    controls.posZ,
  ];

  return (
    <div className="w-svw h-svh relative">
      <Navbar />

      <Leva
        collapsed
        oneLineLabels
        titleBar={{ title: "Temple Controls", drag: true }}
        theme={{
          sizes: {
            rootWidth: "180px",
            controlWidth: "140px",
            rowHeight: "36px",
            titleBarHeight: "32px",
          },
        }}
      />
      <Canvas
        gl={{ antialias: true, alpha: true }}
        className="w-svw h-svh absolute top-0 left-0"
        camera={{ fov: 45, near: 0.1, far: 100 }}
      >
        <Ar rotation={rotation} position={position} scale={controls.scale} />
      </Canvas>
    </div>
  );
};

export default ARPage;
