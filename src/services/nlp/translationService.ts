
/**
 * Translation Service
 * Handles language detection and translation of complaints
 */

export type SupportedLanguage = 'en' | 'hi' | 'ta';

export type LanguageDetectionResult = {
  detectedLanguage: SupportedLanguage;
  confidence: number; // 0 to 1
};

export type TranslationResult = {
  originalText: string;
  translatedText: string;
  sourceLanguage: SupportedLanguage;
  targetLanguage: SupportedLanguage;
};

/**
 * Detects the language of the provided text
 * @param text The text to analyze
 * @returns LanguageDetectionResult with detected language code and confidence
 */
export const detectLanguage = async (text: string): Promise<LanguageDetectionResult> => {
  try {
    // In a real implementation, this would call a language detection API
    // For now, we'll use a basic detection based on character sets
    
    // Simple rules to detect language
    const hindiPattern = /[\u0900-\u097F]/; // Hindi Unicode range
    const tamilPattern = /[\u0B80-\u0BFF]/; // Tamil Unicode range
    
    if (hindiPattern.test(text)) {
      return { detectedLanguage: 'hi', confidence: 0.9 };
    } else if (tamilPattern.test(text)) {
      return { detectedLanguage: 'ta', confidence: 0.9 };
    } else {
      return { detectedLanguage: 'en', confidence: 0.8 };
    }
  } catch (error) {
    console.error('Error in language detection:', error);
    return { detectedLanguage: 'en', confidence: 0.5 };
  }
};

/**
 * Translates text from one language to another
 * @param text The text to translate
 * @param sourceLanguage The source language code (auto-detect if not provided)
 * @param targetLanguage The target language code
 * @returns TranslationResult with original and translated text
 */
export const translateText = async (
  text: string, 
  targetLanguage: SupportedLanguage = 'en',
  sourceLanguage?: SupportedLanguage
): Promise<TranslationResult> => {
  try {
    // If source language is not provided, detect it
    if (!sourceLanguage) {
      const detection = await detectLanguage(text);
      sourceLanguage = detection.detectedLanguage;
    }
    
    // If source and target languages are the same, no translation needed
    if (sourceLanguage === targetLanguage) {
      return {
        originalText: text,
        translatedText: text,
        sourceLanguage,
        targetLanguage
      };
    }
    
    // In a real implementation, this would call a translation API
    // For now, we'll use a mock implementation with some common phrases
    const translations: Record<string, Record<SupportedLanguage, string>> = {
      'water problem': {
        'en': 'water problem',
        'hi': 'पानी की समस्या',
        'ta': 'தண்ணீர் பிரச்சனை'
      },
      'electricity issue': {
        'en': 'electricity issue',
        'hi': 'बिजली की समस्या',
        'ta': 'மின்சார பிரச்சனை'
      },
      'road maintenance': {
        'en': 'road maintenance',
        'hi': 'सड़क रखरखाव',
        'ta': 'சாலை பராமரிப்பு'
      }
    };
    
    // Simple mock translation
    let translatedText = text;
    
    // Replace known phrases
    Object.entries(translations).forEach(([phrase, langMap]) => {
      if (text.toLowerCase().includes(phrase) && sourceLanguage === 'en') {
        translatedText = translatedText.replace(
          new RegExp(phrase, 'gi'), 
          langMap[targetLanguage]
        );
      } else if (sourceLanguage !== 'en') {
        // Find any non-English phrases and replace with English
        const nonEnglishPhrase = langMap[sourceLanguage];
        if (text.includes(nonEnglishPhrase)) {
          translatedText = translatedText.replace(
            nonEnglishPhrase, 
            targetLanguage === 'en' ? phrase : langMap[targetLanguage]
          );
        }
      }
    });
    
    return {
      originalText: text,
      translatedText,
      sourceLanguage,
      targetLanguage
    };
  } catch (error) {
    console.error('Error in translation:', error);
    return {
      originalText: text,
      translatedText: text,
      sourceLanguage: sourceLanguage || 'en',
      targetLanguage
    };
  }
};
