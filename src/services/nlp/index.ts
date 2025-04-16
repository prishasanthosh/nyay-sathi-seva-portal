
// NLP Service main export file
import { analyzeSentiment } from './sentimentAnalysis';
import type { SentimentResult } from './sentimentAnalysis';
import { classifyComplaint } from './complaintClassification';
import type { ClassificationResult, Department } from './complaintClassification';
import { detectLanguage, translateText } from './translationService';
import type { 
  LanguageDetectionResult, 
  TranslationResult, 
  SupportedLanguage 
} from './translationService';
import { findSimilarComplaints } from './similarityDetection';
import type { 
  ComplaintSummary, 
  SimilarityResult 
} from './similarityDetection';

// Export the functions
export {
  analyzeSentiment,
  classifyComplaint,
  detectLanguage,
  translateText,
  findSimilarComplaints,
};

// Export the types
export type {
  SentimentResult,
  ClassificationResult,
  Department,
  LanguageDetectionResult,
  TranslationResult,
  SupportedLanguage,
  ComplaintSummary,
  SimilarityResult
};
