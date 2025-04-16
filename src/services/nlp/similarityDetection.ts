
/**
 * Similarity Detection Service
 * Finds similar complaints to reduce redundancy
 */

export type ComplaintSummary = {
  id: string;
  text: string;
  department: string;
  status: string;
  createdAt: Date;
};

export type SimilarityResult = {
  similarComplaints: ComplaintSummary[];
  highestSimilarityScore: number; // 0 to 1
};

/**
 * Finds complaints similar to the provided text
 * @param text The complaint text to compare
 * @param existingComplaints Array of existing complaints to check against
 * @returns SimilarityResult with similar complaints and highest similarity score
 */
export const findSimilarComplaints = async (
  text: string,
  existingComplaints: ComplaintSummary[]
): Promise<SimilarityResult> => {
  try {
    // In a real implementation, this would use embeddings or more sophisticated methods
    // For now, we'll use a basic word overlap similarity
    
    const words = new Set(text.toLowerCase().split(/\s+/).filter(word => word.length > 3));
    const similarComplaints: ComplaintSummary[] = [];
    let highestSimilarityScore = 0;
    
    for (const complaint of existingComplaints) {
      const complaintWords = new Set(
        complaint.text.toLowerCase().split(/\s+/).filter(word => word.length > 3)
      );
      
      // Count words in common
      let commonWords = 0;
      for (const word of words) {
        if (complaintWords.has(word)) {
          commonWords++;
        }
      }
      
      // Calculate Jaccard similarity 
      const totalUniqueWords = new Set([...words, ...complaintWords]).size;
      const similarity = totalUniqueWords > 0 ? commonWords / totalUniqueWords : 0;
      
      if (similarity > 0.3) { // Consider similar if more than 30% similar
        similarComplaints.push(complaint);
        highestSimilarityScore = Math.max(highestSimilarityScore, similarity);
      }
    }
    
    return {
      similarComplaints: similarComplaints.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
      highestSimilarityScore
    };
  } catch (error) {
    console.error('Error in similarity detection:', error);
    return { similarComplaints: [], highestSimilarityScore: 0 };
  }
};
