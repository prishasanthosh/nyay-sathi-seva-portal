
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

interface LocationSelectProps {
  setValue: (name: string, value: any, options?: any) => void;
  errors: any;
  selectedState: string;
  setSelectedState: (state: string) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  setValue,
  errors,
  selectedState,
  setSelectedState
}) => {
  const { t } = useLanguage();

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
  );
};

export default LocationSelect;
