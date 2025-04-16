
// NLP Service main export file
import { analyzeSentiment, SentimentResult } from './sentimentAnalysis';
import { classifyComplaint, ClassificationResult, Department } from './complaintClassification';
import { detectLanguage, translateText, LanguageDetectionResult, TranslationResult, SupportedLanguage } from './translationService';
import { findSimilarComplaints, ComplaintSummary, SimilarityResult } from './similarityDetection';

export {
  // Functions
  analyzeSentiment,
  classifyComplaint,
  detectLanguage,
  translateText,
  findSimilarComplaints,
  
  // Types
  SentimentResult,
  ClassificationResult,
  Department,
  LanguageDetectionResult,
  TranslationResult,
  SupportedLanguage,
  ComplaintSummary,
  SimilarityResult
};
