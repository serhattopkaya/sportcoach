import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { getDrillById } from '../data';
import { sportColors } from '../lib/color-palette';
import { CourtCanvas } from '../components/court/CourtCanvas';
import { PlaybackControls } from '../components/common/PlaybackControls';
import { useAnimationLoop } from '../hooks/useAnimationLoop';
import type { AnimationPerspective } from '../types';

export function AnimationPage() {
  const { drillId } = useParams<{ drillId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const drill = getDrillById(drillId || '');

  const [perspective, setPerspective] = useState<AnimationPerspective>('side');

  const hasBehind = !!drill?.animation?.behindKeyframes;

  const effectiveAnimation = useMemo(() => {
    if (!drill?.animation) return undefined;
    if (perspective === 'behind' && drill.animation.behindKeyframes) {
      return {
        durationMs: drill.animation.durationMs,
        phases: drill.animation.phases,
        keyframes: drill.animation.behindKeyframes,
      };
    }
    return drill.animation;
  }, [drill?.animation, perspective]);

  const controls = useAnimationLoop(effectiveAnimation);

  if (!drill) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400">{t('drill.noAnimation')}</p>
      </div>
    );
  }

  const colors = sportColors[drill.sportId];

  // Show YouTube video for drills that have a youtubeVideoId
  if (drill.youtubeVideoId) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-slate-500 hover:text-slate-700 min-h-[44px] flex items-center gap-1"
            >
              ← {t(drill.nameKey)}
            </button>
            <span className="text-sm font-medium text-slate-600">
              {t('drill.viewVideo')}
            </span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-4 overflow-hidden bg-slate-50">
          <div className="w-full max-w-3xl">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
                src={`https://www.youtube.com/embed/${drill.youtubeVideoId}?rel=0`}
                title={t(drill.nameKey)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center gap-3">
            {hasBehind && (
              <button
                onClick={() => setPerspective(perspective === 'side' ? 'behind' : 'side')}
                className="min-h-[44px] px-3 py-1 text-sm font-medium rounded-lg border transition-colors"
                style={{
                  borderColor: colors.bg,
                  backgroundColor: perspective === 'behind' ? colors.bg : 'transparent',
                  color: perspective === 'behind' ? '#fff' : colors.bg,
                }}
              >
                {perspective === 'side' ? t('drill.viewBehind') : t('drill.viewSide')}
              </button>
            )}
            <span className="text-sm font-medium text-slate-600">
              {t('drill.viewAnimation')}
            </span>
          </div>
        </div>
      </div>

      {/* Court with animated entities */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden bg-slate-50">
        <div className="w-full max-w-3xl">
          <CourtCanvas
            sportId={drill.sportId}
            entities={controls.state.entities}
            perspective={perspective}
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
