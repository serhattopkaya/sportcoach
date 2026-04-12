import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { sports } from '../../data/sports';
import { getDrillsBySport } from '../../data';
import { sportColors } from '../../lib/color-palette';
import { DifficultyBadge } from '../common/DifficultyBadge';
import type { DrillCategory } from '../../types';

export function MobileDrillDrawer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSport, selectedCategory, setCategory } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  const sport = sports.find((s) => s.id === selectedSport);
  const drills = getDrillsBySport(selectedSport);
  const colors = sportColors[selectedSport];

  const filteredDrills = useMemo(
    () => selectedCategory === 'all' ? drills : drills.filter((d) => d.category === selectedCategory),
    [drills, selectedCategory],
  );

  const categories: ('all' | DrillCategory)[] = useMemo(
    () => ['all', ...(sport?.categories ?? [])],
    [sport],
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 md:hidden z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white text-xl"
        style={{ backgroundColor: colors.bg }}
      >
        📋
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white rounded-t-2xl max-h-[80vh] flex flex-col shadow-2xl"
            >
              <div className="flex justify-center py-3 shrink-0">
                <div className="w-10 h-1 bg-slate-300 rounded-full" />
              </div>

              <div className="px-4 pb-3 flex items-center justify-between shrink-0">
                <h3 className="font-bold text-slate-800">
                  {t('nav.drills')} — {t(`sport.${selectedSport}`)}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 text-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="px-4 pb-3 shrink-0">
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className="px-2.5 py-1.5 rounded-md text-xs font-medium transition-all min-h-[32px]"
                        style={{
                          backgroundColor: isActive ? colors.bg : '#f1f5f9',
                          color: isActive ? '#ffffff' : '#64748b',
                        }}
                      >
                        {t(`category.${cat}`)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pb-6">
                {filteredDrills.map((drill) => {
                  const isActive = location.pathname.includes(drill.id);
                  return (
                    <button
                      key={drill.id}
                      onClick={() => {
                        navigate(`/drill/${drill.id}`);
                        setIsOpen(false);
                      }}
                      className="w-full text-left p-3 rounded-lg mb-1 transition-all min-h-[52px]"
                      style={{
                        backgroundColor: isActive ? colors.light : 'transparent',
                        borderLeft: isActive ? `3px solid ${colors.bg}` : '3px solid transparent',
                      }}
                    >
                      <div className="font-medium text-sm text-slate-800 leading-tight">
                        {t(drill.nameKey)}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <DifficultyBadge difficulty={drill.difficulty} size="xs" />
                        <span className="text-[10px] text-slate-400">
                          {t('drill.minutes', { count: drill.durationMinutes })}
                        </span>
                        {drill.features.hasGuide && <span className="text-[10px]">📋</span>}
                        {(drill.features.hasAnimation || drill.youtubeVideoId) && <span className="text-[10px]">▶️</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
