import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { useEffect, useRef, useState, Suspense } from "react";
import type { ARSessionInit } from "./interface";
import MarkerlessAR from "./components/markerless-ar";

export default function MarkerlessARPage() {
  const [isInAR, setIsInAR] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [modelPlaced, setModelPlaced] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const xrSessionRef = useRef<XRSession | null>(null);

  const [sessionInit, setSessionInit] = useState<ARSessionInit>({
    requiredFeatures: ["hit-test"],
  });

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
    <>
      <div ref={overlayRef} className="fixed inset-0 pointer-events-none z-50">
        {isInAR && isScanning && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl">
            Scanning...
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
              padding: "10px 20px",
              backgroundColor: "red",
              color: "white",
              pointerEvents: "auto",
            }}
          >
            Reset Model
          </button>
        )}
      </div>

      {!isInAR && (
        <button
          onClick={() => document.getElementById("ar-button")?.click()}
          style={{
            position: "fixed",
            zIndex: 1000,
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
          }}
        >
          Enter AR
        </button>
      )}

      {isInAR && (
        <button
          onClick={handleReset}
          style={{
            position: "fixed",
            zIndex: 1000,
            bottom: 70,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            pointerEvents: "auto",
          }}
        >
          Reset Model
        </button>
      )}

      <ARButton
        id="ar-button"
        sessionInit={sessionInit}
        className="absolute opacity-0 pointer-events-none"
      />

      {!isInAR && (
        <button
          onClick={() => document.getElementById("ar-button")?.click()}
          style={{
            position: "absolute",
            zIndex: 10,
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
          }}
        >
          Enter AR
        </button>
      )}

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
    </>
  );
}
