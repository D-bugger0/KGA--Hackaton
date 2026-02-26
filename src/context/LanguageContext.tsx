import { createContext, useContext, useState } from 'react';

// Defining the 11 South African languages + English
export type LanguageCode = 
  | 'english' | 'isizulu' | 'isixhosa' | 'afrikaans' 
  | 'sesotho' | 'sepedi' | 'isindebele' | 'tshivenda' 
  | 'xitswana' | 'siswati' | 'setswana';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>('english');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};