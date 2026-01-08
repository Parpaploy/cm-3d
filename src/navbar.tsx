import { useNavigate } from "react-router-dom";

function Navbar({ onBack }: { onBack?: () => void }) {
  const navigator = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigator("/");
    }
  };

  return (
    <div className="pointer-events-auto px-5 fixed top-0 left-0 flex justify-between items-center z-1000 h-[10svh] w-full bg-[linear-gradient(180deg,#FFEFCB_0%,#FFCC9F_100%)]">
      <button className="pointer-events-auto" onClick={handleBack}>
        <img src="/imgs/Icon ionic-ios-arrow-back.svg" alt="back" />
      </button>
    </div>
  );
}

export default Navbar;
