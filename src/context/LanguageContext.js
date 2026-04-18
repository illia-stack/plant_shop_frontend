import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {

  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "en"
  );

  // 👉 Sprache im localStorage speichern
  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  // 👉 Sprache wechseln
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};