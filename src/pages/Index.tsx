
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FileText, BarChart2, Clock, Megaphone, UserCheck, BookOpen } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-india-saffron/10 via-white to-india-green/10 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {t('hero_title')}
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-lg">
                  {t('hero_subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/grievances/new">
                    <Button size="lg" className="w-full sm:w-auto">
                      {t('file_grievance')}
                    </Button>
                  </Link>
                  <Link to="/grievances/track">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      {t('track_grievance')}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img 
                  src="https://www.nielit.gov.in/sites/default/files/styles/large/public/2023-04/digital-india-vision.png" 
                  alt="Digital India Vision"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
              <p className="mt-4 text-xl text-gray-600">Simple process to address your concerns</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-t-4 border-india-saffron hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-india-saffron/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-india-saffron" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Submit Grievance</h3>
                  <p className="text-gray-600">
                    File your complaint through our simple form in your preferred language.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-india-blue hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-india-blue/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart2 className="h-6 w-6 text-india-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI Processing</h3>
                  <p className="text-gray-600">
                    Our NLP system automatically categorizes and routes your grievance to the right department.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-india-green hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-india-green/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-india-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                  <p className="text-gray-600">
                    Monitor the status of your grievance and receive timely updates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
              <p className="mt-4 text-xl text-gray-600">Benefits of our smart grievance portal</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <div className="bg-india-saffron rounded-full p-2 mt-1">
                  <Megaphone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Multilingual Support</h3>
                  <p className="text-gray-600">
                    Submit and track grievances in Tamil, Hindi, or English.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-india-blue rounded-full p-2 mt-1">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Smart Classification</h3>
                  <p className="text-gray-600">
                    Advanced NLP technology ensures your grievance reaches the right department.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-india-green rounded-full p-2 mt-1">
                  <UserCheck className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Citizen-Centric</h3>
                  <p className="text-gray-600">
                    Designed with user experience in mind for all Indian citizens.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-india-saffron rounded-full p-2 mt-1">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Faster Resolution</h3>
                  <p className="text-gray-600">
                    Automated routing reduces processing time and speeds up resolution.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-india-blue rounded-full p-2 mt-1">
                  <BarChart2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Transparent Tracking</h3>
                  <p className="text-gray-600">
                    Real-time updates and clear status indicators for your grievances.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-india-green rounded-full p-2 mt-1">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Documentation</h3>
                  <p className="text-gray-600">
                    Easily attach supporting documents to strengthen your case.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-india-blue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to File Your Grievance?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of citizens who have successfully resolved their issues through our platform.
            </p>
            <Link to="/grievances/new">
              <Button className="bg-white text-india-blue hover:bg-gray-100" size="lg">
                {t('file_grievance')}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
