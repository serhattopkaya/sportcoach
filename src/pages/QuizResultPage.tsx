import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { getQuizById } from '../data';
import { sportColors } from '../lib/color-palette';
import { useAppStore } from '../store/useAppStore';

export function QuizResultPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { quiz: quizState, resetQuiz, startQuiz } = useAppStore();

  const quiz = getQuizById(quizId || '');

  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400">Quiz not found</p>
      </div>
    );
  }

  const colors = sportColors[quiz.sportId];
  const total = quiz.questions.length;
  const score = quizState.answers.reduce<number>((acc, answer, i) => {
    return acc + (answer === quiz.questions[i].correctIndex ? 1 : 0);
  }, 0);
  const percentage = Math.round((score / total) * 100);

  const getMessage = () => {
    if (percentage >= 80) return t('quiz.great');
    if (percentage >= 50) return t('quiz.good');
    return t('quiz.keepPracticing');
  };

  const handleTryAgain = () => {
    startQuiz(quiz.questions.length);
    navigate(`/quiz/${quiz.id}/play`, { replace: true });
  };

  const handleBackToQuizzes = () => {
    resetQuiz();
    navigate('/quiz');
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="max-w-sm w-full text-center"
      >
        {/* Score circle */}
        <div className="relative mx-auto mb-6" style={{ width: 160, height: 160 }}>
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80" cy="80" r="70"
              fill="none" stroke="#e2e8f0" strokeWidth="10"
            />
            <motion.circle
              cx="80" cy="80" r="70"
              fill="none"
              stroke={colors.bg}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={2 * Math.PI * 70}
              animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - percentage / 100) }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              transform="rotate(-90 80 80)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-4xl font-bold text-slate-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {score}/{total}
            </motion.span>
          </div>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{getMessage()}</h2>
          <p className="text-slate-500 mb-8">
            {t('quiz.scoreText', { score, total })}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-3"
        >
          <button
            onClick={handleTryAgain}
            className="w-full py-4 rounded-xl font-semibold text-base transition-all min-h-[52px]"
            style={{ backgroundColor: colors.bg, color: '#ffffff' }}
          >
            {t('quiz.tryAgain')}
          </button>
          <button
            onClick={handleBackToQuizzes}
            className="w-full py-4 rounded-xl font-semibold text-base transition-all min-h-[52px] border-2"
            style={{ borderColor: colors.bg, color: colors.accent, backgroundColor: colors.light }}
          >
            {t('quiz.backToQuizzes')}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
