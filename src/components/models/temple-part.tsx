import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

interface TempleProps {
  scale: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function TemplePart({ scale, position, rotation }: TempleProps) {
  // const gltf = useGLTF("/models/pagoda.glb");
  const gltf = useGLTF("/models/วัดเจดีย์หลวงวรวิหาร_ส่วนบนเจดีย์.glb");

  const model = gltf.scene;

  model.traverse((child) => {
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
      object={model}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

useGLTF.preload("/models/วัดเจดีย์หลวงวรวิหาร_ส่วนบนเจดีย์.glb");
