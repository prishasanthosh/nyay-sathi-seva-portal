
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SpeechToTextInputProps {
  onTranscriptChange: (transcript: string) => void;
  initialValue?: string;
}

const SpeechToTextInput: React.FC<SpeechToTextInputProps> = ({ 
  onTranscriptChange, 
  initialValue = ''
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(initialValue);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US'; // Default language
      
      recognitionInstance.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            currentTranscript += event.results[i][0].transcript + ' ';
          }
        }
        
        if (currentTranscript) {
          setTranscript((prev) => {
            const newTranscript = prev + currentTranscript;
            onTranscriptChange(newTranscript);
            return newTranscript;
          });
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast({
          title: "Speech Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive",
        });
      };
      
      recognitionInstance.onend = () => {
        if (isListening) {
          recognitionInstance.start();
        }
      };
      
      setRecognition(recognitionInstance);
    } else {
      setIsSupported(false);
      console.error('Speech recognition not supported');
      toast({
        title: "Feature Not Supported",
        description: "Speech recognition is not supported in your browser. Please use Chrome or Edge.",
        variant: "destructive",
      });
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  useEffect(() => {
    // Update transcript when initialValue changes
    if (initialValue !== transcript) {
      setTranscript(initialValue);
    }
  }, [initialValue]);

  const toggleListening = () => {
    if (!recognition || !isSupported) return;
    
    if (isListening) {
      recognition.stop();
      toast({
        title: "Recording Stopped",
        description: "Your speech recording has been stopped.",
      });
    } else {
      recognition.start();
      toast({
        title: "Recording Started",
        description: "Speak clearly to record your grievance.",
      });
    }
    
    setIsListening(!isListening);
  };

  return (
    <div className="mt-2">
      <Button
        type="button"
        onClick={toggleListening}
        variant={isListening ? "destructive" : "outline"}
        className={`${isListening ? 'bg-red-500 hover:bg-red-600' : ''} flex items-center`}
        disabled={!isSupported}
      >
        {isListening ? (
          <>
            <MicOff className="h-4 w-4 mr-2" />
            Stop Recording
          </>
        ) : (
          <>
            <Mic className="h-4 w-4 mr-2" />
            Start Voice Input
          </>
        )}
      </Button>
      
      {isListening && (
        <div className="mt-2 flex items-center text-sm text-india-blue animate-pulse">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Listening... Speak clearly.
        </div>
      )}
      
      {!isSupported && (
        <div className="mt-2 text-sm text-red-500">
          Speech recognition is not supported in your browser. Please use Chrome or Edge.
        </div>
      )}
    </div>
  );
};

export default SpeechToTextInput;

// Add necessary type declarations for older browsers
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}
