import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import HitTestAR from "./components/hittest-ar";

const store = createXRStore();

export default function ARPage() {
  return (
    <>
      <button
        onClick={() => store.enterAR()}
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

      <Canvas>
        <XR store={store}>
          <HitTestAR />
        </XR>
      </Canvas>
    </>
  );
}
