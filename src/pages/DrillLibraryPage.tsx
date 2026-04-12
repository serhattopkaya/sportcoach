import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useAppStore } from '../store/useAppStore';
import { getDrillsBySport } from '../data';
import { DifficultyBadge } from '../components/common/DifficultyBadge';

export function DrillLibraryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedSport, selectedCategory } = useAppStore();
  const drills = getDrillsBySport(selectedSport);

  const filtered = useMemo(
    () => selectedCategory === 'all' ? drills : drills.filter((d) => d.category === selectedCategory),
    [drills, selectedCategory],
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        {t('nav.allDrills')} — {t(`sport.${selectedSport}`)}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((drill) => (
          <button
            key={drill.id}
            onClick={() => navigate(`/drill/${drill.id}`)}
            className="bg-white rounded-lg p-4 text-left border border-slate-200 hover:border-slate-300 transition-all min-h-[80px]"
          >
            <div className="font-semibold text-slate-800">{t(drill.nameKey)}</div>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
              {t(drill.descriptionKey)}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <DifficultyBadge difficulty={drill.difficulty} />
              <span className="text-xs text-slate-400">
                {t('drill.minutes', { count: drill.durationMinutes })}
              </span>
              <span className="text-xs text-slate-400">
                {t('drill.players', drill.playerCount)}
              </span>
            </div>
            <div className="flex gap-2 mt-2">
              {drill.features.hasGuide && (
                <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                  📋 {t('drill.viewGuide')}
                </span>
              )}
              {(drill.features.hasAnimation || drill.youtubeVideoId) && (
                <span className="text-xs px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                  ▶️ {drill.youtubeVideoId ? t('drill.viewVideo') : t('drill.viewAnimation')}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
