export interface User {
  id: string;
  name: string;
  email: string;
  progress: UserProgress;
}

export interface UserProgress {
  currentModule: number;
  completedModules: number[];
  sessionProgress: { [moduleId: number]: number[] }; // array of completed session IDs
}

export interface Module {
  id: number;
  title: string;
  description: string;
  sessions: Session[];
  isLocked: boolean;
  testId: number;
}

export interface Session {
  id: number;
  title: string;
  content: string;
  practicalExample?: string;
  practicalActivity?: string;
  isCompleted: boolean;
}

export interface Test {
  id: number;
  moduleId: number;
  title: string;
  questions: Question[];
}

export interface Question {
  id: number;
  type: 'multiple-choice' | 'code-completion' | 'descriptive';
  question: string;
  options?: string[]; // for multiple choice
  codePrefix?: string; // for code completion (e.g., "git ")
  correctAnswer: string;
  userAnswer?: string;
}

export interface TestResult {
  testId: number;
  score: number;
  passed: boolean;
  answers: { [questionId: number]: string };
  pendingValidation: number[]; // question IDs waiting for manual validation
}