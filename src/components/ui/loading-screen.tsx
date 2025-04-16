
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-india-blue mx-auto" />
        <h2 className="mt-4 text-xl font-medium text-gray-900">Loading...</h2>
        <p className="mt-2 text-sm text-gray-500">Please wait while we prepare your experience.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
