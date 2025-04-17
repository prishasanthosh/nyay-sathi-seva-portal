
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, UserPlus } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  state: z.string().min(1, 'Please select a state'),
  district: z.string().min(1, 'Please select a district'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const { t } = useLanguage();
  const { register: registerUser, isLoading } = useAuth();
  const [selectedState, setSelectedState] = useState('');
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema)
  });
  
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = data;
      await registerUser(userData);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  
  // Lists of states
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 
    'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 
    'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];
  
  // Districts would be dynamic based on state in a real implementation
  const districts = ['District 1', 'District 2', 'District 3', 'District 4', 'District 5'];
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t('name')}</Label>
        <Input
          id="name"
          placeholder="Your full name"
          {...register('name')}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-red-500 text-sm flex items-center mt-1">
            <AlertCircle className="h-4 w-4 mr-1" /> 
            {errors.name.message}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          {...register('email')}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-500 text-sm flex items-center mt-1">
            <AlertCircle className="h-4 w-4 mr-1" /> 
            {errors.email.message}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">{t('phone')}</Label>
        <Input
          id="phone"
          placeholder="Your phone number"
          {...register('phone')}
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm flex items-center mt-1">
            <AlertCircle className="h-4 w-4 mr-1" /> 
            {errors.phone.message}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="state">{t('state')}</Label>
          <Select 
            onValueChange={(value) => {
              setValue('state', value, { shouldValidate: true });
              setSelectedState(value);
            }}
            defaultValue=""
          >
            <SelectTrigger id="state" className={errors.state ? "border-red-500" : ""}>
              <SelectValue placeholder={t('select_state')} />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" /> 
              {errors.state.message}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="district">{t('district')}</Label>
          <Select 
            onValueChange={(value) => setValue('district', value, { shouldValidate: true })} 
            defaultValue=""
            disabled={!selectedState}
          >
            <SelectTrigger id="district" className={errors.district ? "border-red-500" : ""}>
              <SelectValue placeholder={selectedState ? t('select_district') : t('select_state_first')} />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.district && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" /> 
              {errors.district.message}
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">{t('password')}</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a secure password"
          {...register('password')}
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <p className="text-red-500 text-sm flex items-center mt-1">
            <AlertCircle className="h-4 w-4 mr-1" /> 
            {errors.password.message}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t('confirm_password')}</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          {...register('confirmPassword')}
          className={errors.confirmPassword ? "border-red-500" : ""}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm flex items-center mt-1">
            <AlertCircle className="h-4 w-4 mr-1" /> 
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <span className="animate-spin mr-2">●</span>
            {t('registering')}...
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4 mr-2" />
            {t('register')}
          </>
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
