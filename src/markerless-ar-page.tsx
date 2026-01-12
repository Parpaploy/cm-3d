import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { useEffect, useRef, useState, Suspense } from "react";
import type { ARSessionInit } from "./interface";
import MarkerlessAR from "./components/markerless-ar";
import { useTranslation } from "react-i18next";
import LanguageButton from "./components/lang-btn";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

export default function MarkerlessARPage() {
  const [isInAR, setIsInAR] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [modelPlaced, setModelPlaced] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const xrSessionRef = useRef<XRSession | null>(null);
  const navigator = useNavigate();

  const [sessionInit, setSessionInit] = useState<ARSessionInit>({
    requiredFeatures: ["hit-test"],
  });

  const { t } = useTranslation();

  const handleExitAR = () => {
    if (xrSessionRef.current) {
      xrSessionRef.current.end();
    }

    navigator("/");
  };

  useEffect(() => {
    if (overlayRef.current) {
      setSessionInit({
        requiredFeatures: ["hit-test"],
        optionalFeatures: ["dom-overlay"],
        domOverlay: { root: overlayRef.current },
      });
    }
  }, []);

  const handleReset = () => {
    setResetTrigger((prev) => prev + 1);
    setModelPlaced(false);
  };

  return (
    <div className="relative svw min-h-svh flex flex-col justify-center items-center mx-auto max-w-[430px]">
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: 'url("/imgs/bg.svg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 20%",
          backgroundSize: "cover",
        }}
      />

      <div ref={overlayRef} className="fixed inset-0 pointer-events-none z-50">
        {isInAR && <Navbar onBack={handleExitAR} />}

        {isInAR && isScanning && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl pointer-events-none">
            {t("scanning")}
          </div>
        )}

        {isInAR && modelPlaced && (
          <button
            onClick={handleReset}
            style={{
              position: "fixed",
              zIndex: 1000,
              bottom: 70,
              left: "50%",
              transform: "translateX(-50%)",
              pointerEvents: "auto",
            }}
            className="mt-20 bg-[#B7663B] text-[20px] rounded-full py-2 px-10 font-bold text-white"
          >
            {t("reset")}
          </button>
        )}
      </div>

      <div className="rounded-t-[83px] text-center absolute bottom-0 left-0 py-18 px-10 w-full h-[55%] bg-[linear-gradient(180deg,#FFEFCB_0%,#FFCC9F_100%)]">
        {!isInAR && (
          <>
            <h1
              className="text-[#723D0F] text-[25px] font-bold mb-3"
              dangerouslySetInnerHTML={{ __html: t("header") }}
            />

            <LanguageButton />

            <button
              onClick={() => document.getElementById("ar-button")?.click()}
              className="mt-20 bg-[#B7663B] text-[20px] rounded-full py-2 px-10 font-bold text-white"
            >
              {t("start")}
            </button>
          </>
        )}
      </div>

      <ARButton
        id="ar-button"
        sessionInit={sessionInit}
        className="absolute opacity-0 pointer-events-none"
      />

      <Canvas className="fixed inset-0" gl={{ alpha: true }}>
        <XR
          onSessionStart={(e) => {
            xrSessionRef.current = e.target as XRSession;
            setIsInAR(true);
            setIsScanning(true);
          }}
          onSessionEnd={() => {
            xrSessionRef.current = null;
            setIsInAR(false);
            setIsScanning(true);
          }}
        >
          <Suspense fallback={null}>
            {isInAR && (
              <MarkerlessAR
                onReticleVisible={() => setIsScanning(false)}
                resetTrigger={resetTrigger}
                onModelPlaced={() => setModelPlaced(true)}
              />
            )}
          </Suspense>
        </XR>
      </Canvas>
    </div>
  );
}
