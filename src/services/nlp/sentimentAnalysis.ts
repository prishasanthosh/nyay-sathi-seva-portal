
/**
 * Sentiment Analysis Service
 * Analyzes the sentiment of text to determine urgency and priority
 */

export type SentimentResult = {
  score: number; // -1 to 1 where -1 is very negative, 1 is very positive
  magnitude: number; // 0 to infinity, indicating the strength of emotion
  urgency: 'low' | 'medium' | 'high';
};

/**
 * Analyzes the sentiment of the provided text
 * @param text The text to analyze
 * @returns SentimentResult with score, magnitude and urgency
 */
export const analyzeSentiment = async (text: string): Promise<SentimentResult> => {
  try {
    // In a real implementation, this would call a Python NLP service
    // For now, we'll use a simple mock implementation
    
    // Count negative words as a basic sentiment analysis
    const negativeWords = ['issue', 'problem', 'broken', 'terrible', 'bad', 
                          'urgent', 'emergency', 'dangerous', 'unsafe', 'critical'];
    
    let negativeCount = 0;
    const words = text.toLowerCase().split(/\s+/);
    
    for (const word of words) {
      if (negativeWords.includes(word)) {
        negativeCount++;
      }
    }
    
    const score = Math.max(-1, Math.min(1, -(negativeCount / 10))); // Scale to -1 to 1
    const magnitude = Math.abs(score) * 2; // Simple magnitude calculation
    
    // Determine urgency based on score
    let urgency: 'low' | 'medium' | 'high';
    if (score < -0.5) {
      urgency = 'high';
    } else if (score < 0) {
      urgency = 'medium';
    } else {
      urgency = 'low';
    }
    
    return { 
      score,
      magnitude,
      urgency
    };
  } catch (error) {
    console.error('Error in sentiment analysis:', error);
    return { score: 0, magnitude: 0, urgency: 'low' };
  }
};
