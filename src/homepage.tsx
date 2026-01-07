import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigator = useNavigate();

  return (
    <div className="svw min-h-svh svh flex flex-col justify-between items-center">
      Homepage
      <button
        onClick={() => {
          navigator("/ar");
        }}
      >
        AR
      </button>
    </div>
  );
}
