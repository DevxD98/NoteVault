import { useState, useEffect } from 'react';

export function useCountdown(initialSeconds: number = 60) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, seconds]);

  const startTimer = () => {
    setSeconds(initialSeconds);
    setIsActive(true);
  };

  return {
    seconds,
    isActive,
    startTimer
  };
}