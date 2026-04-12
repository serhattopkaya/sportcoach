import type { Drill } from '../../types';

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
        // Start: both feet on floor behind the step
        { timeMs: 0, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 1: Right foot UP onto step (right side)
        { timeMs: 2000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 2: Left foot UP onto step (left side)
        { timeMs: 4000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 3: Right foot DOWN behind step
        { timeMs: 6000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 4: Left foot DOWN behind step
        { timeMs: 8000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
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
        // Start: both feet on floor behind step
        { timeMs: 0, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 1: Right foot UP to wide right on step
        { timeMs: 2000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.60, y: 0.48 },
        ]},
        // Count 2: Left foot UP to wide left on step
        { timeMs: 4000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.40, y: 0.48 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.60, y: 0.48 },
        ]},
        // Count 3: Right foot DOWN to center behind
        { timeMs: 6000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.40, y: 0.48 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 4: Left foot DOWN to center behind
        { timeMs: 8000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
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
        // Start: both feet on floor behind step
        { timeMs: 0, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 1: Right foot UP onto step (right side)
        { timeMs: 2000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 2: Left foot UP onto step (left side)
        { timeMs: 4000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 3: Right foot DOWN in front of step
        { timeMs: 6000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.32 },
        ]},
        // Count 4: Left foot DOWN in front of step
        { timeMs: 8000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.32 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.32 },
        ]},
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
        // Start: both feet on floor behind step
        { timeMs: 0, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 1: Right foot UP onto step
        { timeMs: 2000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 2: Left foot UP, body turns 90° — feet shift to face side
        { timeMs: 4000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.50, y: 0.54 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.50, y: 0.46 },
        ]},
        // Count 3: Right foot DOWN to right side of step
        { timeMs: 6000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.50, y: 0.54 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.66, y: 0.50 },
        ]},
        // Count 4: Left foot DOWN next to right
        { timeMs: 8000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.66, y: 0.54 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.66, y: 0.46 },
        ]},
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
        // Start: both feet on floor behind step
        { timeMs: 0, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 1: Right foot UP onto step
        { timeMs: 1500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 2: Left foot UP onto step
        { timeMs: 3000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 3: Right foot DOWN behind step
        { timeMs: 4500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 4: Left foot DOWN behind step
        { timeMs: 6000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 5: Right foot UP onto step
        { timeMs: 7500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 6: Left knee lift — left foot rises high above step
        { timeMs: 9000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.38 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 7: Left foot DOWN behind step
        { timeMs: 10500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 8: Right foot DOWN behind step
        { timeMs: 12000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
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
        // Start: both feet on floor behind step
        { timeMs: 0, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 1: Right foot UP onto step
        { timeMs: 1500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 2: Left foot UP onto step
        { timeMs: 3000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 3: Right foot DOWN to right side of step
        { timeMs: 4500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.66, y: 0.50 },
        ]},
        // Count 4: Left foot TAP next to right (on floor beside step)
        { timeMs: 6000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.66, y: 0.54 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.66, y: 0.50 },
        ]},
        // Count 5: Left foot back UP on step
        { timeMs: 7500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.66, y: 0.50 },
        ]},
        // Count 6: Right foot UP on step
        { timeMs: 9000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 7: Left foot DOWN behind step
        { timeMs: 10500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 8: Right foot DOWN behind step
        { timeMs: 12000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
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
        // Start: both feet on floor behind step
        { timeMs: 0, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 1: Right foot UP onto step — Basic Step
        { timeMs: 1500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 2: Left foot UP onto step
        { timeMs: 3000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 3: Right foot DOWN behind step
        { timeMs: 4500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 4: Left foot DOWN behind step
        { timeMs: 6000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 5: Right foot UP to wide right on step — V-Step
        { timeMs: 7500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.60, y: 0.48 },
        ]},
        // Count 6: Left foot UP to wide left on step
        { timeMs: 9000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.40, y: 0.48 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.60, y: 0.48 },
        ]},
        // Count 7: Right foot DOWN to center behind
        { timeMs: 10500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.40, y: 0.48 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 8: Left foot DOWN to center behind
        { timeMs: 12000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
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
        // ── Counts 1-8: Basic Step x2 ──
        // Start: both feet behind step
        { timeMs: 0, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 1: R up
        { timeMs: 500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 2: L up
        { timeMs: 1000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 3: R down
        { timeMs: 1500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 4: L down
        { timeMs: 2000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 5: L up (lead switch)
        { timeMs: 2500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 6: R up
        { timeMs: 3000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 7: L down
        { timeMs: 3500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 8: R down
        { timeMs: 4000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // ── Counts 9-16: V-Step x2 ──
        // Count 9: R up wide right
        { timeMs: 4500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.60, y: 0.48 },
        ]},
        // Count 10: L up wide left
        { timeMs: 5000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.40, y: 0.48 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.60, y: 0.48 },
        ]},
        // Count 11: R down center
        { timeMs: 5500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.40, y: 0.48 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 12: L down center
        { timeMs: 6000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 13: L up wide left (lead switch)
        { timeMs: 6500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.40, y: 0.48 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 14: R up wide right
        { timeMs: 7000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.40, y: 0.48 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.60, y: 0.48 },
        ]},
        // Count 15: L down center
        { timeMs: 7500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.60, y: 0.48 },
        ]},
        // Count 16: R down center
        { timeMs: 8000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // ── Counts 17-24: A-Step x2 ──
        // Count 17: R up onto step
        { timeMs: 8500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 18: L up onto step
        { timeMs: 9000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 19: R down front
        { timeMs: 9500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.32 },
        ]},
        // Count 20: L down front
        { timeMs: 10000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.32 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.32 },
        ]},
        // Count 21: R up onto step (return)
        { timeMs: 10500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.32 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 22: L up onto step
        { timeMs: 11000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 23: R down behind
        { timeMs: 11500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // Count 24: L down behind
        { timeMs: 12000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
        // ── Counts 25-32: Turn Step x2 ──
        // Count 25: R up onto step
        { timeMs: 12500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 26: L up + turn
        { timeMs: 13000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.50, y: 0.54 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.50, y: 0.46 },
        ]},
        // Count 27: R down to side
        { timeMs: 13500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.50, y: 0.54 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.66, y: 0.50 },
        ]},
        // Count 28: L down next to R
        { timeMs: 14000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.66, y: 0.54 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.66, y: 0.46 },
        ]},
        // Count 29: L up onto step (return turn)
        { timeMs: 14500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.50, y: 0.54 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.66, y: 0.46 },
        ]},
        // Count 30: R up + turn back
        { timeMs: 15000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.50 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 31: L down behind
        { timeMs: 15500, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.50 },
        ]},
        // Count 32: R down behind — finish
        { timeMs: 16000, entities: [
          { entityId: 'step', type: 'cone', team: 'neutral', x: 0.5, y: 0.5 },
          { entityId: 'lf', type: 'player', team: 'A', label: 'L', x: 0.46, y: 0.68 },
          { entityId: 'rf', type: 'player', team: 'B', label: 'R', x: 0.54, y: 0.68 },
        ]},
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
