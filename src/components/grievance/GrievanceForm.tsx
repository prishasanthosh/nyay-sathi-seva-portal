import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import SpeechToTextInput from '@/components/grievance/SpeechToTextInput';
import { Upload, FilePlus, AlertCircle, SendHorizontal } from 'lucide-react';

// The form schema
const formSchema = z.object({
  subject: z.string().min(10, 'Subject must be at least 10 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  category: z.string().min(1, 'Please select a category'),
  state: z.string().min(1, 'Please select a state'),
  district: z.string().min(1, 'Please select a district'),
  address: z.string().optional(),
  attachments: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface GrievanceFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

const GrievanceForm: React.FC<GrievanceFormProps> = ({ onSubmit, isSubmitting }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [usingSpeechToText, setUsingSpeechToText] = useState(false);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      description: '',
      category: '',
      state: '',
      district: '',
      address: '',
    }
  });
  
  const description = watch('description');
  
  const handleSpeechTranscript = (transcript: string) => {
    setValue('description', transcript, { shouldValidate: true });
  };
  
  const submitForm = (data: FormValues) => {
    // Include the user ID with the form data
    const formData = {
      ...data,
      userId: user?._id,
    };
    
    onSubmit(formData);
  };
  
  // Lists of states and categories
  const categories = [
    'Water Supply', 
    'Electricity', 
    'Roads', 
    'Sanitation', 
    'Public Transport', 
    'Education', 
    'Healthcare', 
    'Law & Order', 
    'Housing', 
    'Others'
  ];
  
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
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">{t('category')} <span className="text-red-500">*</span></Label>
          <Select 
            onValueChange={(value) => setValue('category', value, { shouldValidate: true })} 
            defaultValue=""
          >
            <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
              <SelectValue placeholder={t('select_category')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" /> 
              {errors.category.message}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject">{t('subject')} <span className="text-red-500">*</span></Label>
          <Input
            id="subject"
            placeholder={t('grievance_subject_placeholder')}
            className={errors.subject ? "border-red-500" : ""}
            {...register('subject')}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" /> 
              {errors.subject.message}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="description">{t('description')} <span className="text-red-500">*</span></Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => setUsingSpeechToText(!usingSpeechToText)}
              className="text-xs flex items-center"
            >
              {usingSpeechToText ? "Hide Voice Input" : "Use Voice Input"}
            </Button>
          </div>
          
          {usingSpeechToText && (
            <SpeechToTextInput 
              onTranscriptChange={handleSpeechTranscript} 
              initialValue={description}
            />
          )}
          
          <Textarea
            id="description"
            placeholder={t('grievance_description_placeholder')}
            className={`min-h-[150px] ${errors.description ? "border-red-500" : ""}`}
            {...register('description')}
          />
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{description?.length || 0} characters (minimum 50)</span>
          </div>
          {errors.description && (
            <p className="text-red-500 text-sm flex items-center mt-1">
              <AlertCircle className="h-4 w-4 mr-1" /> 
              {errors.description.message}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="state">{t('state')} <span className="text-red-500">*</span></Label>
            <Select 
              onValueChange={(value) => setValue('state', value, { shouldValidate: true })} 
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
            <Label htmlFor="district">{t('district')} <span className="text-red-500">*</span></Label>
            <Select 
              onValueChange={(value) => setValue('district', value, { shouldValidate: true })} 
              defaultValue=""
            >
              <SelectTrigger id="district" className={errors.district ? "border-red-500" : ""}>
                <SelectValue placeholder={t('select_district')} />
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
          <Label htmlFor="address">{t('address')} ({t('optional')})</Label>
          <Textarea
            id="address"
            placeholder={t('address_placeholder')}
            className="min-h-[80px]"
            {...register('address')}
          />
        </div>
        
        <div className="space-y-2">
          <Label>{t('attachments')} ({t('optional')})</Label>
          <div className="border-2 border-dashed rounded-md p-6 text-center">
            <FilePlus className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">{t('drag_drop_files')}</p>
            <p className="text-xs text-gray-400 mt-1">{t('max_file_size')}</p>
            <Button type="button" variant="outline" size="sm" className="mt-2">
              <Upload className="h-4 w-4 mr-2" />
              {t('browse_files')}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="min-w-[150px]">
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">●</span>
              {t('submitting')}...
            </>
          ) : (
            <>
              <SendHorizontal className="h-4 w-4 mr-2" />
              {t('analyze_grievance')}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default GrievanceForm;
