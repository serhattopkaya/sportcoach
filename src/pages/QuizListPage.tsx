import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useAppStore } from '../store/useAppStore';
import { getQuizzesBySport } from '../data';
import { sportColors } from '../lib/color-palette';
import type { QuizDifficulty } from '../types';

const difficultyColors: Record<QuizDifficulty, { bg: string; text: string }> = {
  easy: { bg: '#dcfce7', text: '#166534' },
  medium: { bg: '#fef3c7', text: '#92400e' },
  hard: { bg: '#fecaca', text: '#991b1b' },
};

export function QuizListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedSport } = useAppStore();
  const quizzes = getQuizzesBySport(selectedSport);
  const colors = sportColors[selectedSport];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          {t('quiz.title')} — {t(`sport.${selectedSport}`)}
        </h2>
        <p className="text-sm text-slate-500 mt-1">{t('quiz.subtitle')}</p>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">{t('quiz.quizCount', { count: 0 })}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz) => {
            const dc = difficultyColors[quiz.difficulty];
            return (
              <button
                key={quiz.id}
                onClick={() => navigate(`/quiz/${quiz.id}`)}
                className="bg-white rounded-xl p-5 text-left border-2 border-slate-200 hover:border-slate-300 transition-all min-h-[120px] flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{ backgroundColor: dc.bg, color: dc.text }}
                  >
                    {t(`quiz.difficulty.${quiz.difficulty}`)}
                  </span>
                  <span className="text-sm text-slate-400">
                    {quiz.questions.length} {t('quiz.question', { current: '', total: '' }).includes('of') ? 'Q' : 'F'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{t(quiz.nameKey)}</h3>
                <p className="text-sm text-slate-500 flex-1">{t(quiz.descriptionKey)}</p>
                <div
                  className="mt-4 text-center py-2 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: colors.light, color: colors.accent }}
                >
                  {t('quiz.startQuiz')}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
