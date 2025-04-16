
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Search,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  FileText,
  MessageSquare,
  Calendar,
  RefreshCw,
} from 'lucide-react';

type GrievanceStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';

interface GrievanceDetail {
  id: string;
  subject: string;
  description: string;
  department: string;
  category: string;
  status: GrievanceStatus;
  submittedDate: string;
  lastUpdated: string;
  updates: {
    date: string;
    status: string;
    message: string;
  }[];
}

const TrackGrievance = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [grievanceId, setGrievanceId] = useState('');
  const [phone, setPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [grievance, setGrievance] = useState<GrievanceDetail | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Mock function to simulate grievance search
  const searchGrievance = async () => {
    // Validate form
    const errors: Record<string, string> = {};
    
    if (!grievanceId.trim()) {
      errors.grievanceId = 'Grievance ID is required';
    } else if (!/^GR\d{6}$/.test(grievanceId)) {
      errors.grievanceId = 'Invalid Grievance ID format (e.g., GR123456)';
    }
    
    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, only return results for specific IDs
      if (grievanceId === 'GR123456') {
        setGrievance({
          id: 'GR123456',
          subject: 'Water Supply Disruption in Neighborhood',
          description: 'There has been no water supply in our neighborhood for the past 3 days. This is causing significant hardship for residents.',
          department: 'Municipal Water Works Department',
          category: 'Water Supply',
          status: 'in_progress',
          submittedDate: '2025-04-10',
          lastUpdated: '2025-04-14',
          updates: [
            {
              date: '2025-04-10',
              status: 'pending',
              message: 'Grievance submitted successfully'
            },
            {
              date: '2025-04-12',
              status: 'in_progress',
              message: 'Assigned to Municipal Water Works Department'
            },
            {
              date: '2025-04-14',
              status: 'in_progress',
              message: 'Technical team dispatched to inspect the water supply lines'
            }
          ]
        });
      } else if (grievanceId === 'GR654321') {
        setGrievance({
          id: 'GR654321',
          subject: 'Street Light Not Working',
          description: 'The street light at the corner of Main Street and Park Avenue has not been working for two weeks, creating safety concerns.',
          department: 'Electricity Department',
          category: 'Electricity',
          status: 'resolved',
          submittedDate: '2025-04-05',
          lastUpdated: '2025-04-12',
          updates: [
            {
              date: '2025-04-05',
              status: 'pending',
              message: 'Grievance submitted successfully'
            },
            {
              date: '2025-04-07',
              status: 'in_progress',
              message: 'Assigned to Electricity Department'
            },
            {
              date: '2025-04-10',
              status: 'in_progress',
              message: 'Maintenance team scheduled for inspection'
            },
            {
              date: '2025-04-12',
              status: 'resolved',
              message: 'Street light repaired and is now functional'
            }
          ]
        });
      } else {
        toast({
          title: "Grievance Not Found",
          description: "No grievance found with the provided ID and phone number",
          variant: "destructive",
        });
        setGrievance(null);
      }
    } catch (error) {
      toast({
        title: "Search Error",
        description: "There was an error searching for your grievance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadge = (status: GrievanceStatus) => {
    switch (status) {
      case 'pending':
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" /> {t('pending')}
          </div>
        );
      case 'in_progress':
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <RefreshCw className="h-3 w-3 mr-1" /> {t('in_progress')}
          </div>
        );
      case 'resolved':
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" /> {t('resolved')}
          </div>
        );
      case 'rejected':
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" /> {t('rejected')}
          </div>
        );
      default:
        return null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'grievanceId') {
      setGrievanceId(value);
    } else if (name === 'phone') {
      setPhone(value);
    }
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('track_grievance')}</h1>
            <p className="text-gray-600">Enter your grievance ID and phone number to track your complaint</p>
          </div>
          
          <Card className="shadow-md mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-india-blue">Track Your Grievance</CardTitle>
              <CardDescription>
                Please provide your grievance ID and the phone number used during submission
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="grievanceId">Grievance ID *</Label>
                  <Input 
                    id="grievanceId" 
                    name="grievanceId" 
                    placeholder="e.g., GR123456"
                    value={grievanceId}
                    onChange={handleInputChange}
                    className={formErrors.grievanceId ? "border-red-500" : ""}
                  />
                  {formErrors.grievanceId && (
                    <p className="text-red-500 text-sm flex items-center mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" /> 
                      {formErrors.grievanceId}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="phone">{t('phone')} *</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    placeholder={t('enter_phone')}
                    value={phone}
                    onChange={handleInputChange}
                    className={formErrors.phone ? "border-red-500" : ""}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm flex items-center mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" /> 
                      {formErrors.phone}
                    </p>
                  )}
                </div>
                
                <div className="flex items-end md:col-span-1">
                  <Button 
                    className="w-full"
                    onClick={searchGrievance}
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Track Grievance
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Demo IDs for testing: GR123456, GR654321</p>
              </div>
            </CardContent>
          </Card>
          
          {grievance && (
            <Card className="shadow-md animate-fadeIn">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-india-blue">
                    Grievance Details
                  </CardTitle>
                  {getStatusBadge(grievance.status)}
                </div>
                <CardDescription>
                  Tracking information for grievance ID: {grievance.id}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                    <TabsTrigger value="updates" className="flex-1">Updates</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Grievance ID</h4>
                          <p className="mt-1 font-medium">{grievance.id}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Status</h4>
                          <p className="mt-1">{getStatusBadge(grievance.status)}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Submitted Date</h4>
                          <p className="mt-1">{new Date(grievance.submittedDate).toLocaleDateString()}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Last Updated</h4>
                          <p className="mt-1">{new Date(grievance.lastUpdated).toLocaleDateString()}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Category</h4>
                          <p className="mt-1">{grievance.category}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Department</h4>
                          <p className="mt-1">{grievance.department}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Subject</h4>
                        <p className="mt-1 font-medium">{grievance.subject}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Description</h4>
                        <p className="mt-1 text-gray-700">{grievance.description}</p>
                      </div>
                      
                      <div className="bg-india-blue/5 p-4 rounded-md mt-6">
                        <div className="flex items-start space-x-3">
                          <FileText className="h-5 w-5 text-india-blue flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-gray-900">Department Information</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Your grievance has been assigned to {grievance.department}.
                              For direct inquiries, you can contact them at:
                            </p>
                            <p className="text-sm font-medium mt-2">
                              Email: {grievance.department.toLowerCase().replace(/\s+/g, '.')}@gov.in<br />
                              Phone: 1800-XXX-XXXX
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="updates">
                    <div className="space-y-6">
                      {grievance.updates.map((update, index) => (
                        <div 
                          key={index}
                          className={`relative pl-8 pb-6 ${
                            index !== grievance.updates.length - 1 ? 'border-l-2 border-india-blue/20 ml-4' : ''
                          }`}
                        >
                          <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-india-blue/10 flex items-center justify-center -ml-4">
                            {update.status === 'pending' && <Clock className="h-4 w-4 text-yellow-500" />}
                            {update.status === 'in_progress' && <RefreshCw className="h-4 w-4 text-blue-500" />}
                            {update.status === 'resolved' && <CheckCircle className="h-4 w-4 text-green-500" />}
                            {update.status === 'rejected' && <XCircle className="h-4 w-4 text-red-500" />}
                          </div>
                          
                          <div className="ml-2">
                            <div className="flex items-center mb-2">
                              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm text-gray-500">
                                {new Date(update.date).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <div className="flex items-start">
                              <MessageSquare className="h-4 w-4 text-india-blue mr-2 mt-1 flex-shrink-0" />
                              <div>
                                <span className="font-medium">{update.status}</span>
                                <p className="text-gray-700 mt-1">{update.message}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-8 text-center text-gray-600">
            <p>
              Need additional help? Contact our support team at support@nyaysathi.gov.in or call 1800-XXX-XXXX
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackGrievance;
