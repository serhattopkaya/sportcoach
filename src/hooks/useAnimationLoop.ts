import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import type { AnimationData } from '../types';
import { interpolateKeyframes, getNextPhaseTime, getPrevPhaseTime } from '../lib/animation-engine';
import type { InterpolatedState } from '../lib/animation-engine';

export type PlaybackSpeed = 0.5 | 1 | 1.5 | 2;

interface AnimationControls {
  state: InterpolatedState;
  isPlaying: boolean;
  speed: PlaybackSpeed;
  loop: boolean;
  currentTimeMs: number;
  durationMs: number;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setSpeed: (speed: PlaybackSpeed) => void;
  toggleLoop: () => void;
  seek: (timeMs: number) => void;
  seekProgress: (progress: number) => void;
  nextPhase: () => void;
  prevPhase: () => void;
  reset: () => void;
}

// Throttle re-renders to ~30fps for UI updates (scrubber, time display)
// while the rAF loop runs at full 60fps internally for smooth canvas updates
const RENDER_INTERVAL_MS = 33;

export function useAnimationLoop(animation: AnimationData | undefined): AnimationControls {
  const [renderTick, setRenderTick] = useState(0);

  const playingRef = useRef(false);
  const speedRef = useRef<PlaybackSpeed>(1);
  const loopRef = useRef(false);
  const timeRef = useRef(0);
  const lastFrameRef = useRef(0);
  const lastRenderRef = useRef(0);
  const rafRef = useRef<number>(0);

  const durationMs = animation?.durationMs ?? 0;
  const keyframes = useMemo(() => animation?.keyframes ?? [], [animation]);
  const phases = useMemo(() => animation?.phases ?? [], [animation]);

  const tick = useCallback(() => {
    if (!playingRef.current) return;

    const now = performance.now();
    const delta = (now - lastFrameRef.current) * speedRef.current;
    lastFrameRef.current = now;

    let nextTime = timeRef.current + delta;

    if (nextTime >= durationMs) {
      if (loopRef.current) {
        nextTime = nextTime % durationMs;
      } else {
        nextTime = durationMs;
        playingRef.current = false;
        // Force render for play state change
        lastRenderRef.current = 0;
      }
    }

    timeRef.current = nextTime;

    // Throttle React re-renders
    if (now - lastRenderRef.current >= RENDER_INTERVAL_MS || !playingRef.current) {
      lastRenderRef.current = now;
      setRenderTick((t) => t + 1);
    }

    if (playingRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [durationMs]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    playingRef.current = false;
    timeRef.current = 0;
    lastFrameRef.current = 0;
    lastRenderRef.current = 0;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }

    setRenderTick((t) => t + 1);
  }, [animation]);

  const play = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timeRef.current >= durationMs) {
      timeRef.current = 0;
    }
    lastFrameRef.current = performance.now();
    playingRef.current = true;
    rafRef.current = requestAnimationFrame(tick);
    setRenderTick((t) => t + 1);
  }, [tick, durationMs]);

  const pause = useCallback(() => {
    playingRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setRenderTick((t) => t + 1);
  }, []);

  const togglePlay = useCallback(() => {
    if (playingRef.current) pause();
    else play();
  }, [play, pause]);

  const setSpeed = useCallback((s: PlaybackSpeed) => {
    speedRef.current = s;
    setRenderTick((t) => t + 1);
  }, []);

  const toggleLoop = useCallback(() => {
    loopRef.current = !loopRef.current;
    setRenderTick((t) => t + 1);
  }, []);

  const seek = useCallback((timeMs: number) => {
    const clamped = Math.max(0, Math.min(timeMs, durationMs));
    timeRef.current = clamped;
    setRenderTick((t) => t + 1);
  }, [durationMs]);

  const seekProgress = useCallback((progress: number) => {
    seek(progress * durationMs);
  }, [seek, durationMs]);

  const nextPhase = useCallback(() => {
    const nextTime = getNextPhaseTime(phases, timeRef.current, durationMs);
    seek(nextTime);
  }, [phases, durationMs, seek]);

  const prevPhase = useCallback(() => {
    const prevTime = getPrevPhaseTime(phases, timeRef.current);
    seek(prevTime);
  }, [phases, seek]);

  const reset = useCallback(() => {
    pause();
    timeRef.current = 0;
    setRenderTick((t) => t + 1);
  }, [pause]);

  const state = useMemo(
    () => interpolateKeyframes(keyframes, timeRef.current, phases, durationMs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderTick, keyframes, phases, durationMs],
  );

  return {
    state,
    isPlaying: playingRef.current,
    speed: speedRef.current,
    loop: loopRef.current,
    currentTimeMs: timeRef.current,
    durationMs,
    play,
    pause,
    togglePlay,
    setSpeed,
    toggleLoop,
    seek,
    seekProgress,
    nextPhase,
    prevPhase,
    reset,
  };
}
