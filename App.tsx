
import React, { useState, useCallback } from 'react';
import { QUESTIONS_CONFIG } from './constants';
import type { Result } from './types';
import { scoreStartupIdea } from './services/geminiService';
import IntroductionStep from './components/IntroductionStep';
import QuestionStep from './components/QuestionStep';
import ResultStep from './components/ResultStep';
import ProgressBar from './components/ProgressBar';
import LoadingSpinner from './components/LoadingSpinner';

const TOTAL_QUESTION_STEPS = QUESTIONS_CONFIG.length;

export default function App(): React.ReactNode {
  const [step, setStep] = useState(0); // 0: intro, 1-5: questions, 6: result
  const [startupIdea, setStartupIdea] = useState('');
  const [answers, setAnswers] = useState<string[]>(
    Array(QUESTIONS_CONFIG.flatMap(q => q.questions).length).fill('')
  );
  const [result, setResult] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = (idea: string) => {
    if (idea.trim()) {
      setStartupIdea(idea);
      setStep(1);
    }
  };
  
  const handleNextStep = () => {
    setStep(prev => Math.min(prev + 1, TOTAL_QUESTION_STEPS + 1));
  };
  
  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const updateAnswer = useCallback((questionIndex: number, value: string) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = value;
      return newAnswers;
    });
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fullQuestions = QUESTIONS_CONFIG.flatMap(group => group.questions.map(q => q.text));
      const res = await scoreStartupIdea(startupIdea, fullQuestions, answers);
      setResult(res);
      setStep(TOTAL_QUESTION_STEPS + 1);
    } catch (err) {
      console.error(err);
      setError('Failed to get analysis. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(0);
    setStartupIdea('');
    setAnswers(Array(QUESTIONS_CONFIG.flatMap(q => q.questions).length).fill(''));
    setResult(null);
    setError(null);
  };
  
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    
    if (error) {
        return (
            <div className="text-center p-8 bg-brand-surface rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-status-danger mb-4">An Error Occurred</h2>
                <p className="text-brand-subtle mb-6">{error}</p>
                <button
                    onClick={handleReset}
                    className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    Start Over
                </button>
            </div>
        );
    }

    if (step === 0) {
      return <IntroductionStep onStart={handleStart} />;
    }
    
    if (step > 0 && step <= TOTAL_QUESTION_STEPS) {
      const currentConfig = QUESTIONS_CONFIG[step - 1];
      const globalQuestionIndexOffset = QUESTIONS_CONFIG.slice(0, step - 1).reduce((acc, curr) => acc + curr.questions.length, 0);
      
      return (
        <QuestionStep
          step={step}
          totalSteps={TOTAL_QUESTION_STEPS}
          config={currentConfig}
          answers={answers}
          globalQuestionIndexOffset={globalQuestionIndexOffset}
          updateAnswer={updateAnswer}
          onNext={step === TOTAL_QUESTION_STEPS ? handleSubmit : handleNextStep}
          onBack={handlePrevStep}
        />
      );
    }
    
    if (step === TOTAL_QUESTION_STEPS + 1 && result) {
      return <ResultStep result={result} onReset={handleReset} />;
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col items-center justify-center p-4 sm:p-6">
       <main className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
                Startup Idea <span className="text-brand-primary">Filter</span>
            </h1>
            <p className="text-brand-subtle text-lg">Kill weak ideas. Surface winners. Force clarity.</p>
        </header>

        {step > 0 && step <= TOTAL_QUESTION_STEPS && (
          <ProgressBar currentStep={step} totalSteps={TOTAL_QUESTION_STEPS} />
        )}
        
        <div className="mt-8">
            {renderContent()}
        </div>
      </main>
      <footer className="text-center text-brand-subtle text-sm mt-12">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
}
