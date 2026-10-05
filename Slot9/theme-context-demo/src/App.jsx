import { LanguageProvider } from "./contexts/LanguageContext";

import LanguageHeader from "./components/LanguageHeader";
import LanguageNavbar from "./components/LanguageNavbar";
import LanguageHome from "./components/LanguageHome";
import LanguageFooter from "./components/LanguageFooter";

export default function App() {
  return (
    <LanguageProvider>
      <LanguageHeader />
      <LanguageNavbar />
      <LanguageHome />
      <LanguageFooter />
    </LanguageProvider>
  );
}