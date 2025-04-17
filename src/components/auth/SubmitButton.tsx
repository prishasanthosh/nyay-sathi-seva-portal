
import React from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface SubmitButtonProps {
  isLoading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading }) => {
  const { t } = useLanguage();
  
  return (
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
  );
};

export default SubmitButton;
