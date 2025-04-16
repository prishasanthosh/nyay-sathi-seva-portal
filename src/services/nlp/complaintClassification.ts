
/**
 * Complaint Classification Service
 * Classifies complaints to determine the appropriate department
 */

export type Department = 
  | 'water' 
  | 'electricity' 
  | 'roads' 
  | 'sanitation' 
  | 'public_health' 
  | 'education' 
  | 'transport'
  | 'general'
  | 'housing'
  | 'land';

export type ClassificationResult = {
  department: Department;
  confidence: number; // 0 to 1
  tags: string[]; // Keywords extracted from the text
};

/**
 * Classifies a complaint text to determine the appropriate department
 * @param text The complaint text to analyze
 * @returns ClassificationResult with department, confidence and extracted tags
 */
export const classifyComplaint = async (text: string): Promise<ClassificationResult> => {
  try {
    // In a real implementation, this would call a Python model API
    // For now, we'll use a simple keyword-based classification
    
    const departmentKeywords: Record<Department, string[]> = {
      water: ['water', 'pipe', 'leak', 'tap', 'supply', 'drainage', 'sewage', 'flood'],
      electricity: ['electricity', 'power', 'outage', 'blackout', 'voltage', 'electric', 'light', 'transformer'],
      roads: ['road', 'street', 'pothole', 'highway', 'traffic', 'signal', 'construction', 'bridge'],
      sanitation: ['garbage', 'waste', 'trash', 'clean', 'sanitation', 'dump', 'collection'],
      public_health: ['hospital', 'clinic', 'health', 'medical', 'doctor', 'disease', 'treatment'],
      education: ['school', 'college', 'education', 'university', 'teacher', 'student', 'classroom'],
      transport: ['bus', 'train', 'transport', 'metro', 'vehicle', 'schedule', 'delay'],
      housing: ['house', 'apartment', 'building', 'lease', 'rent', 'construction', 'roof'],
      land: ['land', 'property', 'ownership', 'survey', 'title', 'deed', 'encroachment'],
      general: ['general', 'administration', 'complaint', 'government', 'official', 'corruption']
    };
    
    const lowercaseText = text.toLowerCase();
    let bestMatch: Department = 'general';
    let highestCount = 0;
    const tags: string[] = [];
    
    // Count keyword matches for each department
    Object.entries(departmentKeywords).forEach(([dept, keywords]) => {
      let count = 0;
      
      keywords.forEach(keyword => {
        if (lowercaseText.includes(keyword)) {
          count++;
          if (!tags.includes(keyword)) {
            tags.push(keyword);
          }
        }
      });
      
      if (count > highestCount) {
        highestCount = count;
        bestMatch = dept as Department;
      }
    });
    
    // Calculate confidence based on keyword matches
    const confidence = highestCount > 0 ? Math.min(1, highestCount / 5) : 0.3;
    
    return {
      department: bestMatch,
      confidence,
      tags
    };
  } catch (error) {
    console.error('Error in complaint classification:', error);
    return { department: 'general', confidence: 0, tags: [] };
  }
};
