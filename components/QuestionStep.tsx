
import React from 'react';
import type { QuestionGroup } from '../types';

interface QuestionStepProps {
  step: number;
  totalSteps: number;
  config: QuestionGroup;
  answers: string[];
  globalQuestionIndexOffset: number;
  updateAnswer: (questionIndex: number, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function QuestionStep({
  step,
  totalSteps,
  config,
  answers,
  globalQuestionIndexOffset,
  updateAnswer,
  onNext,
  onBack,
}: QuestionStepProps): React.ReactNode {

  const areAllQuestionsAnswered = config.questions.every((_, index) => {
    const globalIndex = globalQuestionIndexOffset + index;
    return answers[globalIndex] && answers[globalIndex].trim() !== '';
  });

  return (
    <div className="bg-brand-surface rounded-lg shadow-xl p-8 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-brand-text">
        <span className="mr-3">{config.emoji}</span>
        {config.title}
      </h2>
      <div className="space-y-6">
        {config.questions.map((question, index) => {
          const globalIndex = globalQuestionIndexOffset + index;
          return (
            <div key={question.id}>
              <label htmlFor={question.id} className="block text-md font-medium text-brand-subtle mb-2">
                {question.text}
              </label>
              <textarea
                id={question.id}
                value={answers[globalIndex]}
                onChange={(e) => updateAnswer(globalIndex, e.target.value)}
                rows={3}
                className="w-full p-3 bg-brand-bg border border-gray-600 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors text-brand-text"
                placeholder="Be brutally honest with yourself..."
              />
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={onBack}
          disabled={step === 1}
          className="bg-gray-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-500 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!areAllQuestionsAnswered}
          className="bg-brand-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
        >
          {step === totalSteps ? 'Analyze Idea' : 'Next'}
        </button>
      </div>
    </div>
  );
}
