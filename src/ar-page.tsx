import { Canvas } from "@react-three/fiber";
import Ar from "./components/ar";
import Navbar from "./navbar";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const ARPage: React.FC = () => {
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

      {/* <Leva collapsed oneLineLabels /> */}

      <Canvas
        className="absolute top-0 left-0"
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 45, near: 0.1, far: 100 }}
      >
        <Ar isOpen={isOpen} />
      </Canvas>
    </div>
  );
};

export default ARPage;
