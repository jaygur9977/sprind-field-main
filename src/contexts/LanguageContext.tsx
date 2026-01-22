import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: Translations = {
  // Auth
  register: { en: 'Register', hi: 'रजिस्टर' },
  login: { en: 'Login', hi: 'लॉगिन' },
  logout: { en: 'Logout', hi: 'लॉगआउट' },
  
  // Form fields
  name: { en: 'Name', hi: 'नाम' },
  age: { en: 'Age', hi: 'उम्र' },
  mobileNumber: { en: 'Mobile Number', hi: 'मोबाइल नंबर' },
  allergies: { en: 'Previous Detected Allergies', hi: 'पहले पता चली एलर्जी' },
  healthProblems: { en: 'Health Problems', hi: 'स्वास्थ्य समस्याएं' },
  username: { en: 'Username', hi: 'यूजरनेम' },
  password: { en: 'Password', hi: 'पासवर्ड' },
  confirmPassword: { en: 'Confirm Password', hi: 'पासवर्ड की पुष्टि करें' },
  
  // Dashboard
  patientId: { en: 'Patient ID', hi: 'मरीज आईडी' },
  evidenceBook: { en: 'Evidence Book', hi: 'एविडेंस बुक' },
  yourDocuments: { en: 'Your Documents', hi: 'आपके डॉक्यूमेंट' },
  doctorPrescription: { en: 'Doctor Prescription', hi: 'डॉक्टर की पर्ची' },
  summary: { en: 'Summary', hi: 'सारांश' },
  
  // Placeholders
  enterName: { en: 'Enter your full name', hi: 'अपना पूरा नाम दर्ज करें' },
  enterAge: { en: 'Enter your age', hi: 'अपनी उम्र दर्ज करें' },
  enterMobile: { en: 'Enter mobile number', hi: 'मोबाइल नंबर दर्ज करें' },
  enterUsername: { en: 'Choose a username', hi: 'यूजरनेम चुनें' },
  enterPassword: { en: 'Create a password', hi: 'पासवर्ड बनाएं' },
  addAllergy: { en: 'Type allergy and press Enter', hi: 'एलर्जी टाइप करें और Enter दबाएं' },
  addProblem: { en: 'Type health problem and press Enter', hi: 'स्वास्थ्य समस्या टाइप करें और Enter दबाएं' },
  
  // Messages
  welcomeBack: { en: 'Welcome Back', hi: 'वापसी पर स्वागत है' },
  createAccount: { en: 'Create Account', hi: 'खाता बनाएं' },
  alreadyHaveAccount: { en: 'Already have an account?', hi: 'पहले से खाता है?' },
  dontHaveAccount: { en: "Don't have an account?", hi: 'खाता नहीं है?' },
  registrationSuccess: { en: 'Registration Successful!', hi: 'रजिस्ट्रेशन सफल!' },
  loginSuccess: { en: 'Login Successful!', hi: 'लॉगिन सफल!' },
  
  // Book content
  documentsContent: { 
    en: 'View and manage your medical documents, reports, and test results here.', 
    hi: 'अपने मेडिकल डॉक्यूमेंट, रिपोर्ट और टेस्ट रिजल्ट यहाँ देखें और मैनेज करें।' 
  },
  prescriptionContent: { 
    en: 'Access all prescriptions from your doctors. Track medications and dosages.', 
    hi: 'अपने डॉक्टरों की सभी पर्चियां देखें। दवाइयों और खुराक को ट्रैक करें।' 
  },
  summaryContent: { 
    en: 'A comprehensive summary of your health journey, conditions, and progress.', 
    hi: 'आपकी स्वास्थ्य यात्रा, स्थितियों और प्रगति का व्यापक सारांश।' 
  },
  
  // Toggles
  darkMode: { en: 'Dark', hi: 'डार्क' },
  lightMode: { en: 'Light', hi: 'लाइट' },
  english: { en: 'EN', hi: 'EN' },
  hindi: { en: 'हिंदी', hi: 'हिंदी' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
