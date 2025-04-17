
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  register: any;
  errors: any;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  placeholder,
  register,
  errors,
  type = 'text'
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className={errors[id] ? "border-red-500" : ""}
      />
      {errors[id] && (
        <p className="text-red-500 text-sm flex items-center mt-1">
          <AlertCircle className="h-4 w-4 mr-1" /> 
          {errors[id].message}
        </p>
      )}
    </div>
  );
};

export default FormField;
