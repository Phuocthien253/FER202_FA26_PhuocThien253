import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageFooter() {
  const { t } = useLanguage();

  return (
    <footer>
      <p>{t("footer")}</p>
    </footer>
  );
}