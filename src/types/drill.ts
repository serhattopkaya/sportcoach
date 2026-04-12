import type { SportId, DrillCategory } from './sport';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Drill {
  id: string;
  sportId: SportId;
  nameKey: string;
  descriptionKey: string;
  category: DrillCategory;
  difficulty: Difficulty;
  playerCount: { min: number; max: number };
  durationMinutes: number;
  equipment: string[];
  features: {
    hasAnimation: boolean;
    hasGuide: boolean;
  };
  animation?: AnimationData;
  guide?: GuideData;
  youtubeVideoId?: string;
}

export type AnimationPerspective = 'side' | 'behind';

export interface AnimationData {
  durationMs: number;
  phases: AnimationPhase[];
  keyframes: AnimationKeyframe[];
  behindKeyframes?: AnimationKeyframe[];
}

export interface AnimationPhase {
  nameKey: string;
  descriptionKey: string;
  startMs: number;
  endMs: number;
}

export interface AnimationKeyframe {
  timeMs: number;
  entities: EntityState[];
}

export interface PoseData {
  /** Torso tilt from vertical in degrees. Positive = lean forward (right). */
  torsoTilt: number;
  /** Left upper arm — absolute angle from straight down, clockwise positive. */
  leftUpperArm: number;
  /** Left forearm — absolute angle from straight down, clockwise positive. */
  leftForearm: number;
  /** Right upper arm — absolute angle from straight down, clockwise positive. */
  rightUpperArm: number;
  /** Right forearm — absolute angle from straight down, clockwise positive. */
  rightForearm: number;
  /** Left thigh — absolute angle from straight down, clockwise positive. */
  leftThigh: number;
  /** Left shin — absolute angle from straight down, clockwise positive. */
  leftShin: number;
  /** Right thigh — absolute angle from straight down, clockwise positive. */
  rightThigh: number;
  /** Right shin — absolute angle from straight down, clockwise positive. */
  rightShin: number;
}

export interface EntityState {
  entityId: string;
  type: 'player' | 'ball' | 'cone' | 'person' | 'platform';
  team: 'A' | 'B' | 'neutral';
  label?: string;
  x: number;
  y: number;
  rotation?: number;
  hasBall?: boolean;
  opacity?: number;
  pose?: PoseData;
}

export interface GuideData {
  steps: GuideStep[];
}

export interface GuideStep {
  stepNumber: number;
  titleKey: string;
  descriptionKey: string;
  courtSnapshot?: EntityState[];
  tipsKeys: string[];
  duration?: string;
}
