import { useTranslation } from "react-i18next";
import { useState } from "react";

function LanguageButton() {
  const { i18n } = useTranslation();

  type Language = "en" | "th";

  const getInitialLang = (): Language => {
    if (i18n.language.startsWith("th")) return "th";
    return "en";
  };

  const [lang, setLang] = useState<Language>(getInitialLang());

  const handleChange = (selectedLang: Language) => {
    setLang(selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  return (
    <div className="flex items-center gap-5 px-2 py-1 justify-center text-black text-[16px] font-normal">
      <label className="flex items-center gap-1 cursor-pointer">
        <span
          className={`w-4 h-4 rounded-full border-2 p-0.5 border-black flex items-center justify-center ${
            lang === "en" ? "bg-transparent" : "bg-transparent"
          }`}
        >
          {lang === "en" && (
            <span className="w-full h-full bg-black rounded-full"></span>
          )}
        </span>
        EN
        <input
          type="radio"
          name="language"
          value="en"
          checked={lang === "en"}
          onChange={() => handleChange("en")}
          className="hidden"
        />
      </label>

      <span>|</span>

      <label className="flex items-center gap-1 cursor-pointer">
        <span
          className={`w-4 h-4 rounded-full border-2 p-0.5 border-black flex items-center justify-center ${
            lang === "th" ? "bg-transparent" : "bg-transparent"
          }`}
        >
          {lang === "th" && (
            <span className="w-2 h-2 bg-black rounded-full"></span>
          )}
        </span>
        ไทย
        <input
          type="radio"
          name="language"
          value="th"
          checked={lang === "th"}
          onChange={() => handleChange("th")}
          className="hidden"
        />
      </label>
    </div>
  );
}

export default LanguageButton;
