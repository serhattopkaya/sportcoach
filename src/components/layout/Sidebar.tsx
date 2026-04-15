import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';
import { useAppStore } from '../../store/useAppStore';
import { sports } from '../../data/sports';
import { getDrillsBySport, getQuizzesBySport } from '../../data';
import { sportColors } from '../../lib/color-palette';
import { DifficultyBadge } from '../common/DifficultyBadge';
import type { DrillCategory } from '../../types';

export function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSport, selectedCategory, setCategory } = useAppStore();

  const sport = sports.find((s) => s.id === selectedSport);
  const drills = getDrillsBySport(selectedSport);
  const quizzes = getQuizzesBySport(selectedSport);
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
    <div className="w-64 h-full flex flex-col border-r border-slate-200 bg-white">
      <div className="p-3 border-b border-slate-100">
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

      <div className="flex-1 overflow-y-auto p-2">
        {filteredDrills.map((drill) => {
          const isActive = location.pathname.includes(drill.id);
          return (
            <button
              key={drill.id}
              onClick={() => navigate(`/drill/${drill.id}`)}
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

      {quizzes.length > 0 && (
        <div className="p-3 border-t border-slate-100 shrink-0">
          <button
            onClick={() => navigate('/quiz')}
            className="w-full p-3 rounded-lg text-left transition-all min-h-[48px] flex items-center gap-2"
            style={{
              backgroundColor: location.pathname.startsWith('/quiz') ? colors.light : 'transparent',
              borderLeft: location.pathname.startsWith('/quiz') ? `3px solid ${colors.bg}` : '3px solid transparent',
            }}
          >
            <span className="text-lg">🧠</span>
            <div>
              <div className="font-medium text-sm text-slate-800">{t('nav.quiz')}</div>
              <span className="text-[10px] text-slate-400">
                {t('quiz.quizCount', { count: quizzes.length })}
              </span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
