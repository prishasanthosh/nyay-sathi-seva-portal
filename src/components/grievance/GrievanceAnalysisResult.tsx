
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import type { Department } from '@/services/nlp/complaintClassification';

// Map departments to human-readable names
const departmentNames: Record<Department, string> = {
  water: 'Water Department',
  electricity: 'Electricity Department',
  roads: 'Roads & Infrastructure',
  sanitation: 'Sanitation Department',
  public_health: 'Public Health Department',
  education: 'Education Department',
  transport: 'Transport Department',
  general: 'General Administration',
  housing: 'Housing Department',
  land: 'Land & Revenue Department'
};

interface GrievanceAnalysisResultProps {
  analysis: any;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const GrievanceAnalysisResult: React.FC<GrievanceAnalysisResultProps> = ({
  analysis,
  onSubmit,
  onBack,
  isSubmitting
}) => {
  const { t } = useLanguage();
  
  // Get the detected language display name
  const getLanguageName = (code: string) => {
    switch(code) {
      case 'en': return 'English';
      case 'hi': return 'Hindi';
      case 'ta': return 'Tamil';
      default: return code;
    }
  };
  
  if (analysis.isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h3 className="text-xl font-medium">Analyzing your grievance...</h3>
        <p className="text-muted-foreground mt-2">
          Our AI is processing your complaint to ensure it reaches the right department.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Form
      </Button>
      
      <h2 className="text-2xl font-bold">Analysis Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department Classification */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Department Classification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2">
              <span className="text-2xl font-semibold mr-2">
                {analysis.classification ? 
                  departmentNames[analysis.classification.department] : 
                  'General Administration'
                }
              </span>
              <Badge variant="secondary">
                {analysis.classification ? 
                  `${Math.round(analysis.classification.confidence * 100)}% confidence` : 
                  'Not classified'
                }
              </Badge>
            </div>
            
            {analysis.classification?.tags && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Keywords detected:</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.classification.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Language & Translation */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Language Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className="text-2xl font-semibold mr-2">
                {analysis.languageDetection ? 
                  getLanguageName(analysis.languageDetection.detectedLanguage) : 
                  'Unknown'
                }
              </span>
              <Badge variant="secondary">
                {analysis.languageDetection ? 
                  `${Math.round(analysis.languageDetection.confidence * 100)}% confidence` : 
                  'Not detected'
                }
              </Badge>
            </div>
            
            {analysis.translation && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  {analysis.translation.sourceLanguage !== 'en' ? 
                    `Translated from ${getLanguageName(analysis.translation.sourceLanguage)} to English` : 
                    'No translation needed'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Urgency Assessment */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Urgency Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className={`text-2xl font-semibold mr-2 ${
                analysis.sentiment?.urgency === 'high' ? 'text-destructive' :
                analysis.sentiment?.urgency === 'medium' ? 'text-amber-500' :
                'text-green-500'
              }`}>
                {analysis.sentiment?.urgency ? 
                  analysis.sentiment.urgency.charAt(0).toUpperCase() + analysis.sentiment.urgency.slice(1) : 
                  'Low'
                }
              </span>
              
              {analysis.sentiment?.urgency === 'high' && (
                <AlertTriangle className="h-5 w-5 text-destructive" />
              )}
              
              {analysis.sentiment?.urgency === 'low' && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
            
            {analysis.sentiment && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Sentiment score: {analysis.sentiment.score.toFixed(2)}
                  {analysis.sentiment.score < -0.5 ? 
                    ' (Very negative)' : 
                    analysis.sentiment.score < 0 ?
                    ' (Somewhat negative)' :
                    ' (Neutral/Positive)'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Similar Complaints */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Similar Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            {analysis.similarity?.similarComplaints && 
            analysis.similarity.similarComplaints.length > 0 ? (
              <div>
                <p className="font-medium">Found {analysis.similarity.similarComplaints.length} similar complaints</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your complaint may be related to existing issues already reported.
                </p>
              </div>
            ) : (
              <p>No similar complaints found</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="border-t pt-6 mt-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-medium">Ready to submit?</h3>
            <p className="text-muted-foreground">
              Your grievance will be directed to the {analysis.classification ? 
                departmentNames[analysis.classification.department].toLowerCase() : 
                'appropriate department'
              }
            </p>
          </div>
          
          <Button 
            onClick={onSubmit} 
            disabled={isSubmitting} 
            className="sm:self-end"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('submit')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GrievanceAnalysisResult;
