
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Upload, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';

const NewGrievance = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    district: '',
    grievanceType: '',
    subject: '',
    description: '',
    attachments: [] as File[],
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Indian states
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  // Grievance types
  const grievanceTypes = [
    'Public Services', 'Healthcare', 'Education', 'Transportation',
    'Water Supply', 'Electricity', 'Sanitation', 'Roads and Infrastructure',
    'Law and Order', 'Corruption', 'Environmental Issues', 'Employment',
    'Social Welfare Schemes', 'Pension', 'Land Records', 'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...fileArray],
      });
    }
  };

  const removeFile = (index: number) => {
    const newAttachments = [...formData.attachments];
    newAttachments.splice(index, 1);
    setFormData({
      ...formData,
      attachments: newAttachments,
    });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.state) {
      errors.state = 'State is required';
    }
    
    if (!formData.district.trim()) {
      errors.district = 'District is required';
    }
    
    if (!formData.grievanceType) {
      errors.grievanceType = 'Grievance type is required';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.trim().length < 50) {
      errors.description = 'Description must be at least 50 characters';
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast({
        title: "Form Error",
        description: "Please correct the errors in the form",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call - this would be replaced with actual backend call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random grievance ID
      const grievanceId = 'GR' + Math.floor(100000 + Math.random() * 900000);
      
      toast({
        title: "Grievance Submitted",
        description: `Your grievance has been submitted successfully. Your grievance ID is ${grievanceId}`,
        variant: "default",
      });
      
      // Redirect to success page
      navigate('/grievances/success', { 
        state: { 
          grievanceId,
          subject: formData.subject
        } 
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was an error submitting your grievance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('file_grievance')}</h1>
            <p className="text-gray-600">Fill out the form below to submit your grievance</p>
          </div>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-india-blue">Grievance Form</CardTitle>
              <CardDescription>
                Please provide accurate information to help us address your concern effectively.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('name')} *</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder={t('enter_name')}
                        value={formData.name}
                        onChange={handleInputChange}
                        className={formErrors.name ? "border-red-500" : ""}
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" /> 
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('email')} *</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder={t('enter_email')}
                        value={formData.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? "border-red-500" : ""}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" /> 
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('phone')} *</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        placeholder={t('enter_phone')}
                        value={formData.phone}
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">{t('address')}</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">{t('state')} *</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange('state', value)}
                        value={formData.state}
                      >
                        <SelectTrigger 
                          id="state"
                          className={formErrors.state ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formErrors.state && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" /> 
                          {formErrors.state}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="district">{t('district')} *</Label>
                      <Input 
                        id="district" 
                        name="district" 
                        placeholder="Enter your district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className={formErrors.district ? "border-red-500" : ""}
                      />
                      {formErrors.district && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" /> 
                          {formErrors.district}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Grievance Details */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Grievance Details</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="grievanceType">{t('grievance_type')} *</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange('grievanceType', value)}
                        value={formData.grievanceType}
                      >
                        <SelectTrigger 
                          id="grievanceType"
                          className={formErrors.grievanceType ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select grievance type" />
                        </SelectTrigger>
                        <SelectContent>
                          {grievanceTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formErrors.grievanceType && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" /> 
                          {formErrors.grievanceType}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t('subject')} *</Label>
                      <Input 
                        id="subject" 
                        name="subject" 
                        placeholder="Brief subject of your grievance"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={formErrors.subject ? "border-red-500" : ""}
                      />
                      {formErrors.subject && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" /> 
                          {formErrors.subject}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">{t('description')} *</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        placeholder={t('describe_grievance')}
                        rows={5}
                        value={formData.description}
                        onChange={handleInputChange}
                        className={formErrors.description ? "border-red-500" : ""}
                      />
                      {formErrors.description ? (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" /> 
                          {formErrors.description}
                        </p>
                      ) : (
                        <p className="text-gray-500 text-sm mt-1">
                          Please provide detailed information (minimum 50 characters)
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="attachments">{t('attachment')}</Label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md font-medium text-india-blue hover:text-india-blue/80"
                            >
                              <span>Upload files</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                multiple
                                onChange={handleFileChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, PDF up to 5MB each
                          </p>
                        </div>
                      </div>
                      
                      {formData.attachments.length > 0 && (
                        <div className="mt-4">
                          <Label>Uploaded Files</Label>
                          <div className="mt-2 space-y-2">
                            {formData.attachments.map((file, index) => (
                              <div 
                                key={index}
                                className="flex items-center justify-between p-2 border rounded-md bg-gray-50"
                              >
                                <div className="flex items-center space-x-2">
                                  <FileText className="h-5 w-5 text-india-blue" />
                                  <span className="text-sm text-gray-700 truncate max-w-xs">
                                    {file.name}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t p-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  {t('cancel')}
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-india-green hover:bg-india-green/90"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">●</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      {t('submit')}
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="mt-8 bg-india-saffron/10 p-4 rounded-md">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-india-saffron flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Your grievance will be processed using AI</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Our system uses Natural Language Processing to automatically categorize and route your grievance
                  to the appropriate department, ensuring faster resolution.
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

export default NewGrievance;
