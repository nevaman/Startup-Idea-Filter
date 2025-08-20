
import React, { useState } from 'react';

interface IntroductionStepProps {
  onStart: (idea: string) => void;
}

export default function IntroductionStep({ onStart }: IntroductionStepProps): React.ReactNode {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(idea);
  };

  return (
    <div className="bg-brand-surface rounded-lg shadow-xl p-8 animate-fade-in text-center">
      <h2 className="text-2xl font-bold mb-4 text-brand-text">What's your startup idea?</h2>
      <p className="text-brand-subtle mb-6">
        Let's put it through the wringer. Be concise, but clear.
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g., A subscription service for ethically sourced dog toys made by local artisans."
          className="w-full h-32 p-3 bg-brand-bg border border-gray-600 rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-colors text-brand-text placeholder-brand-subtle"
          required
        />
        <button
          type="submit"
          disabled={!idea.trim()}
          className="mt-6 w-full bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
        >
          Start The Interrogation
        </button>
      </form>
    </div>
  );
}
