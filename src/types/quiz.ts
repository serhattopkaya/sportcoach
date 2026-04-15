import type { SportId } from './sport';

export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export interface Quiz {
  id: string;
  sportId: SportId;
  nameKey: string;
  descriptionKey: string;
  difficulty: QuizDifficulty;
  infoCards: InfoCard[];
  questions: Question[];
}

export interface InfoCard {
  titleKey: string;
  contentKey: string;
}

export interface Question {
  questionKey: string;
  optionKeys: [string, string, string, string];
  correctIndex: number;
  explanationKey: string;
}
