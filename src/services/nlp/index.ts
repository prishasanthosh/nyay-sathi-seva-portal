
// NLP Service main export file
import { analyzeSentiment, SentimentResult } from './sentimentAnalysis';
import { classifyComplaint, ClassificationResult, Department } from './complaintClassification';
import { 
  detectLanguage, 
  translateText, 
  LanguageDetectionResult, 
  TranslationResult, 
  SupportedLanguage 
} from './translationService';
import { 
  findSimilarComplaints, 
  ComplaintSummary, 
  SimilarityResult 
} from './similarityDetection';

export {
  // Functions
  analyzeSentiment,
  classifyComplaint,
  detectLanguage,
  translateText,
  findSimilarComplaints,
  
  // Types
  export type SentimentResult,
  export type ClassificationResult,
  export type Department,
  export type LanguageDetectionResult,
  export type TranslationResult,
  export type SupportedLanguage,
  export type ComplaintSummary,
  export type SimilarityResult
};

