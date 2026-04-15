import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { getQuizById } from '../data';
import { sportColors } from '../lib/color-palette';
import { useAppStore } from '../store/useAppStore';

export function QuizPlayPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { quiz: quizState, answerQuestion, nextQuestion, completeQuiz } = useAppStore();

  const quiz = getQuizById(quizId || '');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [direction, setDirection] = useState(1);

  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400">Quiz not found</p>
      </div>
    );
  }

  const colors = sportColors[quiz.sportId];
  const { currentQuestionIndex } = quizState;
  const question = quiz.questions[currentQuestionIndex];
  const total = quiz.questions.length;
  const isCorrect = selectedOption === question.correctIndex;

  const handleSelect = (optionIndex: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    answerQuestion(currentQuestionIndex, optionIndex);
  };

  const handleNext = () => {
    setDirection(1);
    setSelectedOption(null);
    setShowFeedback(false);
    if (currentQuestionIndex + 1 >= total) {
      completeQuiz();
      navigate(`/quiz/${quiz.id}/result`, { replace: true });
    } else {
      nextQuestion();
    }
  };

  const optionStyle = (index: number) => {
    if (!showFeedback) {
      return {
        backgroundColor: '#ffffff',
        borderColor: '#e2e8f0',
        color: '#1e293b',
      };
    }
    if (index === question.correctIndex) {
      return {
        backgroundColor: '#dcfce7',
        borderColor: '#22c55e',
        color: '#166534',
      };
    }
    if (index === selectedOption && index !== question.correctIndex) {
      return {
        backgroundColor: '#fecaca',
        borderColor: '#ef4444',
        color: '#991b1b',
      };
    }
    return {
      backgroundColor: '#f8fafc',
      borderColor: '#e2e8f0',
      color: '#94a3b8',
    };
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with progress */}
      <div className="p-4 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigate(`/quiz/${quiz.id}`)}
            className="text-sm text-slate-500 hover:text-slate-700 min-h-[44px] flex items-center"
          >
            ← {t(quiz.nameKey)}
          </button>
          <span className="text-sm font-medium text-slate-500">
            {t('quiz.question', { current: currentQuestionIndex + 1, total })}
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / total) * 100}%`,
              backgroundColor: colors.bg,
            }}
          />
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestionIndex}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="p-6"
          >
            <div className="max-w-lg mx-auto">
              {/* Question */}
              <h3 className="text-xl font-bold text-slate-800 mb-6 leading-snug">
                {t(question.questionKey)}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {question.optionKeys.map((optionKey, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    disabled={showFeedback}
                    className="w-full text-left p-4 rounded-xl border-2 transition-all min-h-[52px] text-base font-medium"
                    style={optionStyle(index)}
                  >
                    <span className="inline-flex items-center gap-3">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                        style={{
                          backgroundColor: showFeedback && index === question.correctIndex
                            ? '#22c55e'
                            : showFeedback && index === selectedOption
                              ? '#ef4444'
                              : colors.light,
                          color: showFeedback && (index === question.correctIndex || index === selectedOption)
                            ? '#ffffff'
                            : colors.accent,
                        }}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      {t(optionKey)}
                    </span>
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <div
                    className="p-4 rounded-xl border"
                    style={{
                      backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
                      borderColor: isCorrect ? '#bbf7d0' : '#fecaca',
                    }}
                  >
                    <p className="font-bold text-base mb-1" style={{ color: isCorrect ? '#166534' : '#991b1b' }}>
                      {isCorrect ? t('quiz.correct') : t('quiz.wrong')}
                    </p>
                    <p className="text-sm" style={{ color: isCorrect ? '#15803d' : '#b91c1c' }}>
                      {t(question.explanationKey)}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next button */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-t border-slate-200 bg-white shrink-0"
        >
          <div className="max-w-lg mx-auto">
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-xl font-semibold text-base transition-all min-h-[52px]"
              style={{ backgroundColor: colors.bg, color: '#ffffff' }}
            >
              {currentQuestionIndex + 1 >= total ? t('quiz.score') : t('quiz.next')} →
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
