
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About {t('hero_title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering citizens with easy access to grievance redressal through technology and innovation.
            </p>
          </div>
          
          {/* Mission and Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <Card className="shadow-md">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="w-12 h-12 bg-india-saffron rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 text-center">
                  To provide a transparent, efficient, and citizen-friendly platform for grievance redressal, 
                  ensuring that every citizen's voice is heard and addressed promptly through 
                  innovative technology and streamlined processes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="w-12 h-12 bg-india-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 text-center">
                  To create a society where every citizen has equal and easy access to government services, 
                  and where public grievances are addressed with dignity, respect, and efficiency, 
                  fostering trust between citizens and the government.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* What We Do */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-india-blue/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-india-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Receive Grievances</h3>
                <p className="text-gray-600">
                  We provide a user-friendly platform where citizens can file their grievances in their preferred language.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-india-saffron/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-india-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Process with AI</h3>
                <p className="text-gray-600">
                  Our advanced NLP technology categorizes and routes grievances to the appropriate departments automatically.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-india-green/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-india-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Ensure Resolution</h3>
                <p className="text-gray-600">
                  We monitor progress and ensure timely resolution of grievances, keeping citizens informed at every step.
                </p>
              </div>
            </div>
          </div>
          
          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">For Citizens</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-india-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Multilingual interface supporting Tamil, Hindi, and English</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-india-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>User-friendly grievance submission forms</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-india-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Real-time tracking of grievance status</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-india-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Email and SMS notifications on grievance updates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-india-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Option to attach supporting documents</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-india-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Feedback mechanism after grievance resolution</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">For Government Departments</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-india-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Automated categorization using NLP technology</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-india-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Efficient routing to appropriate departments</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-india-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Dashboard for monitoring grievance metrics</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-india-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Analytics for identifying common issues</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-india-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Workflow management for grievance processing</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-india-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Report generation for performance evaluation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Our Technology */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Technology</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-600 mb-6">
                The Nyay Sathi Seva Portal leverages cutting-edge technologies to provide a seamless 
                experience for citizens and efficient operations for government departments:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-india-blue pl-4 py-2">
                  <h3 className="font-semibold text-lg">MERN Stack</h3>
                  <p className="text-gray-600">
                    Built using MongoDB, Express.js, React, and Node.js for a robust and scalable web application.
                  </p>
                </div>
                
                <div className="border-l-4 border-india-saffron pl-4 py-2">
                  <h3 className="font-semibold text-lg">Natural Language Processing</h3>
                  <p className="text-gray-600">
                    Advanced NLP algorithms implemented in Python to analyze, categorize, and route grievances automatically.
                  </p>
                </div>
                
                <div className="border-l-4 border-india-green pl-4 py-2">
                  <h3 className="font-semibold text-lg">Multilingual Support</h3>
                  <p className="text-gray-600">
                    Integration of translation services to provide seamless experience in Tamil, Hindi, and English.
                  </p>
                </div>
                
                <div className="border-l-4 border-india-blue pl-4 py-2">
                  <h3 className="font-semibold text-lg">Data Analytics</h3>
                  <p className="text-gray-600">
                    Data visualization and analytics tools to identify trends and improve service delivery.
                  </p>
                </div>
                
                <div className="border-l-4 border-india-saffron pl-4 py-2">
                  <h3 className="font-semibold text-lg">Cloud Infrastructure</h3>
                  <p className="text-gray-600">
                    Hosted on secure, scalable cloud infrastructure to ensure reliability and accessibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="bg-india-blue/5 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-india-saffron rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-600">support@nyaysathi.gov.in</p>
                <p className="text-gray-600">info@nyaysathi.gov.in</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-india-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">1800-XXX-XXXX (Toll Free)</p>
                <p className="text-gray-600">+91-XX-XXXXX-XXXXX</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-india-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <p className="text-gray-600">
                  Department of Administrative Reforms & Public Grievances
                </p>
                <p className="text-gray-600">
                  5th Floor, Sardar Patel Bhavan, New Delhi - 110001
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
