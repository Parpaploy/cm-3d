import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";

function Navbar({
  onBack,
  isOpen,
  setIsOpen,
}: {
  onBack?: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const navigator = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigator("/");
    }
  };

  return (
    // <div className="pointer-events-auto px-5 fixed top-0 left-0 flex justify-between items-center z-1000 h-[10svh] w-full bg-[linear-gradient(180deg,#FFEFCB_0%,#FFCC9F_100%)]">
    <div className="pointer-events-auto px-5 fixed top-0 left-0 flex justify-between items-center z-1000 h-[10svh] w-full">
      <button className="pointer-events-auto" onClick={handleBack}>
        <img src="/imgs/Icon ionic-ios-arrow-back.svg" alt="back" />
      </button>

      <button
        className="text-[48px] z-999 pointer-events-auto"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <LuEye /> : <LuEyeClosed />}
      </button>
    </div>
  );
}

export default Navbar;
