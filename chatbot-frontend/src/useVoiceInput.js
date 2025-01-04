import { useState, useEffect, useRef } from "react";

export const useVoiceInput = (onSubmitMessage) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const callbackRef = useRef(onSubmitMessage);

  useEffect(() => {
    callbackRef.current = onSubmitMessage;
  }, [onSubmitMessage]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognizer = new SpeechRecognition();
      recognizer.continuous = false;
      recognizer.interimResults = false;
      recognizer.lang = "en-US";

      recognizer.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        callbackRef.current(transcript); // Use the ref's current value
      };

      recognizer.onerror = (event) => {
        console.error("Error with speech recognition:", event.error);
        setIsRecording(false);
      };

      setRecognition(recognizer);
    } else {
      console.error("Speech Recognition API is not supported by this browser.");
    }
  }, []);

  const toggleRecording = () => {
    if (recognition) {
      if (isRecording) {
        recognition.stop();
      } else {
        recognition.start();
      }
      setIsRecording(!isRecording);
    }
  };

  return {
    isRecording,
    toggleRecording,
  };
};

export default useVoiceInput;
