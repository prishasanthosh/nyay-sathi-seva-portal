
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import FormField from './FormField';
import LocationSelect from './LocationSelect';
import SubmitButton from './SubmitButton';

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
      // Explicitly create an object with required properties
      const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        state: data.state,
        district: data.district
      };
      
      await registerUser(userData);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        id="name"
        label={t('name')}
        placeholder="Your full name"
        register={register}
        errors={errors}
      />
      
      <FormField
        id="email"
        label={t('email')}
        placeholder="your.email@example.com"
        register={register}
        errors={errors}
        type="email"
      />
      
      <FormField
        id="phone"
        label={t('phone')}
        placeholder="Your phone number"
        register={register}
        errors={errors}
      />
      
      <LocationSelect
        setValue={setValue}
        errors={errors}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
      />
      
      <FormField
        id="password"
        label={t('password')}
        placeholder="Create a secure password"
        register={register}
        errors={errors}
        type="password"
      />
      
      <FormField
        id="confirmPassword"
        label={t('confirm_password')}
        placeholder="Confirm your password"
        register={register}
        errors={errors}
        type="password"
      />
      
      <SubmitButton isLoading={isLoading} />
    </form>
  );
};

export default RegisterForm;
