import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { getQuizById } from '../data';
import { sportColors } from '../lib/color-palette';
import { useAppStore } from '../store/useAppStore';

export function QuizInfoPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const startQuiz = useAppStore((s) => s.startQuiz);

  const quiz = getQuizById(quizId || '');
  const [currentCard, setCurrentCard] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToCard = useCallback(
    (next: number) => {
      if (!quiz) return;
      if (next < 0 || next >= quiz.infoCards.length) return;
      setDirection(next > currentCard ? 1 : -1);
      setCurrentCard(next);
    },
    [currentCard, quiz],
  );

  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400">Quiz not found</p>
      </div>
    );
  }

  const colors = sportColors[quiz.sportId];
  const cards = quiz.infoCards;
  const card = cards[currentCard];
  const isFirst = currentCard === 0;
  const isLast = currentCard === cards.length - 1;
  const swipeThreshold = 50;

  const handleStartQuiz = () => {
    startQuiz(quiz.questions.length);
    navigate(`/quiz/${quiz.id}/play`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/quiz')}
            className="text-sm text-slate-500 hover:text-slate-700 min-h-[44px] flex items-center gap-1"
          >
            ← {t('quiz.backToQuizzes')}
          </button>
          <span className="text-sm text-slate-400 font-medium">
            {currentCard + 1} / {cards.length}
          </span>
        </div>
      </div>

      {/* Info hint */}
      <div className="px-6 pt-4 shrink-0">
        <p className="text-sm text-slate-500 text-center">{t('quiz.readFirst')}</p>
      </div>

      {/* Swipeable info cards */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentCard}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -swipeThreshold && !isLast) {
                goToCard(currentCard + 1);
              } else if (info.offset.x > swipeThreshold && !isFirst) {
                goToCard(currentCard - 1);
              }
            }}
            className="absolute inset-0 overflow-y-auto p-6 touch-pan-y"
          >
            <div className="max-w-lg mx-auto">
              <div
                className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: colors.bg, color: '#ffffff' }}
              >
                {t(quiz.nameKey)}
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-4">{t(card.titleKey)}</h3>

              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <p className="text-lg text-slate-600 leading-relaxed">{t(card.contentKey)}</p>
              </div>

              {isFirst && cards.length > 1 && (
                <p className="text-center text-sm text-slate-400 mt-8">
                  ← {t('guide.swipeHint')} →
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-4 border-t border-slate-200 bg-white shrink-0">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <button
            onClick={() => goToCard(currentCard - 1)}
            disabled={isFirst}
            className="px-5 py-3 rounded-xl font-medium text-sm transition-all min-h-[48px] min-w-[90px]"
            style={{
              backgroundColor: isFirst ? '#f1f5f9' : colors.bg,
              color: isFirst ? '#94a3b8' : '#ffffff',
            }}
          >
            ←
          </button>

          {/* Card dots */}
          <div className="flex gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => goToCard(i)}
                className="rounded-full transition-all min-h-0"
                style={{
                  width: i === currentCard ? 20 : 10,
                  height: 10,
                  backgroundColor: i === currentCard ? colors.bg : '#cbd5e1',
                  borderRadius: 5,
                }}
              />
            ))}
          </div>

          {isLast ? (
            <button
              onClick={handleStartQuiz}
              className="px-5 py-3 rounded-xl font-medium text-sm transition-all min-h-[48px] min-w-[90px]"
              style={{ backgroundColor: colors.bg, color: '#ffffff' }}
            >
              {t('quiz.startQuiz')} →
            </button>
          ) : (
            <button
              onClick={() => goToCard(currentCard + 1)}
              className="px-5 py-3 rounded-xl font-medium text-sm transition-all min-h-[48px] min-w-[90px]"
              style={{ backgroundColor: colors.bg, color: '#ffffff' }}
            >
              →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
