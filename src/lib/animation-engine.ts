import type { AnimationKeyframe, EntityState, AnimationPhase, PoseData } from '../types';

export const DEFAULT_POSE: PoseData = {
  torsoTilt: 0,
  leftUpperArm: 0, leftForearm: 0,
  rightUpperArm: 0, rightForearm: 0,
  leftThigh: 0, leftShin: 0,
  rightThigh: 0, rightShin: 0,
};

export interface InterpolatedState {
  entities: EntityState[];
  currentPhase: AnimationPhase | null;
  progress: number; // 0-1
}

/**
 * Interpolate entity positions between keyframes at a given time.
 * Uses linear interpolation for x, y, rotation, and opacity.
 */
export function interpolateKeyframes(
  keyframes: AnimationKeyframe[],
  timeMs: number,
  phases: AnimationPhase[],
  durationMs: number,
): InterpolatedState {
  const clampedTime = Math.max(0, Math.min(timeMs, durationMs));
  const progress = durationMs > 0 ? clampedTime / durationMs : 0;

  // Find current phase
  const currentPhase = phases.find(
    (p) => clampedTime >= p.startMs && clampedTime < p.endMs,
  ) ?? phases[phases.length - 1] ?? null;

  if (keyframes.length === 0) {
    return { entities: [], currentPhase, progress };
  }

  if (keyframes.length === 1) {
    return { entities: keyframes[0].entities, currentPhase, progress };
  }

  // Find the two keyframes bracketing the current time
  let beforeIdx = 0;
  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i].timeMs <= clampedTime) {
      beforeIdx = i;
    } else {
      break;
    }
  }

  const afterIdx = Math.min(beforeIdx + 1, keyframes.length - 1);

  // If we're exactly on or past the last keyframe
  if (beforeIdx === afterIdx) {
    return { entities: keyframes[beforeIdx].entities, currentPhase, progress };
  }

  const before = keyframes[beforeIdx];
  const after = keyframes[afterIdx];
  const segmentDuration = after.timeMs - before.timeMs;
  const t = segmentDuration > 0 ? (clampedTime - before.timeMs) / segmentDuration : 0;

  // Interpolate each entity
  const entities = interpolateEntities(before.entities, after.entities, t);

  return { entities, currentPhase, progress };
}

function interpolateEntities(
  from: EntityState[],
  to: EntityState[],
  t: number,
): EntityState[] {
  const result: EntityState[] = [];

  // Build a map of "to" entities for quick lookup
  const toMap = new Map<string, EntityState>();
  for (const entity of to) {
    toMap.set(entity.entityId, entity);
  }

  // Interpolate entities that exist in "from"
  for (const fromEntity of from) {
    const toEntity = toMap.get(fromEntity.entityId);
    if (toEntity) {
      result.push(lerpEntity(fromEntity, toEntity, t));
      toMap.delete(fromEntity.entityId);
    } else {
      // Entity disappears — fade out
      result.push({ ...fromEntity, opacity: lerp(fromEntity.opacity ?? 1, 0, t) });
    }
  }

  // Entities that only exist in "to" — fade in
  for (const toEntity of toMap.values()) {
    result.push({ ...toEntity, opacity: lerp(0, toEntity.opacity ?? 1, t) });
  }

  return result;
}

function lerpEntity(from: EntityState, to: EntityState, t: number): EntityState {
  return {
    ...from,
    x: lerp(from.x, to.x, t),
    y: lerp(from.y, to.y, t),
    rotation: lerp(from.rotation ?? 0, to.rotation ?? 0, t),
    opacity: lerp(from.opacity ?? 1, to.opacity ?? 1, t),
    hasBall: t < 0.5 ? from.hasBall : to.hasBall,
    label: to.label ?? from.label,
    pose: lerpPose(from.pose, to.pose, t),
  };
}

const POSE_KEYS = Object.keys(DEFAULT_POSE) as (keyof PoseData)[];

function lerpPose(
  from: PoseData | undefined,
  to: PoseData | undefined,
  t: number,
): PoseData | undefined {
  if (!from && !to) return undefined;
  const a = from ?? DEFAULT_POSE;
  const b = to ?? DEFAULT_POSE;
  const result = {} as PoseData;
  for (const key of POSE_KEYS) {
    result[key] = lerp(a[key], b[key], t);
  }
  return result;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Find the next phase boundary after the current time.
 * Returns the start time of the next phase, or durationMs if at the end.
 */
export function getNextPhaseTime(
  phases: AnimationPhase[],
  currentTimeMs: number,
  durationMs: number,
): number {
  for (const phase of phases) {
    if (phase.startMs > currentTimeMs) {
      return phase.startMs;
    }
  }
  return durationMs;
}

/**
 * Find the previous phase boundary before the current time.
 * Returns the start of the current phase, or 0 if at the beginning.
 */
export function getPrevPhaseTime(
  phases: AnimationPhase[],
  currentTimeMs: number,
): number {
  let prevStart = 0;
  for (const phase of phases) {
    if (phase.startMs >= currentTimeMs) break;
    prevStart = phase.startMs;
  }
  // If we're well into a phase, go to its start. If near its start, go to previous.
  const currentPhase = phases.find(
    (p) => currentTimeMs >= p.startMs && currentTimeMs < p.endMs,
  );
  if (currentPhase && currentTimeMs - currentPhase.startMs > 500) {
    return currentPhase.startMs;
  }
  return prevStart;
}
