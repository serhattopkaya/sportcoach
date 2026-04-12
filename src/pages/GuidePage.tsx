import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { getDrillById } from '../data';
import { sportColors } from '../lib/color-palette';
import { CourtCanvas } from '../components/court/CourtCanvas';

export function GuidePage() {
  const { drillId } = useParams<{ drillId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const drill = getDrillById(drillId || '');

  const goToStep = useCallback(
    (next: number) => {
      if (!drill?.guide) return;
      if (next < 0 || next >= drill.guide.steps.length) return;
      setDirection(next > currentStep ? 1 : -1);
      setCurrentStep(next);
    },
    [currentStep, drill],
  );

  if (!drill || !drill.guide) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400">{t('drill.noGuide')}</p>
      </div>
    );
  }

  const { steps } = drill.guide;
  const step = steps[currentStep];
  const colors = sportColors[drill.sportId];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const swipeThreshold = 50;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-slate-500 hover:text-slate-700 min-h-[44px] flex items-center gap-1"
          >
            ← {t(drill.nameKey)}
          </button>
          <span className="text-sm text-slate-400 font-medium">
            {currentStep + 1} {t('guide.of')} {steps.length}
          </span>
        </div>
      </div>

      {/* Swipeable step content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={(dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 })}
            animate={{ x: 0, opacity: 1 }}
            exit={(dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 })}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_e, info) => {
              if (info.offset.x < -swipeThreshold && !isLast) {
                goToStep(currentStep + 1);
              } else if (info.offset.x > swipeThreshold && !isFirst) {
                goToStep(currentStep - 1);
              }
            }}
            className="absolute inset-0 overflow-y-auto p-6 touch-pan-y"
          >
            <div className="max-w-lg mx-auto">
              {/* Step number badge */}
              <div
                className="inline-block px-3 py-1.5 rounded-full text-sm font-semibold mb-4"
                style={{ backgroundColor: colors.bg, color: '#ffffff' }}
              >
                {t('guide.step', { number: step.stepNumber })}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{t(step.titleKey)}</h3>

              {/* Description */}
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {t(step.descriptionKey)}
              </p>

              {/* Court snapshot */}
              {step.courtSnapshot && step.courtSnapshot.length > 0 && (
                <div className="mb-6 bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
                  <CourtCanvas
                    sportId={drill.sportId}
                    entities={step.courtSnapshot}
                    maxHeight={250}
                  />
                </div>
              )}

              {/* Duration */}
              {step.duration && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-base">⏱</span>
                  <span className="text-base text-slate-500 font-medium">
                    {t('guide.duration')}: {step.duration}
                  </span>
                </div>
              )}

              {/* Tips */}
              {step.tipsKeys.length > 0 && (
                <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                  <h4 className="text-sm font-semibold text-amber-800 mb-3 uppercase tracking-wide">
                    {t('guide.tips')}
                  </h4>
                  <ul className="space-y-2">
                    {step.tipsKeys.map((tipKey, i) => (
                      <li key={i} className="text-base text-amber-700 flex items-start gap-2">
                        <span className="shrink-0 mt-0.5">💡</span>
                        <span>{t(tipKey)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Swipe hint on first step */}
              {isFirst && steps.length > 1 && (
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
            onClick={() => goToStep(currentStep - 1)}
            disabled={isFirst}
            className="px-5 py-3 rounded-xl font-medium text-sm transition-all min-h-[48px] min-w-[90px]"
            style={{
              backgroundColor: isFirst ? '#f1f5f9' : colors.bg,
              color: isFirst ? '#94a3b8' : '#ffffff',
            }}
          >
            ←
          </button>

          {/* Step dots */}
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => goToStep(i)}
                className="rounded-full transition-all min-h-0"
                style={{
                  width: i === currentStep ? 20 : 10,
                  height: 10,
                  backgroundColor: i === currentStep ? colors.bg : '#cbd5e1',
                  borderRadius: 5,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => goToStep(currentStep + 1)}
            disabled={isLast}
            className="px-5 py-3 rounded-xl font-medium text-sm transition-all min-h-[48px] min-w-[90px]"
            style={{
              backgroundColor: isLast ? '#f1f5f9' : colors.bg,
              color: isLast ? '#94a3b8' : '#ffffff',
            }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
