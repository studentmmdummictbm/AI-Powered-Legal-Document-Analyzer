
import { GoogleGenAI, Type } from '@google/genai';
import type { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A concise, abstractive summary of the entire document's purpose and key outcomes."
    },
    clauses: {
      type: Type.ARRAY,
      description: "An array of key clauses extracted from the document.",
      items: {
        type: Type.OBJECT,
        properties: {
          type: {
            type: Type.STRING,
            description: "The type of clause (e.g., 'Indemnity', 'Termination Conditions', 'Confidentiality', 'Governing Law')."
          },
          text: {
            type: Type.STRING,
            description: "The exact text of the extracted clause."
          }
        },
        required: ['type', 'text']
      }
    },
    risks: {
      type: Type.ARRAY,
      description: "An array of potential risks or non-standard language found in the document.",
      items: {
        type: Type.OBJECT,
        properties: {
          level: {
            type: Type.STRING,
            description: "The assessed risk level. Must be one of: 'High', 'Medium', 'Low', 'Informational'.",
            enum: ['High', 'Medium', 'Low', 'Informational']
          },
          clause: {
            type: Type.STRING,
            description: "The specific text of the clause or phrase that poses a risk."
          },
          reasoning: {
            type: Type.STRING,
            description: "A clear explanation of why this clause is considered a risk."
          }
        },
        required: ['level', 'clause', 'reasoning']
      }
    }
  },
  required: ['summary', 'clauses', 'risks']
};

export const analyzeDocument = async (documentText: string): Promise<AnalysisResult> => {
  const prompt = `
    Analyze the following legal document. Provide a comprehensive analysis based on the requirements below.

    Document Text:
    ---
    ${documentText}
    ---

    Your task is to:
    1.  **Summarize the Document**: Provide a concise, abstractive summary of the entire document's purpose and key outcomes.
    2.  **Extract Key Clauses**: Automatically identify and extract specific, critical clauses. Focus on, but are not limited to: Indemnity, Termination Conditions, Confidentiality, and Governing Law.
    3.  **Risk Analysis**: Flag non-standard or potentially risky language. For each risk, specify the risk level ('High', 'Medium', 'Low', 'Informational'), identify the exact clause, and explain the reasoning behind the risk assessment.

    Return the entire analysis as a single JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};
