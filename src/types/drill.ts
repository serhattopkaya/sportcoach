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
}

export interface AnimationData {
  durationMs: number;
  phases: AnimationPhase[];
  keyframes: AnimationKeyframe[];
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

export interface EntityState {
  entityId: string;
  type: 'player' | 'ball' | 'cone';
  team: 'A' | 'B' | 'neutral';
  label?: string;
  x: number;
  y: number;
  rotation?: number;
  hasBall?: boolean;
  opacity?: number;
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
