
import React from 'react';

const loadingMessages = [
  "Sharpening the axe...",
  "Consulting the oracle...",
  "Running the numbers...",
  "Separating wheat from chaff...",
  "Applying brutal honesty...",
  "Checking for market pulse...",
  "Stress-testing your monetization...",
];

export default function LoadingSpinner(): React.ReactNode {
  const [message, setMessage] = React.useState(loadingMessages[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = loadingMessages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-brand-surface rounded-lg shadow-xl text-center">
      <div className="w-16 h-16 border-4 border-brand-primary border-dashed rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-bold text-brand-text mb-2">Analyzing...</h2>
      <p className="text-brand-subtle transition-opacity duration-500">{message}</p>
    </div>
  );
}
