import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { Vector3 } from "three";

interface TempleProps {
  position: Vector3;
  rotation: [number, number, number];
  scale: number;
}

export default function TempleModel({
  position,
  rotation,
  scale,
}: TempleProps) {
  // const { scene } = useGLTF("/models/pagoda.glb");
  const { scene } = useGLTF("/models/วัดเจดีย์หลวงวรวิหาร_001.glb");

  scene.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const geometry = child.geometry as THREE.BufferGeometry;
    const hasUV = !!geometry.getAttribute("uv");

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    const newMaterials = materials.map((mat) => {
      if (mat instanceof THREE.MeshStandardMaterial) {
        const cloned = mat.clone();
        cloned.roughness = 1;
        cloned.metalness = 0.5;

        if (!hasUV) {
          cloned.map = null;
          cloned.normalMap = null;
          cloned.roughnessMap = null;
          cloned.metalnessMap = null;
        }

        return cloned;
      }

      return new THREE.MeshStandardMaterial({
        color:
          (mat as THREE.Material & { color?: THREE.Color }).color ??
          new THREE.Color(0xffffff),
        roughness: 1,
        metalness: 0,
      });
    });

    child.material = Array.isArray(child.material)
      ? newMaterials
      : newMaterials[0];
  });

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}

useGLTF.preload("/models/วัดเจดีย์หลวงวรวิหาร_001.glb");
