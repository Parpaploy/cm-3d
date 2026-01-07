import AR from "./ar";
import HittestAR from "./hittest-ar-page";

const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !(window as unknown as { MSStream?: unknown }).MSStream;
const isAndroid = /Android/.test(navigator.userAgent);

function ARPage() {
  return (
    <>
      {isAndroid && <HittestAR />}
      {isIOS && <AR />}
    </>
  );
}

export default ARPage;
