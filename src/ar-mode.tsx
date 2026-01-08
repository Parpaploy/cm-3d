import ARPage from "./ar-page";
import MarkerlessARPage from "./markerless-ar-page";

const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !(window as unknown as { MSStream?: unknown }).MSStream;
const isAndroid = /Android/.test(navigator.userAgent);

export default function ARMode() {
  return (
    <>
      {isAndroid && <MarkerlessARPage />}
      {isIOS && <ARPage />}
    </>
  );
}
