export interface Topic {
  slug: string;
  number: number;
  title: string;
  emoji: string;
  shortDescription: string;
  sections: Section[];
  quiz: QuizQuestion[];
}

export interface Section {
  title: string;
  content: string;
  codeExample?: CodeExample;
  tip?: string;
}

export interface CodeExample {
  language: 'python' | 'bash' | 'shell' | 'text' | 'ini' | 'yaml' | 'c';
  code: string;
  explanation?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
