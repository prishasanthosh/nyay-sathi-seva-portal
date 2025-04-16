
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNlpAnalysis } from '@/hooks/useNlpAnalysis';
import { useToast } from '@/hooks/use-toast';
import GrievanceForm from '@/components/grievance/GrievanceForm';
import GrievanceAnalysisResult from '@/components/grievance/GrievanceAnalysisResult';
import PageHeader from '@/components/grievance/PageHeader';
import { Card, CardContent } from '@/components/ui/card';

const NewGrievance = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const nlpAnalysis = useNlpAnalysis();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnalysisResults, setShowAnalysisResults] = useState(false);
  
  const handleAnalyzeComplaint = async (formData: any) => {
    try {
      setIsSubmitting(true);
      const results = await nlpAnalysis.analyzeComplaint(formData.description);
      setShowAnalysisResults(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error analyzing complaint:', error);
      toast({
        title: t('error'),
        description: t('error_analyzing'),
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };
  
  const handleSubmitGrievance = async (formData: any) => {
    try {
      setIsSubmitting(true);
      
      // In a real implementation, this would submit to the backend
      console.log('Submitting grievance:', formData);
      console.log('NLP analysis results:', nlpAnalysis);
      
      // Success notification
      toast({
        title: t('success'),
        description: t('grievance_submitted'),
      });
      
      // Navigate to success page
      navigate('/grievances/success', { 
        state: { 
          trackingId: 'GR' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
          department: nlpAnalysis.classification?.department || 'general'
        }
      });
    } catch (error) {
      console.error('Error submitting grievance:', error);
      toast({
        title: t('error'),
        description: t('error_submitting'),
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title={t('file_grievance')} 
        description={t('file_grievance_description')} 
      />
      
      <Card className="mt-6">
        <CardContent className="pt-6">
          {showAnalysisResults ? (
            <GrievanceAnalysisResult
              analysis={nlpAnalysis}
              onSubmit={handleSubmitGrievance}
              onBack={() => setShowAnalysisResults(false)}
              isSubmitting={isSubmitting}
            />
          ) : (
            <GrievanceForm
              onSubmit={handleAnalyzeComplaint}
              isSubmitting={isSubmitting || nlpAnalysis.isAnalyzing}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewGrievance;
