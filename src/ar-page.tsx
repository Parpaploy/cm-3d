import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import Ar from "./components/ar";
import Navbar from "./navbar";

const ARPage: React.FC = () => {
  const controls = useControls({
    xRotation: { value: 0.12, min: -1, max: 6.28, step: 0.01 },
    yRotation: { value: 2.35, min: 0, max: 6.28, step: 0.01 },
    zRotation: { value: 0, min: 0, max: 6.28, step: 0.01 },
    posX: { value: 0, min: -10, max: 10, step: 0.1 },
    posY: { value: 0.7, min: -10, max: 10, step: 0.1 },
    posZ: { value: -1, min: -10, max: 10, step: 0.1 },
    scale: { value: 0.5, min: 0.1, max: 5, step: 0.1 },
  });

  return (
    <div className="w-svw h-svh relative overflow-hidden">
      <Navbar />

      <Leva collapsed oneLineLabels />

      <Canvas
        className="absolute top-0 left-0"
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 45, near: 0.1, far: 100 }}
      >
        <Ar
          rotation={[
            controls.xRotation,
            controls.yRotation,
            controls.zRotation,
          ]}
          position={[controls.posX, controls.posY, controls.posZ]}
          scale={controls.scale}
        />
      </Canvas>
    </div>
  );
};

export default ARPage;
