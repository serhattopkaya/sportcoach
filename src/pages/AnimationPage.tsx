import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { getDrillById } from '../data';
import { sportColors } from '../lib/color-palette';
import { CourtCanvas } from '../components/court/CourtCanvas';
import { PlaybackControls } from '../components/common/PlaybackControls';
import { useAnimationLoop } from '../hooks/useAnimationLoop';

export function AnimationPage() {
  const { drillId } = useParams<{ drillId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const drill = getDrillById(drillId || '');

  const controls = useAnimationLoop(drill?.animation);

  if (!drill) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400">{t('drill.noAnimation')}</p>
      </div>
    );
  }

  const colors = sportColors[drill.sportId];

  if (!drill.animation) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-white shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-slate-500 hover:text-slate-700 min-h-[44px] flex items-center gap-1"
          >
            ← {t(drill.nameKey)}
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <span className="text-4xl mb-4 block">▶️</span>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{t(drill.nameKey)}</h3>
            <p className="text-sm text-slate-500">{t('drill.noAnimation')}</p>
          </div>
        </div>
      </div>
    );
  }

  const phaseName = controls.state.currentPhase
    ? t(controls.state.currentPhase.nameKey)
    : null;

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
          <span className="text-sm font-medium text-slate-600">
            {t('drill.viewAnimation')}
          </span>
        </div>
      </div>

      {/* Court with animated entities */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden bg-slate-50">
        <div className="w-full max-w-3xl">
          <CourtCanvas
            sportId={drill.sportId}
            entities={controls.state.entities}
          />
          {/* Phase description */}
          {controls.state.currentPhase && (
            <p className="text-center text-sm text-slate-500 mt-3">
              {t(controls.state.currentPhase.descriptionKey)}
            </p>
          )}
        </div>
      </div>

      {/* Playback controls */}
      <PlaybackControls
        isPlaying={controls.isPlaying}
        speed={controls.speed}
        loop={controls.loop}
        progress={controls.state.progress}
        currentTimeMs={controls.currentTimeMs}
        durationMs={controls.durationMs}
        phaseName={phaseName}
        accentColor={colors.bg}
        onTogglePlay={controls.togglePlay}
        onSetSpeed={controls.setSpeed}
        onToggleLoop={controls.toggleLoop}
        onSeekProgress={controls.seekProgress}
        onNextPhase={controls.nextPhase}
        onPrevPhase={controls.prevPhase}
      />
    </div>
  );
}
