import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageHome() {
  const { t } = useLanguage();

  return (
    <main id="home">
      <h1>{t("welcome")}</h1>

      <p>{t("description")}</p>
    </main>
  );
}