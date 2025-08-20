
import { GoogleGenAI, Type } from "@google/genai";
import type { Result } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}
  
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const resultSchema = {
    type: Type.OBJECT,
    properties: {
        scores: {
            type: Type.OBJECT,
            properties: {
                problemSeverity: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER, description: "Score from 0-100 for problem severity." },
                        reasoning: { type: Type.STRING, description: "Brutal, honest reasoning for the problem severity score." },
                    },
                    required: ["score", "reasoning"],
                },
                solutionClarity: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER, description: "Score from 0-100 for solution clarity." },
                        reasoning: { type: Type.STRING, description: "Brutal, honest reasoning for the solution clarity score." },
                    },
                     required: ["score", "reasoning"],
                },
                marketUrgency: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER, description: "Score from 0-100 for market urgency." },
                        reasoning: { type: Type.STRING, description: "Brutal, honest reasoning for the market urgency score." },
                    },
                     required: ["score", "reasoning"],
                },
                monetizationStrength: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER, description: "Score from 0-100 for monetization strength." },
                        reasoning: { type: Type.STRING, description: "Brutal, honest reasoning for the monetization strength score." },
                    },
                     required: ["score", "reasoning"],
                },
            },
            required: ["problemSeverity", "solutionClarity", "marketUrgency", "monetizationStrength"],
        },
        finalScore: { type: Type.NUMBER, description: "The average of the four scores, rounded to the nearest integer." },
        verdict: { type: Type.STRING, description: 'The final verdict: "Ready to Test", "Needs Refinement", or "Dead on Arrival".' },
        recommendation: { type: Type.STRING, description: "The final recommendation based on the score." },
    },
    required: ["scores", "finalScore", "verdict", "recommendation"],
};


const buildPrompt = (idea: string, questions: string[], answers: string[]): string => {
    const qaPairs = questions.map((q, i) => `- ${q}\n  - Answer: ${answers[i] || 'No answer provided.'}`).join('\n\n');

    return `
        Startup Idea: "${idea}"

        User's Answers to Filter Questions:
        ${qaPairs}
    `;
};

export const scoreStartupIdea = async (
    idea: string,
    questions: string[],
    answers: string[]
): Promise<Result> => {
    const prompt = buildPrompt(idea, questions, answers);

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: `You are a brutally honest, world-class venture capitalist and startup incubator mentor. Your only goal is to kill weak ideas and identify promising ones. You provide direct, unfiltered feedback. Be critical and analytical. Based on the user's startup idea and their answers, evaluate the idea across four dimensions: Problem Severity, Solution Clarity, Market Urgency, and Monetization Strength.

            Your Task:
            Provide your analysis ONLY in a valid JSON format that strictly adheres to the provided schema. Calculate a score from 0 to 100 for each of the four dimensions. The final score should be the average of these four scores. The verdict and recommendation must be based on the final score ranges provided below.

            Final Score Ranges:
            - 80–100: Verdict "Ready to Test" -> Recommendation "Launch MVP this sprint."
            - 50–79: Verdict "Needs Refinement" -> Recommendation "Tweak the pain point or monetization model."
            - < 50: Verdict "Dead on Arrival" -> Recommendation "Move on. Not worth 2 weeks."
            
            Provide a concise, critical reasoning for each score, explaining the strengths and, more importantly, the weaknesses.`,
            responseMimeType: "application/json",
            responseSchema: resultSchema,
        },
    });

    try {
        const jsonText = response.text.trim();
        const parsedResult = JSON.parse(jsonText);
        return parsedResult as Result;
    } catch (e) {
        console.error("Failed to parse Gemini response:", response.text);
        throw new Error("The response from the AI was not valid JSON.");
    }
};
