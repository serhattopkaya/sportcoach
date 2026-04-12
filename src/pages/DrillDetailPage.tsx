import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { getDrillById } from '../data';
import { sportColors } from '../lib/color-palette';
import { DifficultyBadge } from '../components/common/DifficultyBadge';

export function DrillDetailPage() {
  const { drillId } = useParams<{ drillId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const drill = getDrillById(drillId || '');

  if (!drill) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400">{t('drill.noGuide')}</p>
      </div>
    );
  }

  const colors = sportColors[drill.sportId];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-slate-500 hover:text-slate-700 mb-4 min-h-[44px] flex items-center gap-1"
      >
        ← {t('nav.drills')}
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{t(drill.nameKey)}</h2>
        <p className="text-slate-500 mt-2">{t(drill.descriptionKey)}</p>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <DifficultyBadge difficulty={drill.difficulty} />
          <span className="text-sm text-slate-500">
            {t('drill.minutes', { count: drill.durationMinutes })}
          </span>
          <span className="text-sm text-slate-500">
            {t('drill.players', drill.playerCount)}
          </span>
          {drill.equipment.length > 0 && (
            <span className="text-sm text-slate-500">
              {t('drill.equipment')}: {drill.equipment.join(', ')}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => drill.features.hasGuide && navigate(`/drill/${drill.id}/guide`)}
          disabled={!drill.features.hasGuide}
          className="w-full p-4 rounded-xl text-left transition-all min-h-[64px] flex items-center gap-4 border-2"
          style={{
            borderColor: drill.features.hasGuide ? colors.bg : '#e2e8f0',
            opacity: drill.features.hasGuide ? 1 : 0.5,
          }}
        >
          <span className="text-2xl">📋</span>
          <div>
            <div className="font-semibold text-slate-800">{t('drill.viewGuide')}</div>
            <p className="text-xs text-slate-500 mt-0.5">
              {drill.features.hasGuide
                ? t('guide.step', { number: drill.guide?.steps.length ?? 0 })
                : t('drill.noGuide')}
            </p>
          </div>
        </button>

        <button
          onClick={() => (drill.features.hasAnimation || drill.youtubeVideoId) && navigate(`/drill/${drill.id}/animation`)}
          disabled={!drill.features.hasAnimation && !drill.youtubeVideoId}
          className="w-full p-4 rounded-xl text-left transition-all min-h-[64px] flex items-center gap-4 border-2"
          style={{
            borderColor: (drill.features.hasAnimation || drill.youtubeVideoId) ? colors.bg : '#e2e8f0',
            opacity: (drill.features.hasAnimation || drill.youtubeVideoId) ? 1 : 0.5,
          }}
        >
          <span className="text-2xl">▶️</span>
          <div>
            <div className="font-semibold text-slate-800">
              {drill.youtubeVideoId ? t('drill.viewVideo') : t('drill.viewAnimation')}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {(drill.features.hasAnimation || drill.youtubeVideoId)
                ? drill.youtubeVideoId ? t('drill.viewVideo') : t('animation.play')
                : t('drill.noAnimation')}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
