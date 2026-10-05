import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageHeader() {
  const { lang, t, switchLang } = useLanguage();

  return (
    <header>
      <h2>{t("appName")}</h2>

      <button onClick={switchLang}>
        {t("switchLanguage")}
      </button>

      <p>
        Current language: <b>{lang}</b>
      </p>
    </header>
  );
}