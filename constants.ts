
import type { QuestionGroup } from './types';

export const QUESTIONS_CONFIG: QuestionGroup[] = [
  {
    title: 'Real Problem or Nice-to-Have?',
    emoji: '🧨',
    questions: [
      { id: 'q1', text: 'What pain is your startup solving? (Be specific, not vague)' },
      { id: 'q2', text: 'Who feels this pain the most? Describe one real person.' },
      { id: 'q3', text: 'What happens if they don’t solve it? (Does anything break?)' },
      { id: 'q4', text: 'How are they solving this right now?' },
    ],
  },
  {
    title: 'Execution-Ready?',
    emoji: '🧱',
    questions: [
      { id: 'q5', text: 'Can you build a working version in 14 days?' },
      { id: 'q6', text: 'What’s the absolute minimum feature it needs to deliver value?' },
      { id: 'q7', text: 'Which part of the MVP is non-negotiable?' },
    ],
  },
  {
    title: 'Market & Timing',
    emoji: '🧠',
    questions: [
      { id: 'q8', text: 'Why is this idea right now?' },
      { id: 'q9', text: 'How many people face this problem?' },
      { id: 'q10', text: 'Are people already searching for this solution?' },
      { id: 'q11', text: 'Can you find 10 people today to try it?' },
    ],
  },
  {
    title: 'Monetization Clarity',
    emoji: '💸',
    questions: [
      { id: 'q12', text: 'How will this make money? (e.g. Paywall, subscription, leads, commission)' },
      { id: 'q13', text: 'Who will pay? (e.g. Individual, company, NGO, school)' },
      { id: 'q14', text: 'Why would they actually pay? (e.g. Convenience, ROI, status, compliance)' },
      { id: 'q15', text: 'What’s your pricing model?' },
    ],
  },
  {
    title: 'Growth Engine',
    emoji: '⚡',
    questions: [
      { id: 'q16', text: 'How will you reach your first 100 users?' },
      { id: 'q17', text: 'What’s your distribution edge? (e.g. A Telegram group, cofounder’s skills, your network)' },
      { id: 'q18', text: 'What channel will be your main launch driver? (e.g. Telegram, TikTok, FB groups)' },
    ],
  },
];
