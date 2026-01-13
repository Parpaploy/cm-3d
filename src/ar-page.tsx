import { Canvas } from "@react-three/fiber";
import Ar from "./components/ar";
import Navbar from "./navbar";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const ARPage: React.FC = () => {
  const { t } = useTranslation();
  const [uiHidden, setUiHidden] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const lastTap = useRef(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audios/ChediMusic.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    audio.play().catch(() => {
      console.warn("Autoplay blocked, waiting for user interaction");
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3500);
    return () => clearTimeout(t);
  }, []);

  const handlePointerUp = () => {
    const now = Date.now();

    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    }

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

      {!uiHidden && (
        <button
          className={`fixed ${
            isPopup ? "bottom-120" : "bottom-0"
          } left-10 text-[36px] z-999 pointer-events-auto bg-white/80 w-20 rounded-t-[20px] flex items-center justify-center`}
          onClick={() => {
            setIsPopup(!isPopup);
          }}
        >
          {isPopup ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
      )}

      {!uiHidden && isPopup && (
        <div className="w-full h-120 overflow-y-auto p-7 bg-white/80 fixed bottom-0 left-1/2 -translate-x-1/2 text-[24px] rounded-t-[20px] z-999 pointer-events-auto">
          <h1 className="text-[30px] text-center font-bold mb-5">
            {t("title")}
          </h1>
          <p> {t("content")}</p>
        </div>
      )}

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
