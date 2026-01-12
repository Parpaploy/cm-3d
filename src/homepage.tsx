import { useNavigate } from "react-router-dom";
import LanguageButton from "./components/lang-btn";
import { useTranslation } from "react-i18next";
// import MarkerlessARPage from "./markerless-ar-page";

export default function Homepage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  // if (!isIOS) {
  //   return <MarkerlessARPage />;
  // }

  return (
    <div className="relative svw min-h-svh flex flex-col justify-center items-center mx-auto max-w-107.5">
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: 'url("/imgs/bg.svg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 20%",
          backgroundSize: "cover",
        }}
      />

      <div className="rounded-t-[83px] text-center absolute bottom-0 left-0 py-42 px-10 w-full h-[65%] bg-[linear-gradient(180deg,#FFEFCB_0%,#FFCC9F_100%)]">
        <div className="absolute -top-5 left-1/2 -translate-1/2 w-140">
          <img className="w-full h-full" src="/imgs/chedi1.png" />
        </div>

        <h1
          className="text-[#723D0F] text-[25px] font-bold mb-3"
          dangerouslySetInnerHTML={{ __html: t("header") }}
        />

        <LanguageButton />

        <button
          onClick={() => {
            navigate("/ar");
          }}
          className="mt-15 bg-[#B7663B] text-[20px] rounded-full py-2 px-10 font-bold text-white"
        >
          {t("start")}
        </button>
      </div>
    </div>
  );
}
