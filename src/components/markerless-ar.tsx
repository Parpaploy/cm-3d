import { Interactive, useHitTest } from "@react-three/xr";
import { useRef, useState, useEffect } from "react";
import type { Group, Matrix4, Vector3 } from "three";
import TempleModel from "./models/temple-model";
import type { MarkerlessProps } from "../interface";

const MarkerlessAR = ({
  defaultScale = 0.3,
  onReticleVisible,
  resetTrigger,
  onModelPlaced,
}: MarkerlessProps) => {
  const reticleRef = useRef<Group>(null);

  const [reticleVisible, setReticleVisible] = useState(true);
  const [modelPosition, setModelPosition] = useState<Vector3 | null>(null);

  const hasDetectedSurface = useRef(false);

  useHitTest((hitMatrix: Matrix4) => {
    if (!reticleRef.current || !reticleVisible) return;

    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );

    reticleRef.current.visible = true;

    if (!hasDetectedSurface.current) {
      hasDetectedSurface.current = true;
      onReticleVisible?.();
    }
  });

  const placeModel = () => {
    if (!reticleRef.current) return;

    const pos = reticleRef.current.position.clone();
    setModelPosition(pos);
    setReticleVisible(false);
    reticleRef.current.visible = false;

    onModelPlaced?.(pos);
  };

  useEffect(() => {
    if (resetTrigger !== undefined) {
      setTimeout(() => {
        setModelPosition(null);
        setReticleVisible(true);
        hasDetectedSurface.current = false;
        if (reticleRef.current) reticleRef.current.visible = true;
      }, 0);
    }
  }, [resetTrigger]);

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} />

      {modelPosition && (
        <TempleModel
          position={modelPosition}
          rotation={[0, 0, 0]}
          scale={defaultScale}
        />
      )}

      {reticleVisible && (
        <Interactive onSelect={placeModel}>
          <group ref={reticleRef} visible={false}>
            <mesh rotation-x={-Math.PI / 2}>
              <ringGeometry args={[0.2, 0.3, 32]} />
              <meshBasicMaterial color="white" transparent opacity={0.5} />
            </mesh>

            <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]}>
              <planeGeometry args={[0.6, 0.6]} />
              <meshBasicMaterial visible={false} />
            </mesh>
          </group>
        </Interactive>
      )}
    </>
  );
};

export default MarkerlessAR;
