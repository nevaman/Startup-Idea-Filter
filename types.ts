
export interface ScoreMetric {
  score: number;
  reasoning: string;
}

export interface Scores {
  problemSeverity: ScoreMetric;
  solutionClarity: ScoreMetric;
  marketUrgency: ScoreMetric;
  monetizationStrength: ScoreMetric;
}

export interface Result {
  scores: Scores;
  finalScore: number;
  verdict: 'Ready to Test' | 'Needs Refinement' | 'Dead on Arrival';
  recommendation: string;
}

export interface Question {
    id: string;
    text: string;
}

export interface QuestionGroup {
    title: string;
    emoji: string;
    questions: Question[];
}
