import { useNavigate } from "react-router-dom";
import LanguageButton from "./components/lang-btn";
import { useTranslation } from "react-i18next";
import MarkerlessARPage from "./markerless-ar-page";

export default function Homepage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (!isIOS) {
    return <MarkerlessARPage />;
  }

  return (
    <div className="relative svw min-h-svh flex flex-col justify-center items-center mx-auto max-w-[430px]">
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: 'url("/imgs/bg.svg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 20%",
          backgroundSize: "cover",
        }}
      />

      <div className="rounded-t-[83px] text-center absolute bottom-0 left-0 py-18 px-10 w-full h-[55%] bg-[linear-gradient(180deg,#FFEFCB_0%,#FFCC9F_100%)]">
        <h1
          className="text-[#723D0F] text-[25px] font-bold mb-3"
          dangerouslySetInnerHTML={{ __html: t("header") }}
        />

        <LanguageButton />

        <button
          onClick={() => {
            navigate("/ar");
          }}
          className="mt-20 bg-[#B7663B] text-[20px] rounded-full py-2 px-10 font-bold text-white"
        >
          {t("start")}
        </button>
      </div>
    </div>
  );
}
