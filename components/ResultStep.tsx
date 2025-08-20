
import React from 'react';
import type { Result, ScoreMetric } from '../types';

interface ResultStepProps {
  result: Result;
  onReset: () => void;
}

const getVerdictColors = (verdict: Result['verdict']) => {
  switch (verdict) {
    case 'Ready to Test':
      return 'bg-status-success/10 text-status-success border-status-success';
    case 'Needs Refinement':
      return 'bg-status-warning/10 text-status-warning border-status-warning';
    case 'Dead on Arrival':
      return 'bg-status-danger/10 text-status-danger border-status-danger';
    default:
      return 'bg-gray-700 text-gray-300';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'bg-status-success';
  if (score >= 50) return 'bg-status-warning';
  return 'bg-status-danger';
};

const ScoreCard = ({ title, data }: { title: string; data: ScoreMetric }) => (
  <div className="bg-brand-bg/50 p-4 rounded-lg">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-semibold text-brand-text">{title}</h4>
      <span className={`font-bold text-lg ${getScoreColor(data.score).replace('bg-','text-')}`}>{data.score}/100</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-3">
      <div
        className={`${getScoreColor(data.score)} h-2.5 rounded-full`}
        style={{ width: `${data.score}%` }}
      ></div>
    </div>
    <p className="text-brand-subtle text-sm">{data.reasoning}</p>
  </div>
);


export default function ResultStep({ result, onReset }: ResultStepProps): React.ReactNode {
  const { verdict, finalScore, recommendation, scores } = result;
  const verdictColors = getVerdictColors(verdict);
  const emoji = verdict === 'Ready to Test' ? '🔥' : verdict === 'Needs Refinement' ? '⚠️' : '💀';

  return (
    <div className="bg-brand-surface rounded-lg shadow-xl p-8 animate-fade-in w-full">
      <div className={`text-center p-6 rounded-lg border ${verdictColors} mb-8`}>
        <h2 className="text-4xl font-extrabold mb-2">{emoji} {verdict}</h2>
        <p className="text-lg font-semibold">{recommendation}</p>
        <div className="mt-4 text-6xl font-black tracking-tighter">
          {finalScore}
          <span className="text-3xl font-bold text-brand-subtle">/100</span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-center text-brand-text">Critical Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreCard title="Problem Severity" data={scores.problemSeverity} />
          <ScoreCard title="Solution Clarity" data={scores.solutionClarity} />
          <ScoreCard title="Market Urgency" data={scores.marketUrgency} />
          <ScoreCard title="Monetization Strength" data={scores.monetizationStrength} />
        </div>
      </div>
      
      <div className="text-center mt-10">
        <button
          onClick={onReset}
          className="bg-brand-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          Analyze Another Idea
        </button>
      </div>
    </div>
  );
}
