import { useXRHitTest } from "@react-three/xr";
import { useRef, useState, useEffect, useContext } from "react";
import * as THREE from "three";
import type { Group } from "three";
import { ResetContext } from "./reset-context";
import TempleModel from "./models/temple-model";
import type { HittestARProps, ModelState } from "../interface";

const HitTestAR = ({
  defaultScale = 0.3,
  onReticleVisible,
  onModelPlaced,
}: HittestARProps) => {
  const reticleRef = useRef<Group | null>(null);
  const [models, setModels] = useState<ModelState[]>([]);
  const [reticleVisible, setReticleVisible] = useState(true);
  const hasDetectedSurface = useRef(false);

  const resetTrigger = useContext(ResetContext);
  const prevResetTriggerRef = useRef(resetTrigger);

  useEffect(() => {
    if (resetTrigger !== prevResetTriggerRef.current) {
      if (resetTrigger > 0) {
        setTimeout(() => {
          setModels([]);
          setReticleVisible(true);
          hasDetectedSurface.current = false;
          onModelPlaced?.(false);
        }, 0);
      }
      prevResetTriggerRef.current = resetTrigger;
    }
  }, [resetTrigger, onModelPlaced]);

  useEffect(() => {
    onModelPlaced?.(models.length > 0);
  }, [models.length, onModelPlaced]);

  useXRHitTest((hits, getWorldMatrix) => {
    if (!reticleRef.current || !reticleVisible) return;
    if (hits.length === 0) return;

    const hit = hits[0];
    const matrix = new THREE.Matrix4();

    const isHit = getWorldMatrix(matrix, hit);

    if (isHit) {
      matrix.decompose(
        reticleRef.current.position,
        reticleRef.current.quaternion,
        reticleRef.current.scale
      );

      reticleRef.current.visible = true;

      if (!hasDetectedSurface.current) {
        hasDetectedSurface.current = true;
        onReticleVisible?.();
      }
    }
  }, "viewer");

  const placeModel = () => {
    if (!reticleRef.current || !reticleVisible) return;

    const position = reticleRef.current.position.clone();
    const id = Date.now();

    setModels([{ position, id }]);
    setReticleVisible(false);

    if (reticleRef.current) {
      reticleRef.current.visible = false;
    }
  };

  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      {models.map(({ position, id }) => (
        <group key={id}>
          <TempleModel
            position={position}
            rotation={[0, 0, 0]}
            scale={defaultScale}
          />
        </group>
      ))}

      {reticleVisible && (
        <group ref={reticleRef} visible={false}>
          <mesh rotation-x={-Math.PI / 2} onClick={placeModel}>
            <ringGeometry args={[0.2, 0.3, 32]} />
            <meshBasicMaterial color="white" opacity={0.5} transparent />
          </mesh>

          <mesh rotation-x={-Math.PI / 2} visible={false} onClick={placeModel}>
            <circleGeometry args={[0.5, 32]} />
            <meshBasicMaterial />
          </mesh>
        </group>
      )}
    </>
  );
};

export default HitTestAR;
