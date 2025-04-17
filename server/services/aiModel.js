
// AI Model for Complaint Classification

/**
 * This is a trained model for complaint classification
 * In a production environment, this would interact with a proper ML model
 * For this example, we're using a rule-based approach with predefined keywords
 */

// Department mappings
const departmentMapping = {
  water: {
    code: 'WATER',
    name: 'Water Department'
  },
  electricity: {
    code: 'ELEC',
    name: 'Electricity Department'
  },
  roads: {
    code: 'ROADS',
    name: 'Roads & Infrastructure'
  },
  sanitation: {
    code: 'SANIT',
    name: 'Sanitation Department'
  },
  public_health: {
    code: 'HEALTH',
    name: 'Public Health Department'
  },
  education: {
    code: 'EDU',
    name: 'Education Department'
  },
  transport: {
    code: 'TRANS',
    name: 'Transport Department'
  },
  general: {
    code: 'GEN',
    name: 'General Administration'
  },
  housing: {
    code: 'HOUSE',
    name: 'Housing Department'
  },
  land: {
    code: 'LAND',
    name: 'Land & Revenue Department'
  }
};

/**
 * Classifies a complaint text to determine the appropriate department
 * @param {string} text - The complaint text to analyze
 * @returns {Object} Classification result with department, confidence and extracted tags
 */
const classifyComplaint = async (text) => {
  try {
    // In a real implementation, this would call a Python model API
    // For now, we'll use a simple keyword-based classification
    
    const departmentKeywords = {
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
    let bestMatch = 'general';
    let highestCount = 0;
    const tags = [];
    
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
        bestMatch = dept;
      }
    });
    
    // Calculate confidence based on keyword matches
    const confidence = highestCount > 0 ? Math.min(1, highestCount / 5) : 0.3;
    
    return {
      department: bestMatch,
      departmentCode: departmentMapping[bestMatch].code,
      departmentName: departmentMapping[bestMatch].name,
      confidence,
      tags
    };
  } catch (error) {
    console.error('Error in complaint classification:', error);
    return { 
      department: 'general', 
      departmentCode: 'GEN',
      departmentName: 'General Administration',
      confidence: 0, 
      tags: [] 
    };
  }
};

// Analyze sentiment and determine urgency
const analyzeSentiment = async (text) => {
  try {
    // Simple keyword-based sentiment analysis
    const urgentKeywords = [
      'urgent', 'emergency', 'immediately', 'danger', 'critical', 'life-threatening',
      'severe', 'serious', 'dying', 'death', 'fatal', 'collapse', 'accident'
    ];
    
    const negativeKeywords = [
      'bad', 'poor', 'terrible', 'awful', 'horrible', 'disgusting',
      'broken', 'faulty', 'useless', 'damaged', 'corrupt', 'failed'
    ];
    
    const lowercaseText = text.toLowerCase();
    
    // Check for urgent keywords
    let urgencyScore = 0;
    urgentKeywords.forEach(keyword => {
      if (lowercaseText.includes(keyword)) {
        urgencyScore += 0.2;
      }
    });
    
    // Check for negative sentiment
    let sentimentScore = 0;
    negativeKeywords.forEach(keyword => {
      if (lowercaseText.includes(keyword)) {
        sentimentScore -= 0.1;
      }
    });
    
    // Determine urgency level
    let urgency = 'medium';
    if (urgencyScore >= 0.4) {
      urgency = 'high';
    } else if (urgencyScore < 0.1 && sentimentScore > -0.2) {
      urgency = 'low';
    }
    
    return {
      score: sentimentScore,
      urgency
    };
  } catch (error) {
    console.error('Error in sentiment analysis:', error);
    return { score: 0, urgency: 'medium' };
  }
};

module.exports = {
  classifyComplaint,
  analyzeSentiment
};
