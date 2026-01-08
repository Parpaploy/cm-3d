import { useTranslation } from "react-i18next";

export default function GlobalLoading() {
  const { t } = useTranslation("translation");

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 animate-spin rounded-full border-4 border-solid border-blue-300 border-t-transparent"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>

        <p className="text-lg font-semibold text-gray-700">{t("loading")}</p>
      </div>
    </div>
  );
}
