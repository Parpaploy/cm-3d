import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import Ar from "./components/ar";
import Navbar from "./navbar";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const ARPage: React.FC = () => {
  const controls = useControls({
    xRotation: { value: -0.2, min: -1, max: 6.28, step: 0.01 },
    yRotation: { value: 2.35, min: 0, max: 6.28, step: 0.01 },
    zRotation: { value: 0, min: 0, max: 6.28, step: 0.01 },
    posX: { value: 0, min: -10, max: 10, step: 0.1 },
    posY: { value: 0.7, min: -10, max: 10, step: 0.1 },
    posZ: { value: -1, min: -10, max: 10, step: 0.1 },
    scale: { value: 0.5, min: 0.1, max: 5, step: 0.1 },

    xRotation2: { value: -0.2, min: -1, max: 6.28, step: 0.01 },
    yRotation2: { value: 0.6, min: 0, max: 6.28, step: 0.01 },
    zRotation2: { value: 0, min: 0, max: 6.28, step: 0.01 },
    posX2: { value: 0, min: -10, max: 10, step: 0.1 },
    posY2: { value: 0.7, min: -10, max: 10, step: 0.1 },
    posZ2: { value: -1, min: -10, max: 10, step: 0.1 },
    scale2: { value: 0.5, min: 0.1, max: 5, step: 0.1 },
  });

  const { t } = useTranslation();
  const [uiHidden, setUiHidden] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const lastTap = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3500);
    return () => clearTimeout(t);
  }, []);

  const handlePointerUp = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setUiHidden((v) => !v);
    }
    lastTap.current = now;
  };

  return (
    <div
      className="w-svw h-svh relative overflow-hidden"
      onPointerUp={handlePointerUp}
    >
      {showHint && !uiHidden && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-999">
          <div className="px-4 py-2 rounded-full bg-black/50 text-white text-sm">
            {t("hide-ui")}
          </div>
        </div>
      )}

      {!uiHidden && <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />}

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
          rotation2={[
            controls.xRotation2,
            controls.yRotation2,
            controls.zRotation2,
          ]}
          position2={[controls.posX2, controls.posY2, controls.posZ2]}
          scale2={controls.scale2}
          isOpen={isOpen}
        />
      </Canvas>
    </div>
  );
};

export default ARPage;
