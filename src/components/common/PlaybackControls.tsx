import type { PlaybackSpeed } from '../../hooks/useAnimationLoop';

interface PlaybackControlsProps {
  isPlaying: boolean;
  speed: PlaybackSpeed;
  loop: boolean;
  progress: number;
  currentTimeMs: number;
  durationMs: number;
  phaseName: string | null;
  accentColor: string;
  onTogglePlay: () => void;
  onSetSpeed: (speed: PlaybackSpeed) => void;
  onToggleLoop: () => void;
  onSeekProgress: (progress: number) => void;
  onNextPhase: () => void;
  onPrevPhase: () => void;
}

const speeds: PlaybackSpeed[] = [0.5, 1, 1.5, 2];

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export function PlaybackControls({
  isPlaying,
  speed,
  loop,
  progress,
  currentTimeMs,
  durationMs,
  phaseName,
  accentColor,
  onTogglePlay,
  onSetSpeed,
  onToggleLoop,
  onSeekProgress,
  onNextPhase,
  onPrevPhase,
}: PlaybackControlsProps) {

  const handleScrub = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, x / rect.width));
    onSeekProgress(newProgress);
  };

  const nextSpeedIdx = speeds.indexOf(speed);
  const nextSpeed = speeds[(nextSpeedIdx + 1) % speeds.length];

  return (
    <div className="bg-white border-t border-slate-200 px-4 py-3">
      {/* Phase label */}
      {phaseName && (
        <div className="text-center mb-2">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: accentColor + '20', color: accentColor }}
          >
            {phaseName}
          </span>
        </div>
      )}

      {/* Timeline scrubber */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs text-slate-400 w-10 text-right font-mono">
          {formatTime(currentTimeMs)}
        </span>
        <div
          className="flex-1 h-2 bg-slate-200 rounded-full cursor-pointer relative"
          onPointerDown={handleScrub}
          onPointerMove={(e) => {
            if (e.buttons === 1) handleScrub(e);
          }}
        >
          <div
            className="h-full rounded-full transition-none"
            style={{ width: `${progress * 100}%`, backgroundColor: accentColor }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 shadow-sm"
            style={{ left: `${progress * 100}%`, borderColor: accentColor, marginLeft: -8 }}
          />
        </div>
        <span className="text-xs text-slate-400 w-10 font-mono">
          {formatTime(durationMs)}
        </span>
      </div>

      {/* Control buttons */}
      <div className="flex items-center justify-between">
        {/* Left: speed + loop */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSetSpeed(nextSpeed)}
            className="px-3 py-2 rounded-lg text-xs font-bold min-h-[44px] min-w-[52px] bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            {speed}x
          </button>
          <button
            onClick={onToggleLoop}
            className="px-3 py-2 rounded-lg text-sm min-h-[44px] min-w-[44px] transition-colors"
            style={{
              backgroundColor: loop ? accentColor + '20' : '#f1f5f9',
              color: loop ? accentColor : '#94a3b8',
            }}
          >
            🔁
          </button>
        </div>

        {/* Center: prev / play / next */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevPhase}
            className="w-11 h-11 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center text-lg transition-colors"
          >
            ⏮
          </button>
          <button
            onClick={onTogglePlay}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl shadow-md transition-transform active:scale-95"
            style={{ backgroundColor: accentColor }}
          >
            {isPlaying ? '⏸' : '▶️'}
          </button>
          <button
            onClick={onNextPhase}
            className="w-11 h-11 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center text-lg transition-colors"
          >
            ⏭
          </button>
        </div>

        {/* Right: spacer for symmetry */}
        <div className="w-[108px]" />
      </div>
    </div>
  );
}
