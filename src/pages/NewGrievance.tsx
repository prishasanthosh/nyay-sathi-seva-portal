
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNlpAnalysis } from '@/hooks/useNlpAnalysis';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { grievanceAPI } from '@/services/api';
import GrievanceForm from '@/components/grievance/GrievanceForm';
import GrievanceAnalysisResult from '@/components/grievance/GrievanceAnalysisResult';
import PageHeader from '@/components/grievance/PageHeader';
import { Card, CardContent } from '@/components/ui/card';

const NewGrievance = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const nlpAnalysis = useNlpAnalysis();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnalysisResults, setShowAnalysisResults] = useState(false);
  const [formData, setFormData] = useState<any>({});
  
  const handleAnalyzeComplaint = async (data: any) => {
    try {
      setIsSubmitting(true);
      setFormData(data);
      
      // Include the user data with the form data
      const completeFormData = {
        ...data,
        userId: user?._id,
      };
      
      const results = await nlpAnalysis.analyzeComplaint(data.description);
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
  
  const handleSubmitGrievance = async () => {
    try {
      setIsSubmitting(true);
      
      // Prepare data for submission to backend
      const grievanceData = {
        ...formData,
        department: nlpAnalysis.classification?.department || 'general',
        urgency: nlpAnalysis.sentiment?.urgency || 'medium',
        sentimentScore: nlpAnalysis.sentiment?.score || 0,
        confidenceScore: nlpAnalysis.classification?.confidence || 0,
        tags: nlpAnalysis.classification?.tags || [],
      };
      
      // Submit grievance to backend
      const response = await grievanceAPI.submitGrievance(grievanceData);
      
      // Success notification
      toast({
        title: t('success'),
        description: t('grievance_submitted'),
      });
      
      // Navigate to success page
      navigate('/grievances/success', { 
        state: { 
          trackingId: response.trackingId,
          department: response.grievance.department
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
