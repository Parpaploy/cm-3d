import { useEffect, useRef, memo } from "react";
import * as THREE from "three";
import { THREEx } from "@ar-js-org/ar.js-threejs";
import { useFrame, useThree } from "@react-three/fiber";
import Temple from "./models/temple";
import type { ArProps } from "../interface";
import TemplePart from "./models/temple-part";

const Ar: React.FC<ArProps> = ({ isOpen }) => {
  const { camera, gl } = useThree();
  const arSourceRef = useRef<InstanceType<
    typeof THREEx.ArToolkitSource
  > | null>(null);

  useEffect(() => {
    const arSource = new THREEx.ArToolkitSource({
      sourceType: "webcam",
      sourceWidth: window.innerWidth,
      sourceHeight: window.innerHeight,
      displayWidth: window.innerWidth,
      displayHeight: window.innerHeight,
    });

    arSourceRef.current = arSource;

    const onResize = () => {
      if (!arSource.domElement) return;

      arSource.onResizeElement();

      const video = arSource.domElement as HTMLVideoElement;
      const canvas = gl.domElement;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const sourceWidth = video.videoWidth || 640;
      const sourceHeight = video.videoHeight || 480;
      const screenRatio = screenWidth / screenHeight;
      const sourceRatio = sourceWidth / sourceHeight;

      let newWidth, newHeight;

      if (screenRatio > sourceRatio) {
        newWidth = screenWidth;
        newHeight = screenWidth / sourceRatio;
      } else {
        newHeight = screenHeight;
        newWidth = screenHeight * sourceRatio;
      }

      const styles = {
        width: `${newWidth}px`,
        height: `${newHeight}px`,
        position: "fixed" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        objectFit: "cover" as const,
        zIndex: "-2",
        margin: "0",
        padding: "0",
      };

      Object.assign(video.style, styles);
      Object.assign(canvas.style, {
        ...styles,
        zIndex: "1",
        objectFit: "unset",
      });

      gl.setSize(newWidth, newHeight);
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const cam = camera as THREE.PerspectiveCamera;
      cam.aspect = newWidth / newHeight;
      cam.updateProjectionMatrix();
    };

    arSource.init(
      async () => {
        const video = arSource.domElement as HTMLVideoElement;

        if (!video.parentElement) {
          document.body.appendChild(video);
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: "environment",
          },
          audio: false,
        });

        video.srcObject = stream;
        await video.play();

        window.addEventListener("resize", onResize);
        onResize();
      },
      (err: Error) => console.error("AR source init error:", err)
    );

    return () => {
      window.removeEventListener("resize", onResize);
      if (arSource.domElement?.srcObject) {
        const stream = arSource.domElement.srcObject as MediaStream;
        stream.getTracks().forEach((t) => t.stop());
      }

      if (arSource.domElement?.parentElement) {
        arSource.domElement.parentElement.removeChild(arSource.domElement);
      }
    };
  }, [camera, gl]);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflow = "";
    };
  }, []);

  useFrame(() => {});

  return (
    <>
      {isOpen && (
        <group position={[0, 0.7, -1]} rotation={[-0.2, 2.35, 0]}>
          <Temple scale={0.5} />
        </group>
      )}

      <group position={[0, 0.7, -1]} rotation={[-0.2, 0.6, 0]}>
        <TemplePart scale={0.5} />
      </group>
      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 5, 3]} intensity={2} />
    </>
  );
};

export default memo(Ar);
