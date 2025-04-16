
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, FileText, ArrowRight } from 'lucide-react';

type LocationState = {
  grievanceId: string;
  subject: string;
};

const GrievanceSuccess = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  useEffect(() => {
    // If someone navigates directly to this page without state, redirect them
    if (!state || !state.grievanceId) {
      navigate('/grievances/new');
    }
  }, [state, navigate]);

  if (!state || !state.grievanceId) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-md text-center">
            <CardContent className="pt-12 pb-10">
              <div className="w-20 h-20 bg-india-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-india-green" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Grievance Submitted Successfully!
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Thank you for submitting your grievance. It has been recorded in our system.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg border mb-8 text-left">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Grievance ID:</span>
                    <span className="font-semibold text-india-blue">{state.grievanceId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-medium">{state.subject}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock className="h-3 w-3 mr-1" /> {t('pending')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Submitted On:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center bg-india-saffron/10 p-4 rounded-md text-left">
                  <FileText className="h-6 w-6 text-india-saffron mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Next Steps</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Your grievance is being analyzed by our AI system and will be categorized and routed to the appropriate department.
                      You will receive updates via email and SMS.
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-b py-4 my-2">
                  <p className="text-gray-600">
                    Please save your Grievance ID for future reference.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <Link to="/dashboard">
                    <Button className="w-full">
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Link to="/grievances/track">
                    <Button variant="outline" className="w-full">
                      Track Grievance <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GrievanceSuccess;
