
import React from 'react';
import { QUESTIONS_CONFIG } from '../constants';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps): React.ReactNode {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full px-4 sm:px-0">
      <div className="flex justify-between mb-1 text-xs font-mono text-brand-subtle">
        {QUESTIONS_CONFIG.map((group, index) => (
          <span key={index} className={`flex-1 text-center ${currentStep > index ? 'text-brand-primary' : ''}`}>
            {group.emoji}
          </span>
        ))}
      </div>
      <div className="w-full bg-brand-surface rounded-full h-2.5">
        <div
          className="bg-brand-primary h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
