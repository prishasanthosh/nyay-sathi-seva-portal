import { useState } from 'react';
import { grievanceAPI } from '@/services/api';
import type { 
  SentimentResult, 
  ClassificationResult, 
  LanguageDetectionResult, 
  TranslationResult,
  ComplaintSummary,
  SimilarityResult
} from '@/services/nlp';
import {
  analyzeSentiment,
  classifyComplaint,
  detectLanguage,
  translateText,
  findSimilarComplaints,
} from '@/services/nlp';

type NlpAnalysisState = {
  isAnalyzing: boolean;
  sentiment?: SentimentResult;
  classification?: ClassificationResult;
  languageDetection?: LanguageDetectionResult;
  translation?: TranslationResult;
  similarity?: SimilarityResult;
};

type NlpAnalysisResult = NlpAnalysisState & {
  error?: string;
};

/**
 * Hook for analyzing complaint text using NLP services
 * Now integrated with backend API
 */
export const useNlpAnalysis = () => {
  const [state, setState] = useState<NlpAnalysisState>({
    isAnalyzing: false
  });

  /**
   * Analyze complaint text using all NLP services (now via the backend)
   */
  const analyzeComplaint = async (
    text: string, 
    existingComplaints: ComplaintSummary[] = []
  ): Promise<NlpAnalysisResult> => {
    try {
      setState(prev => ({ ...prev, isAnalyzing: true }));
      
      // For now, use the frontend implementation as the backend integration
      // is not complete. In a real project, this would call the backend API.
      const response = await fetch('/api/analyze-complaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, existingComplaints }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze complaint');
      }
      
      const data = await response.json();
      
      const result = {
        isAnalyzing: false,
        ...data
      };
      
      setState(result);
      return result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error during NLP analysis';
      console.error('Error in NLP analysis:', error);
      
      // Fallback to frontend implementation
      // This would be removed in a real project where the backend is fully implemented
      const languageDetection = await detectLanguage(text);
      
      // 2. Translate to English if needed
      let translatedText = text;
      let translation: TranslationResult | undefined;
      
      if (languageDetection.detectedLanguage !== 'en') {
        translation = await translateText(
          text, 
          'en', 
          languageDetection.detectedLanguage
        );
        translatedText = translation.translatedText;
      }
      
      // 3. Analyze sentiment of translated text
      const sentiment = await analyzeSentiment(translatedText);
      
      // 4. Classify complaint to determine department
      const classification = await classifyComplaint(translatedText);
      
      // 5. Find similar complaints
      const similarity = await findSimilarComplaints(translatedText, existingComplaints);
      
      const result = {
        isAnalyzing: false,
        sentiment,
        classification,
        languageDetection,
        translation,
        similarity
      };

      setState(prev => ({ ...prev, isAnalyzing: false }));
      return { ...state, isAnalyzing: false, error: errorMsg };
    }
  };
  
  return {
    ...state,
    analyzeComplaint
  };
};
