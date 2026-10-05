import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageNavbar() {
  const { t } = useLanguage();

  return (
    <nav>
      <a href="#home">{t("home")}</a>
      {" | "}
      <a href="#about">{t("about")}</a>
    </nav>
  );
}