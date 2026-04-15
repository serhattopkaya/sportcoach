import { create } from 'zustand';
import type { SportId, DrillCategory } from '../types';

interface QuizState {
  currentQuestionIndex: number;
  answers: (number | null)[];
  isComplete: boolean;
}

interface AppState {
  selectedSport: SportId;
  selectedCategory: DrillCategory | 'all';
  setSport: (sport: SportId) => void;
  setCategory: (category: DrillCategory | 'all') => void;

  quiz: QuizState;
  startQuiz: (totalQuestions: number) => void;
  answerQuestion: (questionIndex: number, optionIndex: number) => void;
  nextQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
}

const initialQuizState: QuizState = {
  currentQuestionIndex: 0,
  answers: [],
  isComplete: false,
};

export const useAppStore = create<AppState>((set) => ({
  selectedSport: 'basketball',
  selectedCategory: 'all',
  setSport: (sport) => set({ selectedSport: sport, selectedCategory: 'all' }),
  setCategory: (category) => set({ selectedCategory: category }),

  quiz: initialQuizState,
  startQuiz: (totalQuestions) =>
    set({ quiz: { currentQuestionIndex: 0, answers: Array(totalQuestions).fill(null), isComplete: false } }),
  answerQuestion: (questionIndex, optionIndex) =>
    set((state) => {
      const answers = [...state.quiz.answers];
      answers[questionIndex] = optionIndex;
      return { quiz: { ...state.quiz, answers } };
    }),
  nextQuestion: () =>
    set((state) => ({ quiz: { ...state.quiz, currentQuestionIndex: state.quiz.currentQuestionIndex + 1 } })),
  completeQuiz: () =>
    set((state) => ({ quiz: { ...state.quiz, isComplete: true } })),
  resetQuiz: () => set({ quiz: initialQuizState }),
}));
