
export interface Clause {
  type: string;
  text: string;
}

export interface Risk {
  level: 'High' | 'Medium' | 'Low' | 'Informational';
  clause: string;
  reasoning: string;
}

export interface AnalysisResult {
  summary: string;
  clauses: Clause[];
  risks: Risk[];
}
