import React, { createContext, useState, useContext, ReactNode } from 'react';

// Available languages
export type Language = 'en' | 'hi' | 'ta';

// Translation dictionary type
type TranslationDict = {
  [key: string]: {
    [lang in Language]: string;
  };
};

// Create translations dictionary
const translations: TranslationDict = {
  // Navigation
  'home': {
    en: 'Home',
    hi: 'होम',
    ta: 'முகப்பு',
  },
  'about': {
    en: 'About',
    hi: 'हमारे बारे में',
    ta: 'எங்களை பற்றி',
  },
  'dashboard': {
    en: 'Dashboard',
    hi: 'डैशबोर्ड',
    ta: 'டாஷ்போர்டு',
  },
  'grievances': {
    en: 'Grievances',
    hi: 'शिकायतें',
    ta: 'குறைகள்',
  },
  'login': {
    en: 'Login',
    hi: 'लॉगिन',
    ta: 'உள்நுழைய',
  },
  'register': {
    en: 'Register',
    hi: 'रजिस्टर',
    ta: 'பதிவு செய்ய',
  },
  'logout': {
    en: 'Logout',
    hi: 'लॉगआउट',
    ta: 'வெளியேறு',
  },
  
  // Hero
  'hero_title': {
    en: 'Nyay Sathi Seva Portal',
    hi: 'न्याय साथी सेवा पोर्टल',
    ta: 'நியாய் சாதி சேவா போர்டல்',
  },
  'hero_subtitle': {
    en: 'Your voice matters. We are here to listen and help.',
    hi: 'आपकी आवाज़ मायने रखती है। हम सुनने और मदद करने के लिए यहां हैं।',
    ta: 'உங்கள் குரல் முக்கியம். நாங்கள் கேட்க மற்றும் உதவ இங்கே இருக்கிறோம்.',
  },
  'file_grievance': {
    en: 'File a Grievance',
    hi: 'शिकायत दर्ज करें',
    ta: 'குறை தாக்கல் செய்யுங்கள்',
  },
  'track_grievance': {
    en: 'Track Grievance',
    hi: 'शिकायत की स्थिति जानें',
    ta: 'குறையை கண்காணிக்க',
  },
  
  // Form fields
  'name': {
    en: 'Name',
    hi: 'नाम',
    ta: 'பெயர்',
  },
  'email': {
    en: 'Email',
    hi: 'ईमेल',
    ta: 'மின்னஞ்சல்',
  },
  'phone': {
    en: 'Phone',
    hi: 'फोन',
    ta: 'தொலைபேசி',
  },
  'address': {
    en: 'Address',
    hi: 'पता',
    ta: 'முகவரி',
  },
  'state': {
    en: 'State',
    hi: 'राज्य',
    ta: 'மாநிலம்',
  },
  'district': {
    en: 'District',
    hi: 'जिला',
    ta: 'மாவட்டம்',
  },
  'grievance_type': {
    en: 'Grievance Type',
    hi: 'शिकायत का प्रकार',
    ta: 'குறை வகை',
  },
  'subject': {
    en: 'Subject',
    hi: 'विषय',
    ta: 'பொருள்',
  },
  'description': {
    en: 'Description',
    hi: 'विवरण',
    ta: 'விளக்கம்',
  },
  'attachment': {
    en: 'Attachment',
    hi: 'अटैचमेंट',
    ta: 'இணைப்பு',
  },
  'submit': {
    en: 'Submit',
    hi: 'सबमिट',
    ta: 'சமர்ப்பிக்க',
  },
  'cancel': {
    en: 'Cancel',
    hi: 'रद्द करें',
    ta: 'ரத்து செய்',
  },
  
  // Status
  'pending': {
    en: 'Pending',
    hi: 'लंबित',
    ta: 'நிலுவையில்',
  },
  'in_progress': {
    en: 'In Progress',
    hi: 'प्रगति पर',
    ta: 'செயல்பாட்டில்',
  },
  'resolved': {
    en: 'Resolved',
    hi: 'हल किया गया',
    ta: 'தீர்க்கபட்டது',
  },
  'rejected': {
    en: 'Rejected',
    hi: 'अस्वीकृत',
    ta: 'நிராகரிக்கப்பட்டது',
  },
  
  // Dashboard
  'my_grievances': {
    en: 'My Grievances',
    hi: 'मेरी शिकायतें',
    ta: 'எனது குறைகள்',
  },
  'grievance_id': {
    en: 'Grievance ID',
    hi: 'शिकायत आईडी',
    ta: 'குறை ஐடி',
  },
  'date_filed': {
    en: 'Date Filed',
    hi: 'दाखिल करने की तारीख',
    ta: 'தாக்கல் செய்த தேதி',
  },
  'status': {
    en: 'Status',
    hi: 'स्थिति',
    ta: 'நிலை',
  },
  'view_details': {
    en: 'View Details',
    hi: 'विवरण देखें',
    ta: 'விவரங்களைப் பார்க்க',
  },
  
  // Footer
  'contact_us': {
    en: 'Contact Us',
    hi: 'संपर्क करें',
    ta: 'எங்களை தொடர்பு கொள்ள',
  },
  'terms': {
    en: 'Terms of Service',
    hi: 'सेवा की शर्तें',
    ta: 'சேவை விதிமுறைகள்',
  },
  'privacy': {
    en: 'Privacy Policy',
    hi: 'गोपनीयता नीति',
    ta: 'தனியுரிமைக் கொள்கை',
  },
  'faq': {
    en: 'FAQs',
    hi: 'अक्सर पूछे जाने वाले प्रश्न',
    ta: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
  },
  
  // Authentication
  'signin': {
    en: 'Sign In',
    hi: 'साइन इन',
    ta: 'உள்நுழைக',
  },
  'signup': {
    en: 'Sign Up',
    hi: 'साइन अप',
    ta: 'பதிவு செய்க',
  },
  'password': {
    en: 'Password',
    hi: 'पासवर्ड',
    ta: 'கடவுச்சொல்',
  },
  'confirm_password': {
    en: 'Confirm Password',
    hi: 'पासवर्ड की पुष्टि करें',
    ta: 'கடவுச்சொல்லை உறுதிப்படுத்துக',
  },
  'forgot_password': {
    en: 'Forgot Password?',
    hi: 'पासवर्ड भूल गए?',
    ta: 'கடவுச்சொல் மறந்துவிட்டதா?',
  },
  'or': {
    en: 'OR',
    hi: 'या',
    ta: 'அல்லது',
  },
  'continue_with': {
    en: 'Continue with',
    hi: 'के साथ जारी रखें',
    ta: 'தொடரவும்',
  },
  
  // Placeholders
  'enter_name': {
    en: 'Enter your name',
    hi: 'अपना नाम दर्ज करें',
    ta: 'உங்கள் பெயரை உள்ளிடவும்',
  },
  'enter_email': {
    en: 'Enter your email',
    hi: 'अपना ईमेल दर्ज करें',
    ta: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
  },
  'enter_password': {
    en: 'Enter your password',
    hi: 'अपना पासवर्ड दर्ज करें',
    ta: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
  },
  'enter_phone': {
    en: 'Enter your phone number',
    hi: 'अपना फोन नंबर दर्ज करें',
    ta: 'உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்',
  },
  'describe_grievance': {
    en: 'Describe your grievance in detail',
    hi: 'अपनी शिकायत का विस्तार से वर्णन करें',
    ta: 'உங்கள் குறையை விரிவாக விவரிக்கவும்',
  },
  
  // NLP & Grievance Analysis
  'analyze_and_submit': {
    en: 'Analyze & Submit',
    hi: 'विश्लेषण करें और जमा करें',
    ta: 'பகுப்பாய்வு & சமர்ப்பிக்க',
  },
  'file_grievance_description': {
    en: 'Submit your complaint and our system will automatically route it to the right department.',
    hi: 'अपनी शिकायत दर्ज करें और हमारा सिस्टम स्वचालित रूप से इसे सही विभाग में भेज देगा।',
    ta: 'உங்கள் புகாரைச் சமர்ப்பிக்கவும், எங்கள் அமைப்பு தானாகவே அதை சரியான துறைக்கு வழிநடத்தும்.',
  },
  'grievance_submitted': {
    en: 'Your grievance has been submitted successfully.',
    hi: 'आपकी शिकायत सफलतापूर्वक दर्ज कर ली गई है।',
    ta: 'உங்கள் குறை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது.',
  },
  'success': {
    en: 'Success',
    hi: 'सफलता',
    ta: 'வெற்றி',
  },
  'error': {
    en: 'Error',
    hi: 'त्रुटि',
    ta: 'பிழை',
  },
  'error_analyzing': {
    en: 'Error analyzing your grievance. Please try again.',
    hi: 'आपकी शिकायत का विश्लेषण करने में त्रुटि। कृपया पुनः प्रयास करें।',
    ta: 'உங்கள் குறையை பகுப்பாய்வு செய்வதில் பிழை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
  },
  'error_submitting': {
    en: 'Error submitting your grievance. Please try again.',
    hi: 'आपकी शिकायत जमा करने में त्रुटि। कृपया पुनः प्रयास करें।',
    ta: 'உங்கள் குறையைச் சமர்ப்பிப்பதில் பிழை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
  },
  'incident_date': {
    en: 'Incident Date',
    hi: 'घटना की तारीख',
    ta: 'சம்பவ தேதி',
  },
  'select_date': {
    en: 'Select date',
    hi: 'तारीख़ चुनें',
    ta: 'தேதியைத் தேர்ந்தெடுக்கவும்',
  },
};

// Context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
