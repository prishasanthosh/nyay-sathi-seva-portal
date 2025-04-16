
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, User, Mail, Lock, Phone } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Register = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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
    
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreeTerms) {
      errors.terms = 'You must agree to the terms and conditions';
    }
    
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call - this would be replaced with actual registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Registration Successful",
        description: "Welcome to Nyay Sathi Seva Portal. You can now login with your credentials.",
        variant: "default",
      });
      
      // Redirect to login
      navigate('/login');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md px-4 sm:px-6">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">{t('signup')}</CardTitle>
              <CardDescription className="text-center">
                Create a new account to file and track grievances
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {t('name')}
                  </Label>
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
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {t('email')}
                  </Label>
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
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {t('phone')}
                  </Label>
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
                  <Label htmlFor="password" className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    {t('password')}
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder={t('enter_password')}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={formErrors.password ? "border-red-500" : ""}
                  />
                  {formErrors.password && (
                    <p className="text-red-500 text-sm flex items-center mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" /> 
                      {formErrors.password}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    {t('confirm_password')}
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={formErrors.confirmPassword ? "border-red-500" : ""}
                  />
                  {formErrors.confirmPassword && (
                    <p className="text-red-500 text-sm flex items-center mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" /> 
                      {formErrors.confirmPassword}
                    </p>
                  )}
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => {
                      setAgreeTerms(checked as boolean);
                      if (checked && formErrors.terms) {
                        setFormErrors({
                          ...formErrors,
                          terms: '',
                        });
                      }
                    }}
                    className={formErrors.terms ? "border-red-500" : ""}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{' '}
                      <Link to="/terms" className="text-india-blue hover:underline">
                        terms of service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-india-blue hover:underline">
                        privacy policy
                      </Link>
                    </label>
                    {formErrors.terms && (
                      <p className="text-red-500 text-sm flex items-center mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" /> 
                        {formErrors.terms}
                      </p>
                    )}
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">●</span>
                      Registering...
                    </>
                  ) : (
                    t('signup')
                  )}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {t('or')}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" className="w-full">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <svg className="h-4 w-4 mr-2" fill="#24292F" viewBox="0 0 24 24">
                      <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.48-1.25-1.18-1.58-1.18-1.58-.97-.66.07-.65.07-.65 1.07.08 1.63 1.1 1.63 1.1.95 1.62 2.49 1.16 3.1.89.1-.7.37-1.17.67-1.44-2.34-.26-4.8-1.17-4.8-5.2 0-1.16.41-2.1 1.1-2.83-.11-.28-.48-1.38.1-2.87 0 0 .9-.28 2.9 1.1.86-.24 1.77-.36 2.68-.37.91 0 1.82.12 2.68.37 2.02-1.38 2.9-1.1 2.9-1.1.58 1.49.21 2.6.1 2.87.68.74 1.1 1.67 1.1 2.83 0 4.04-2.46 4.94-4.8 5.2.38.33.72.97.72 1.96v2.92c0 .29.18.63.74.52A11 11 0 0012 1.27" />
                    </svg>
                    GitHub
                  </Button>
                </div>
              </CardContent>
            </form>
            
            <CardFooter className="flex flex-col items-center">
              <p className="text-sm text-gray-600 mt-2">
                Already have an account?{' '}
                <Link to="/login" className="text-india-blue hover:underline">
                  {t('signin')}
                </Link>
              </p>
            </CardFooter>
          </Card>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              For demo purposes, you can register with any information
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
