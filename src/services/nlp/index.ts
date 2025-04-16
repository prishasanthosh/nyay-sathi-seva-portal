
// NLP Service main export file
import { analyzeSentiment } from './sentimentAnalysis';
import { classifyComplaint } from './complaintClassification';
import { detectLanguage, translateText } from './translationService';
import { findSimilarComplaints } from './similarityDetection';

export {
  analyzeSentiment,
  classifyComplaint,
  detectLanguage,
  translateText,
  findSimilarComplaints,
};
