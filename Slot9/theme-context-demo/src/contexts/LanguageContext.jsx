import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

const LanguageContext = createContext(null);

const translations = {
  vi: {
    appName: "Ứng dụng của tôi",
    home: "Trang chủ",
    about: "Giới thiệu",
    welcome: "Chào mừng bạn đến với ứng dụng",
    description: "Đây là ví dụ sử dụng useContext để thay đổi ngôn ngữ.",
    footer: "© 2026 FER202 - Bảo lưu mọi quyền",
    switchLanguage: "English",
  },

  en: {
    appName: "My Application",
    home: "Home",
    about: "About",
    welcome: "Welcome to the application",
    description: "This is an example of using useContext to change language.",
    footer: "© 2026 FER202 - All rights reserved",
    switchLanguage: "Tiếng Việt",
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("vi");

  const switchLang = useCallback(() => {
    setLang((current) =>
      current === "vi" ? "en" : "vi"
    );
  }, []);

  const t = useCallback(
    (key) => {
      return translations[lang][key] ?? key;
    },
    [lang]
  );

  const value = useMemo(
    () => ({
      lang,
      t,
      switchLang,
    }),
    [lang, t, switchLang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === null) {
    throw new Error(
      "useLanguage phải được dùng bên trong <LanguageProvider>"
    );
  }

  return context;
}