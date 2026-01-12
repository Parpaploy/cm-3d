import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

interface TempleProps {
  scale: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function Temple({ scale, position, rotation }: TempleProps) {
  // const gltf = useGLTF("/models/pagoda.glb");
  const gltf = useGLTF("/models/วัดเจดีย์หลวงวรวิหาร_001.glb");

  const model = gltf.scene;

  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const geometry = child.geometry as THREE.BufferGeometry;
    const hasUV = !!geometry.getAttribute("uv");

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    // const newMaterials = materials.map((mat) => {
    //   if (mat instanceof THREE.MeshStandardMaterial) {
    //     const cloned = mat.clone();
    //     cloned.roughness = 1;
    //     cloned.metalness = 0.5;

    //     if (!hasUV) {
    //       cloned.map = null;
    //       cloned.normalMap = null;
    //       cloned.roughnessMap = null;
    //       cloned.metalnessMap = null;
    //     }

    //     return cloned;
    //   }

    //   return new THREE.MeshStandardMaterial({
    //     color:
    //       (mat as THREE.Material & { color?: THREE.Color }).color ??
    //       new THREE.Color(0xffffff),
    //     roughness: 1,
    //     metalness: 0,
    //   });
    // });

    const newMaterials = materials.map((mat) => {
      if (mat instanceof THREE.MeshStandardMaterial) {
        const cloned = mat.clone();
        cloned.roughness = 1;
        cloned.metalness = 0.5;

        cloned.transparent = true;
        cloned.opacity = 0.5;

        if (!hasUV) {
          cloned.map = null;
          cloned.normalMap = null;
          cloned.roughnessMap = null;
          cloned.metalnessMap = null;
        }

        return cloned;
      }

      const fallback = new THREE.MeshStandardMaterial({
        color:
          (mat as THREE.Material & { color?: THREE.Color }).color ??
          new THREE.Color(0xffffff),
        roughness: 1,
        metalness: 0,
        transparent: true,
        opacity: 0.5,
      });

      return fallback;
    });

    child.material = Array.isArray(child.material)
      ? newMaterials
      : newMaterials[0];
  });

  return (
    <primitive
      object={model}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

useGLTF.preload("/models/วัดเจดีย์หลวงวรวิหาร_001.glb");
