import { useState, useEffect, useRef } from 'react';

export function useTypewriter(text: string, speed: number = 50, delay: number = 0): { display: string; isComplete: boolean; reset: () => void } {
  const [display, setDisplay] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (indexRef.current < text.length) {
      timerRef.current = setTimeout(() => {
        setDisplay(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      }, speed);
    } else {
      setIsComplete(true);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [display, text, speed, started]);

  const reset = () => {
    setDisplay('');
    setIsComplete(false);
    setStarted(false);
    indexRef.current = 0;
  };

  return { display, isComplete, reset };
}
