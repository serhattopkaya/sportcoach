import type { Drill, PoseData, EntityState, AnimationKeyframe } from '../../types';

// ─── Reusable stick-figure poses (side-view, figure facing right) ────

const STAND: PoseData = {
  torsoTilt: 0,
  leftUpperArm: 5, leftForearm: 15,
  rightUpperArm: -5, rightForearm: -15,
  leftThigh: 0, leftShin: 0,
  rightThigh: 0, rightShin: 0,
};

const WIDE_ARMS: PoseData = {
  torsoTilt: 0,
  leftUpperArm: 15, leftForearm: 45,
  rightUpperArm: -15, rightForearm: -45,
  leftThigh: 0, leftShin: 0,
  rightThigh: 0, rightShin: 0,
};

const R_LIFT: PoseData = {
  torsoTilt: 5,
  leftUpperArm: -20, leftForearm: -30,
  rightUpperArm: 25, rightForearm: 110,
  leftThigh: -5, leftShin: -3,
  rightThigh: 55, rightShin: 5,
};

const R_PLANT: PoseData = {
  torsoTilt: 3,
  leftUpperArm: -10, leftForearm: -15,
  rightUpperArm: 10, rightForearm: 30,
  leftThigh: -18, leftShin: -5,
  rightThigh: 12, rightShin: 5,
};

const L_LIFT: PoseData = {
  torsoTilt: 3,
  leftUpperArm: 25, leftForearm: 110,
  rightUpperArm: -15, rightForearm: -25,
  leftThigh: 45, leftShin: 10,
  rightThigh: 3, rightShin: 0,
};

const R_REACH_DOWN: PoseData = {
  torsoTilt: -3,
  leftUpperArm: 20, leftForearm: 90,
  rightUpperArm: -20, rightForearm: -30,
  leftThigh: 5, leftShin: 0,
  rightThigh: -30, rightShin: -20,
};

const SPLIT_RL: PoseData = {
  torsoTilt: -2,
  leftUpperArm: 8, leftForearm: 30,
  rightUpperArm: -8, rightForearm: -15,
  leftThigh: 15, leftShin: 5,
  rightThigh: -10, rightShin: 0,
};

const L_REACH_DOWN: PoseData = {
  torsoTilt: -2,
  leftUpperArm: -20, leftForearm: -30,
  rightUpperArm: 20, rightForearm: 90,
  leftThigh: -25, leftShin: -15,
  rightThigh: 5, rightShin: 0,
};

const L_KNEE_HIGH: PoseData = {
  torsoTilt: 2,
  leftUpperArm: -15, leftForearm: -20,
  rightUpperArm: 20, rightForearm: 90,
  leftThigh: 80, leftShin: -70,
  rightThigh: 3, rightShin: 0,
};

const R_REACH_FWD: PoseData = {
  torsoTilt: 3,
  leftUpperArm: -15, leftForearm: -20,
  rightUpperArm: 20, rightForearm: 90,
  leftThigh: 5, leftShin: 0,
  rightThigh: 30, rightShin: 20,
};

const L_REACH_FWD: PoseData = {
  torsoTilt: 2,
  leftUpperArm: 20, leftForearm: 90,
  rightUpperArm: -15, rightForearm: -20,
  leftThigh: 25, leftShin: 15,
  rightThigh: 5, rightShin: 0,
};

const TURN_STEP: PoseData = {
  torsoTilt: -8,
  leftUpperArm: 15, leftForearm: 50,
  rightUpperArm: -10, rightForearm: -20,
  leftThigh: 5, leftShin: 0,
  rightThigh: -5, rightShin: 0,
};

const V_WIDE: PoseData = {
  torsoTilt: 0,
  leftUpperArm: -70, leftForearm: -30,
  rightUpperArm: 70, rightForearm: 30,
  leftThigh: 15, leftShin: 3,
  rightThigh: -15, rightShin: -3,
};

const TURN_MID: PoseData = {
  torsoTilt: -15,
  leftUpperArm: 25, leftForearm: 60,
  rightUpperArm: -20, rightForearm: -40,
  leftThigh: 10, leftShin: 5,
  rightThigh: -8, rightShin: -3,
};

const LATERAL_STEP: PoseData = {
  torsoTilt: -5,
  leftUpperArm: 15, leftForearm: 40,
  rightUpperArm: -15, rightForearm: -40,
  leftThigh: 20, leftShin: 10,
  rightThigh: -20, rightShin: -10,
};

const TAP_SIDE: PoseData = {
  torsoTilt: -3,
  leftUpperArm: 10, leftForearm: 25,
  rightUpperArm: -10, rightForearm: -25,
  leftThigh: 5, leftShin: 0,
  rightThigh: 30, rightShin: -15,
};

const ARMS_PUMP: PoseData = {
  torsoTilt: 2,
  leftUpperArm: -80, leftForearm: -30,
  rightUpperArm: 80, rightForearm: 30,
  leftThigh: 5, leftShin: 0,
  rightThigh: 5, rightShin: 0,
};

// ─── Helpers ─────────────────────────────────────────────────────────

const PLAT: EntityState = Object.freeze({ entityId: 'platform', type: 'platform', team: 'neutral', x: 0.55, y: 0.82 }) as EntityState;

function kf(t: number, x: number, y: number, pose: PoseData): AnimationKeyframe {
  return { timeMs: t, entities: [PLAT, { entityId: 'person', type: 'person' as const, team: 'neutral' as const, x, y, pose }] };
}

// Common y positions
const FY = 0.56;   // hips on floor
const SY = 0.49;   // hips on step
const TY = 0.52;   // transitioning

export const stepAerobicDrills: Drill[] = [
  // ─── 1. Warm-up: March and Tap ───────────────────────────────────────
  {
    id: 'step-aerobic-march-and-tap',
    sportId: 'step-aerobic',
    nameKey: 'step-aerobic.drill.march-and-tap.name',
    descriptionKey: 'step-aerobic.drill.march-and-tap.description',
    category: 'warmup',
    difficulty: 'beginner',
    playerCount: { min: 1, max: 20 },
    durationMinutes: 5,
    equipment: ['step platform'],
    features: { hasAnimation: false, hasGuide: true },
    guide: {
      steps: [
        {
          stepNumber: 1,
          titleKey: 'step-aerobic.guide.march-and-tap.step1.title',
          descriptionKey: 'step-aerobic.guide.march-and-tap.step1.description',
          tipsKeys: ['step-aerobic.guide.march-and-tap.tip1'],
          duration: '1 min',
        },
        {
          stepNumber: 2,
          titleKey: 'step-aerobic.guide.march-and-tap.step2.title',
          descriptionKey: 'step-aerobic.guide.march-and-tap.step2.description',
          tipsKeys: [],
          duration: '1 min',
        },
        {
          stepNumber: 3,
          titleKey: 'step-aerobic.guide.march-and-tap.step3.title',
          descriptionKey: 'step-aerobic.guide.march-and-tap.step3.description',
          tipsKeys: ['step-aerobic.guide.march-and-tap.tip2'],
          duration: '2 min',
        },
        {
          stepNumber: 4,
          titleKey: 'step-aerobic.guide.march-and-tap.step4.title',
          descriptionKey: 'step-aerobic.guide.march-and-tap.step4.description',
          tipsKeys: [],
          duration: '1 min',
        },
      ],
    },
  },

  // ─── 2. Basic Steps: Basic Step ──────────────────────────────────────
  {
    id: 'step-aerobic-basic-step',
    sportId: 'step-aerobic',
    nameKey: 'step-aerobic.drill.basic-step.name',
    descriptionKey: 'step-aerobic.drill.basic-step.description',
    category: 'basic-steps',
    difficulty: 'beginner',
    playerCount: { min: 1, max: 20 },
    durationMinutes: 8,
    equipment: ['step platform'],
    features: { hasAnimation: true, hasGuide: true },
    guide: {
      steps: [
        {
          stepNumber: 1,
          titleKey: 'step-aerobic.guide.basic-step.step1.title',
          descriptionKey: 'step-aerobic.guide.basic-step.step1.description',
          tipsKeys: ['step-aerobic.guide.basic-step.tip1'],
          duration: '1 min',
        },
        {
          stepNumber: 2,
          titleKey: 'step-aerobic.guide.basic-step.step2.title',
          descriptionKey: 'step-aerobic.guide.basic-step.step2.description',
          tipsKeys: [],
          duration: '2 min',
        },
        {
          stepNumber: 3,
          titleKey: 'step-aerobic.guide.basic-step.step3.title',
          descriptionKey: 'step-aerobic.guide.basic-step.step3.description',
          tipsKeys: ['step-aerobic.guide.basic-step.tip2'],
          duration: '3 min',
        },
        {
          stepNumber: 4,
          titleKey: 'step-aerobic.guide.basic-step.step4.title',
          descriptionKey: 'step-aerobic.guide.basic-step.step4.description',
          tipsKeys: [],
          duration: '2 min',
        },
      ],
    },
    animation: {
      durationMs: 8000,
      phases: [
        { nameKey: 'step-aerobic.anim.basic-step.phase1.name', descriptionKey: 'step-aerobic.anim.basic-step.phase1.description', startMs: 0, endMs: 2000 },
        { nameKey: 'step-aerobic.anim.basic-step.phase2.name', descriptionKey: 'step-aerobic.anim.basic-step.phase2.description', startMs: 2000, endMs: 4000 },
        { nameKey: 'step-aerobic.anim.basic-step.phase3.name', descriptionKey: 'step-aerobic.anim.basic-step.phase3.description', startMs: 4000, endMs: 6000 },
        { nameKey: 'step-aerobic.anim.basic-step.phase4.name', descriptionKey: 'step-aerobic.anim.basic-step.phase4.description', startMs: 6000, endMs: 8000 },
      ],
      keyframes: [
        kf(0,    0.38, FY,   STAND),
        kf(1000, 0.40, 0.55, R_LIFT),
        kf(2000, 0.47, TY,   R_PLANT),
        kf(3000, 0.50, 0.50, L_LIFT),
        kf(4000, 0.53, SY,   STAND),
        kf(5000, 0.50, 0.51, R_REACH_DOWN),
        kf(6000, 0.46, 0.54, SPLIT_RL),
        kf(7000, 0.41, 0.55, L_REACH_DOWN),
        kf(8000, 0.38, FY,   STAND),
      ],
    },
  },

  // ─── 3. Basic Steps: V-Step ──────────────────────────────────────────
  {
    id: 'step-aerobic-v-step',
    sportId: 'step-aerobic',
    nameKey: 'step-aerobic.drill.v-step.name',
    descriptionKey: 'step-aerobic.drill.v-step.description',
    category: 'basic-steps',
    difficulty: 'beginner',
    playerCount: { min: 1, max: 20 },
    durationMinutes: 8,
    equipment: ['step platform'],
    features: { hasAnimation: true, hasGuide: true },
    guide: {
      steps: [
        {
          stepNumber: 1,
          titleKey: 'step-aerobic.guide.v-step.step1.title',
          descriptionKey: 'step-aerobic.guide.v-step.step1.description',
          tipsKeys: ['step-aerobic.guide.v-step.tip1'],
          duration: '1 min',
        },
        {
          stepNumber: 2,
          titleKey: 'step-aerobic.guide.v-step.step2.title',
          descriptionKey: 'step-aerobic.guide.v-step.step2.description',
          tipsKeys: [],
          duration: '2 min',
        },
        {
          stepNumber: 3,
          titleKey: 'step-aerobic.guide.v-step.step3.title',
          descriptionKey: 'step-aerobic.guide.v-step.step3.description',
          tipsKeys: ['step-aerobic.guide.v-step.tip2'],
          duration: '3 min',
        },
        {
          stepNumber: 4,
          titleKey: 'step-aerobic.guide.v-step.step4.title',
          descriptionKey: 'step-aerobic.guide.v-step.step4.description',
          tipsKeys: [],
          duration: '2 min',
        },
      ],
    },
    animation: {
      durationMs: 8000,
      phases: [
        { nameKey: 'step-aerobic.anim.v-step.phase1.name', descriptionKey: 'step-aerobic.anim.v-step.phase1.description', startMs: 0, endMs: 2000 },
        { nameKey: 'step-aerobic.anim.v-step.phase2.name', descriptionKey: 'step-aerobic.anim.v-step.phase2.description', startMs: 2000, endMs: 4000 },
        { nameKey: 'step-aerobic.anim.v-step.phase3.name', descriptionKey: 'step-aerobic.anim.v-step.phase3.description', startMs: 4000, endMs: 6000 },
        { nameKey: 'step-aerobic.anim.v-step.phase4.name', descriptionKey: 'step-aerobic.anim.v-step.phase4.description', startMs: 6000, endMs: 8000 },
      ],
      keyframes: [
        // Phase 1: Right foot up, arms start opening
        kf(0,    0.42, FY,   STAND),
        kf(900,  0.45, 0.54, R_LIFT),
        kf(1800, 0.50, TY,   WIDE_ARMS),
        // Phase 2: Left foot up, wide V position at top
        kf(2600, 0.52, 0.50, L_LIFT),
        kf(3500, 0.50, SY,   V_WIDE),
        // Phase 3: Hold wide, begin descent
        kf(4400, 0.50, SY,   WIDE_ARMS),
        kf(5200, 0.52, 0.51, R_REACH_DOWN),
        // Phase 4: Return to start
        kf(6200, 0.49, 0.53, SPLIT_RL),
        kf(7200, 0.45, 0.55, L_REACH_DOWN),
        kf(8000, 0.42, FY,   STAND),
      ],
    },
  },

  // ─── 4. Basic Steps: A-Step (Over the Top) ──────────────────────────
  {
    id: 'step-aerobic-a-step',
    sportId: 'step-aerobic',
    nameKey: 'step-aerobic.drill.a-step.name',
    descriptionKey: 'step-aerobic.drill.a-step.description',
    category: 'basic-steps',
    difficulty: 'intermediate',
    playerCount: { min: 1, max: 20 },
    durationMinutes: 10,
    equipment: ['step platform'],
    features: { hasAnimation: true, hasGuide: true },
    guide: {
      steps: [
        {
          stepNumber: 1,
          titleKey: 'step-aerobic.guide.a-step.step1.title',
          descriptionKey: 'step-aerobic.guide.a-step.step1.description',
          tipsKeys: ['step-aerobic.guide.a-step.tip1'],
          duration: '2 min',
        },
        {
          stepNumber: 2,
          titleKey: 'step-aerobic.guide.a-step.step2.title',
          descriptionKey: 'step-aerobic.guide.a-step.step2.description',
          tipsKeys: [],
          duration: '2 min',
        },
        {
          stepNumber: 3,
          titleKey: 'step-aerobic.guide.a-step.step3.title',
          descriptionKey: 'step-aerobic.guide.a-step.step3.description',
          tipsKeys: ['step-aerobic.guide.a-step.tip2'],
          duration: '3 min',
        },
        {
          stepNumber: 4,
          titleKey: 'step-aerobic.guide.a-step.step4.title',
          descriptionKey: 'step-aerobic.guide.a-step.step4.description',
          tipsKeys: [],
          duration: '3 min',
        },
      ],
    },
    animation: {
      durationMs: 8000,
      phases: [
        { nameKey: 'step-aerobic.anim.a-step.phase1.name', descriptionKey: 'step-aerobic.anim.a-step.phase1.description', startMs: 0, endMs: 2000 },
        { nameKey: 'step-aerobic.anim.a-step.phase2.name', descriptionKey: 'step-aerobic.anim.a-step.phase2.description', startMs: 2000, endMs: 4000 },
        { nameKey: 'step-aerobic.anim.a-step.phase3.name', descriptionKey: 'step-aerobic.anim.a-step.phase3.description', startMs: 4000, endMs: 6000 },
        { nameKey: 'step-aerobic.anim.a-step.phase4.name', descriptionKey: 'step-aerobic.anim.a-step.phase4.description', startMs: 6000, endMs: 8000 },
      ],
      keyframes: [
        kf(0,    0.38, FY,   STAND),
        kf(1000, 0.40, 0.55, R_LIFT),
        kf(2000, 0.47, TY,   R_PLANT),
        kf(3000, 0.50, 0.50, L_LIFT),
        kf(4000, 0.53, SY,   STAND),
        kf(5000, 0.57, 0.51, R_REACH_FWD),
        kf(6000, 0.62, 0.54, L_REACH_FWD),
        kf(7000, 0.66, 0.55, L_REACH_DOWN),
        kf(8000, 0.68, FY,   STAND),
      ],
    },
  },

  // ─── 5. Basic Steps: Turn Step ───────────────────────────────────────
  {
    id: 'step-aerobic-turn-step',
    sportId: 'step-aerobic',
    nameKey: 'step-aerobic.drill.turn-step.name',
    descriptionKey: 'step-aerobic.drill.turn-step.description',
    category: 'basic-steps',
    difficulty: 'intermediate',
    playerCount: { min: 1, max: 20 },
    durationMinutes: 10,
    equipment: ['step platform'],
    features: { hasAnimation: true, hasGuide: true },
    guide: {
      steps: [
        {
          stepNumber: 1,
          titleKey: 'step-aerobic.guide.turn-step.step1.title',
          descriptionKey: 'step-aerobic.guide.turn-step.step1.description',
          tipsKeys: ['step-aerobic.guide.turn-step.tip1'],
          duration: '2 min',
        },
        {
          stepNumber: 2,
          titleKey: 'step-aerobic.guide.turn-step.step2.title',
          descriptionKey: 'step-aerobic.guide.turn-step.step2.description',
          tipsKeys: [],
          duration: '3 min',
        },
        {
          stepNumber: 3,
          titleKey: 'step-aerobic.guide.turn-step.step3.title',
          descriptionKey: 'step-aerobic.guide.turn-step.step3.description',
          tipsKeys: ['step-aerobic.guide.turn-step.tip2'],
          duration: '3 min',
        },
        {
          stepNumber: 4,
          titleKey: 'step-aerobic.guide.turn-step.step4.title',
          descriptionKey: 'step-aerobic.guide.turn-step.step4.description',
          tipsKeys: [],
          duration: '2 min',
        },
      ],
    },
    animation: {
      durationMs: 8000,
      phases: [
        { nameKey: 'step-aerobic.anim.turn-step.phase1.name', descriptionKey: 'step-aerobic.anim.turn-step.phase1.description', startMs: 0, endMs: 2000 },
        { nameKey: 'step-aerobic.anim.turn-step.phase2.name', descriptionKey: 'step-aerobic.anim.turn-step.phase2.description', startMs: 2000, endMs: 4000 },
        { nameKey: 'step-aerobic.anim.turn-step.phase3.name', descriptionKey: 'step-aerobic.anim.turn-step.phase3.description', startMs: 4000, endMs: 6000 },
        { nameKey: 'step-aerobic.anim.turn-step.phase4.name', descriptionKey: 'step-aerobic.anim.turn-step.phase4.description', startMs: 6000, endMs: 8000 },
      ],
      keyframes: [
        // Phase 1: Approach and step up
        kf(0,    0.38, FY,   STAND),
        kf(1000, 0.42, 0.54, R_LIFT),
        kf(2000, 0.50, TY,   R_PLANT),
        // Phase 2: Step up and turn on platform
        kf(2800, 0.53, SY,   TURN_STEP),
        kf(3500, 0.55, SY,   TURN_MID),
        kf(4200, 0.53, SY,   TURN_STEP),
        // Phase 3: Step down after turn
        kf(5200, 0.50, 0.51, R_REACH_DOWN),
        kf(6200, 0.46, 0.54, SPLIT_RL),
        // Phase 4: Return to start
        kf(7200, 0.41, 0.55, L_REACH_DOWN),
        kf(8000, 0.38, FY,   STAND),
      ],
    },
  },

  // ─── 6. Combinations: Knee Lift + Basic Step ─────────────────────────
  {
    id: 'step-aerobic-knee-lift-combo',
    sportId: 'step-aerobic',
    nameKey: 'step-aerobic.drill.knee-lift-combo.name',
    descriptionKey: 'step-aerobic.drill.knee-lift-combo.description',
    category: 'combinations',
    difficulty: 'intermediate',
    playerCount: { min: 1, max: 20 },
    durationMinutes: 10,
    equipment: ['step platform'],
    features: { hasAnimation: true, hasGuide: true },
    guide: {
      steps: [
        {
          stepNumber: 1,
          titleKey: 'step-aerobic.guide.knee-lift-combo.step1.title',
          descriptionKey: 'step-aerobic.guide.knee-lift-combo.step1.description',
          tipsKeys: ['step-aerobic.guide.knee-lift-combo.tip1'],
          duration: '2 min',
        },
        {
          stepNumber: 2,
          titleKey: 'step-aerobic.guide.knee-lift-combo.step2.title',
          descriptionKey: 'step-aerobic.guide.knee-lift-combo.step2.description',
          tipsKeys: [],
          duration: '2 min',
        },
        {
          stepNumber: 3,
          titleKey: 'step-aerobic.guide.knee-lift-combo.step3.title',
          descriptionKey: 'step-aerobic.guide.knee-lift-combo.step3.description',
          tipsKeys: ['step-aerobic.guide.knee-lift-combo.tip2'],
          duration: '3 min',
        },
        {
          stepNumber: 4,
          titleKey: 'step-aerobic.guide.knee-lift-combo.step4.title',
          descriptionKey: 'step-aerobic.guide.knee-lift-combo.step4.description',
          tipsKeys: [],
          duration: '3 min',
        },
      ],
    },
    animation: {
      durationMs: 12000,
      phases: [
        { nameKey: 'step-aerobic.anim.knee-lift-combo.phase1.name', descriptionKey: 'step-aerobic.anim.knee-lift-combo.phase1.description', startMs: 0, endMs: 6000 },
        { nameKey: 'step-aerobic.anim.knee-lift-combo.phase2.name', descriptionKey: 'step-aerobic.anim.knee-lift-combo.phase2.description', startMs: 6000, endMs: 12000 },
      ],
      keyframes: [
        // Phase 1: Basic Step (reference pattern)
        kf(0,     0.38, FY,   STAND),
        kf(1000,  0.42, 0.54, R_LIFT),
        kf(2000,  0.48, TY,   R_PLANT),
        kf(3000,  0.53, SY,   STAND),
        kf(4000,  0.48, 0.53, SPLIT_RL),
        kf(5000,  0.42, 0.55, L_REACH_DOWN),
        kf(6000,  0.38, FY,   STAND),
        // Phase 2: Step up + Knee Drive
        kf(7000,  0.42, 0.54, R_LIFT),
        kf(8000,  0.48, TY,   R_PLANT),
        kf(8700,  0.52, SY,   ARMS_PUMP),
        kf(9400,  0.53, 0.45, L_KNEE_HIGH),
        kf(10100, 0.53, SY,   STAND),
        kf(10800, 0.48, 0.53, SPLIT_RL),
        kf(12000, 0.38, FY,   STAND),
      ],
    },
  },

  // ─── 7. Combinations: L-Step + Tap ───────────────────────────────────
  {
    id: 'step-aerobic-l-step-tap',
    sportId: 'step-aerobic',
    nameKey: 'step-aerobic.drill.l-step-tap.name',
    descriptionKey: 'step-aerobic.drill.l-step-tap.description',
    category: 'combinations',
    difficulty: 'intermediate',
    playerCount: { min: 1, max: 20 },
    durationMinutes: 10,
    equipment: ['step platform'],
    features: { hasAnimation: true, hasGuide: true },
    guide: {
      steps: [
        {
          stepNumber: 1,
          titleKey: 'step-aerobic.guide.l-step-tap.step1.title',
          descriptionKey: 'step-aerobic.guide.l-step-tap.step1.description',
          tipsKeys: ['step-aerobic.guide.l-step-tap.tip1'],
          duration: '2 min',
        },
        {
          stepNumber: 2,
          titleKey: 'step-aerobic.guide.l-step-tap.step2.title',
          descriptionKey: 'step-aerobic.guide.l-step-tap.step2.description',
          tipsKeys: [],
          duration: '3 min',
        },
        {
          stepNumber: 3,
          titleKey: 'step-aerobic.guide.l-step-tap.step3.title',
          descriptionKey: 'step-aerobic.guide.l-step-tap.step3.description',
          tipsKeys: ['step-aerobic.guide.l-step-tap.tip2'],
          duration: '3 min',
        },
        {
          stepNumber: 4,
          titleKey: 'step-aerobic.guide.l-step-tap.step4.title',
          descriptionKey: 'step-aerobic.guide.l-step-tap.step4.description',
          tipsKeys: [],
          duration: '2 min',
        },
      ],
    },
    animation: {
      durationMs: 12000,
      phases: [
        { nameKey: 'step-aerobic.anim.l-step-tap.phase1.name', descriptionKey: 'step-aerobic.anim.l-step-tap.phase1.description', startMs: 0, endMs: 6000 },
        { nameKey: 'step-aerobic.anim.l-step-tap.phase2.name', descriptionKey: 'step-aerobic.anim.l-step-tap.phase2.description', startMs: 6000, endMs: 12000 },
      ],
      keyframes: [
        // Phase 1: Step up + lateral walk on step
        kf(0,     0.38, FY,   STAND),
        kf(1000,  0.42, 0.54, R_LIFT),
        kf(2000,  0.48, TY,   R_PLANT),
        kf(2800,  0.52, SY,   STAND),
        kf(3500,  0.56, SY,   LATERAL_STEP),
        kf(4200,  0.60, SY,   LATERAL_STEP),
        kf(5000,  0.62, SY,   TAP_SIDE),
        kf(6000,  0.58, SY,   LATERAL_STEP),
        // Phase 2: Return to center and step down
        kf(7000,  0.53, SY,   STAND),
        kf(8000,  0.50, 0.51, R_REACH_DOWN),
        kf(9000,  0.46, 0.53, SPLIT_RL),
        kf(10500, 0.42, 0.55, L_REACH_DOWN),
        kf(12000, 0.38, FY,   STAND),
      ],
    },
  },

  // ─── 8. Choreography: 8-Count Routine ────────────────────────────────
  {
    id: 'step-aerobic-8-count-routine',
    sportId: 'step-aerobic',
    nameKey: 'step-aerobic.drill.8-count-routine.name',
    descriptionKey: 'step-aerobic.drill.8-count-routine.description',
    category: 'choreography',
    difficulty: 'intermediate',
    playerCount: { min: 1, max: 20 },
    durationMinutes: 12,
    equipment: ['step platform', 'music'],
    features: { hasAnimation: true, hasGuide: true },
    guide: {
      steps: [
        {
          stepNumber: 1,
          titleKey: 'step-aerobic.guide.8-count-routine.step1.title',
          descriptionKey: 'step-aerobic.guide.8-count-routine.step1.description',
          tipsKeys: ['step-aerobic.guide.8-count-routine.tip1'],
          duration: '2 min',
        },
        {
          stepNumber: 2,
          titleKey: 'step-aerobic.guide.8-count-routine.step2.title',
          descriptionKey: 'step-aerobic.guide.8-count-routine.step2.description',
          tipsKeys: [],
          duration: '3 min',
        },
        {
          stepNumber: 3,
          titleKey: 'step-aerobic.guide.8-count-routine.step3.title',
          descriptionKey: 'step-aerobic.guide.8-count-routine.step3.description',
          tipsKeys: ['step-aerobic.guide.8-count-routine.tip2'],
          duration: '4 min',
        },
        {
          stepNumber: 4,
          titleKey: 'step-aerobic.guide.8-count-routine.step4.title',
          descriptionKey: 'step-aerobic.guide.8-count-routine.step4.description',
          tipsKeys: [],
          duration: '3 min',
        },
      ],
    },
    animation: {
      durationMs: 12000,
      phases: [
        { nameKey: 'step-aerobic.anim.8-count-routine.phase1.name', descriptionKey: 'step-aerobic.anim.8-count-routine.phase1.description', startMs: 0, endMs: 6000 },
        { nameKey: 'step-aerobic.anim.8-count-routine.phase2.name', descriptionKey: 'step-aerobic.anim.8-count-routine.phase2.description', startMs: 6000, endMs: 12000 },
      ],
      keyframes: [
        // Phase 1: Basic Step (counts 1-4)
        kf(0,     0.38, FY,   STAND),
        kf(1000,  0.42, 0.54, R_LIFT),
        kf(2000,  0.48, TY,   R_PLANT),
        kf(3000,  0.53, SY,   STAND),
        kf(4000,  0.48, 0.53, SPLIT_RL),
        kf(5000,  0.42, 0.55, L_REACH_DOWN),
        kf(6000,  0.38, FY,   STAND),
        // Phase 2: V-Step (counts 5-8)
        kf(6800,  0.42, 0.54, R_LIFT),
        kf(7600,  0.48, TY,   WIDE_ARMS),
        kf(8500,  0.50, SY,   V_WIDE),
        kf(9300,  0.50, SY,   WIDE_ARMS),
        kf(10200, 0.48, 0.53, SPLIT_RL),
        kf(11200, 0.42, 0.55, L_REACH_DOWN),
        kf(12000, 0.38, FY,   STAND),
      ],
    },
  },

  // ─── 9. Choreography: 32-Count Choreography ─────────────────────────
  {
    id: 'step-aerobic-32-count-choreo',
    sportId: 'step-aerobic',
    nameKey: 'step-aerobic.drill.32-count-choreo.name',
    descriptionKey: 'step-aerobic.drill.32-count-choreo.description',
    category: 'choreography',
    difficulty: 'advanced',
    playerCount: { min: 1, max: 20 },
    durationMinutes: 15,
    equipment: ['step platform', 'music'],
    features: { hasAnimation: true, hasGuide: true },
    guide: {
      steps: [
        {
          stepNumber: 1,
          titleKey: 'step-aerobic.guide.32-count-choreo.step1.title',
          descriptionKey: 'step-aerobic.guide.32-count-choreo.step1.description',
          tipsKeys: ['step-aerobic.guide.32-count-choreo.tip1'],
          duration: '3 min',
        },
        {
          stepNumber: 2,
          titleKey: 'step-aerobic.guide.32-count-choreo.step2.title',
          descriptionKey: 'step-aerobic.guide.32-count-choreo.step2.description',
          tipsKeys: [],
          duration: '3 min',
        },
        {
          stepNumber: 3,
          titleKey: 'step-aerobic.guide.32-count-choreo.step3.title',
          descriptionKey: 'step-aerobic.guide.32-count-choreo.step3.description',
          tipsKeys: ['step-aerobic.guide.32-count-choreo.tip2'],
          duration: '4 min',
        },
        {
          stepNumber: 4,
          titleKey: 'step-aerobic.guide.32-count-choreo.step4.title',
          descriptionKey: 'step-aerobic.guide.32-count-choreo.step4.description',
          tipsKeys: [],
          duration: '3 min',
        },
        {
          stepNumber: 5,
          titleKey: 'step-aerobic.guide.32-count-choreo.step5.title',
          descriptionKey: 'step-aerobic.guide.32-count-choreo.step5.description',
          tipsKeys: ['step-aerobic.guide.32-count-choreo.tip3'],
          duration: '2 min',
        },
      ],
    },
    animation: {
      durationMs: 16000,
      phases: [
        { nameKey: 'step-aerobic.anim.32-count-choreo.phase1.name', descriptionKey: 'step-aerobic.anim.32-count-choreo.phase1.description', startMs: 0, endMs: 4000 },
        { nameKey: 'step-aerobic.anim.32-count-choreo.phase2.name', descriptionKey: 'step-aerobic.anim.32-count-choreo.phase2.description', startMs: 4000, endMs: 8000 },
        { nameKey: 'step-aerobic.anim.32-count-choreo.phase3.name', descriptionKey: 'step-aerobic.anim.32-count-choreo.phase3.description', startMs: 8000, endMs: 12000 },
        { nameKey: 'step-aerobic.anim.32-count-choreo.phase4.name', descriptionKey: 'step-aerobic.anim.32-count-choreo.phase4.description', startMs: 12000, endMs: 16000 },
      ],
      keyframes: [
        // ── Phase 1: Basic Step x2 (counts 1-8) ──
        kf(0,     0.38, FY,   STAND),
        kf(500,   0.40, 0.55, R_LIFT),
        kf(1000,  0.53, SY,   STAND),
        kf(1500,  0.46, 0.54, SPLIT_RL),
        kf(2000,  0.38, FY,   STAND),
        kf(2500,  0.50, 0.50, L_LIFT),
        kf(3000,  0.53, SY,   STAND),
        kf(3500,  0.41, 0.55, L_REACH_DOWN),
        kf(4000,  0.38, FY,   STAND),
        // ── Phase 2: V-Step x2 (counts 9-16) ──
        kf(4500,  0.42, 0.54, R_LIFT),
        kf(5000,  0.50, SY,   V_WIDE),
        kf(5500,  0.48, 0.53, SPLIT_RL),
        kf(6000,  0.42, FY,   STAND),
        kf(6500,  0.45, 0.54, L_LIFT),
        kf(7000,  0.50, SY,   V_WIDE),
        kf(7500,  0.45, 0.55, L_REACH_DOWN),
        kf(8000,  0.42, FY,   STAND),
        // ── Phase 3: A-Step x2 (counts 17-24) ──
        kf(8500,  0.40, 0.55, R_LIFT),
        kf(9000,  0.53, SY,   STAND),
        kf(9500,  0.57, 0.51, R_REACH_FWD),
        kf(10000, 0.68, FY,   STAND),
        kf(10500, 0.62, TY,   R_PLANT),
        kf(11000, 0.53, SY,   STAND),
        kf(11500, 0.41, 0.55, L_REACH_DOWN),
        kf(12000, 0.38, FY,   STAND),
        // ── Phase 4: Turn Step x2 (counts 25-32) ──
        kf(12500, 0.42, 0.54, R_LIFT),
        kf(13000, 0.53, SY,   TURN_STEP),
        kf(13300, 0.55, SY,   TURN_MID),
        kf(13700, 0.46, 0.54, SPLIT_RL),
        kf(14000, 0.38, FY,   STAND),
        kf(14500, 0.42, 0.54, R_LIFT),
        kf(15000, 0.53, SY,   TURN_STEP),
        kf(15300, 0.55, SY,   TURN_MID),
        kf(15700, 0.41, 0.55, L_REACH_DOWN),
        kf(16000, 0.38, FY,   STAND),
      ],
    },
  },

  // ─── 10. Cool-down: Step Stretch ─────────────────────────────────────
  {
    id: 'step-aerobic-step-stretch',
    sportId: 'step-aerobic',
    nameKey: 'step-aerobic.drill.step-stretch.name',
    descriptionKey: 'step-aerobic.drill.step-stretch.description',
    category: 'cooldown',
    difficulty: 'beginner',
    playerCount: { min: 1, max: 20 },
    durationMinutes: 5,
    equipment: ['step platform'],
    features: { hasAnimation: false, hasGuide: true },
    guide: {
      steps: [
        {
          stepNumber: 1,
          titleKey: 'step-aerobic.guide.step-stretch.step1.title',
          descriptionKey: 'step-aerobic.guide.step-stretch.step1.description',
          tipsKeys: ['step-aerobic.guide.step-stretch.tip1'],
          duration: '1 min',
        },
        {
          stepNumber: 2,
          titleKey: 'step-aerobic.guide.step-stretch.step2.title',
          descriptionKey: 'step-aerobic.guide.step-stretch.step2.description',
          tipsKeys: [],
          duration: '1 min',
        },
        {
          stepNumber: 3,
          titleKey: 'step-aerobic.guide.step-stretch.step3.title',
          descriptionKey: 'step-aerobic.guide.step-stretch.step3.description',
          tipsKeys: ['step-aerobic.guide.step-stretch.tip2'],
          duration: '2 min',
        },
        {
          stepNumber: 4,
          titleKey: 'step-aerobic.guide.step-stretch.step4.title',
          descriptionKey: 'step-aerobic.guide.step-stretch.step4.description',
          tipsKeys: [],
          duration: '1 min',
        },
      ],
    },
  },
];
