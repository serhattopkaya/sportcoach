import type { Drill, SportId, Quiz } from '../types';
import { basketballDrills } from './basketball/drills';
import { soccerDrills } from './soccer/drills';
import { volleyballDrills } from './volleyball/drills';
import { handballDrills } from './handball/drills';
import { stepAerobicDrills } from './step-aerobic/drills';
import { basketballQuizzes } from './basketball/quizzes';
import { soccerQuizzes } from './soccer/quizzes';
import { volleyballQuizzes } from './volleyball/quizzes';
import { handballQuizzes } from './handball/quizzes';
import { stepAerobicQuizzes } from './step-aerobic/quizzes';

const allDrills: Drill[] = [
  ...basketballDrills,
  ...soccerDrills,
  ...volleyballDrills,
  ...handballDrills,
  ...stepAerobicDrills,
];

const allQuizzes: Quiz[] = [
  ...basketballQuizzes,
  ...soccerQuizzes,
  ...volleyballQuizzes,
  ...handballQuizzes,
  ...stepAerobicQuizzes,
];

// Pre-built lookup structures — built once at module load
const drillsBySport = new Map<SportId, Drill[]>();
const drillById = new Map<string, Drill>();

for (const d of allDrills) {
  drillById.set(d.id, d);
  const arr = drillsBySport.get(d.sportId) ?? [];
  arr.push(d);
  drillsBySport.set(d.sportId, arr);
}

const quizzesBySport = new Map<SportId, Quiz[]>();
const quizById = new Map<string, Quiz>();

for (const q of allQuizzes) {
  quizById.set(q.id, q);
  const arr = quizzesBySport.get(q.sportId) ?? [];
  arr.push(q);
  quizzesBySport.set(q.sportId, arr);
}

export function getDrillsBySport(sportId: SportId): Drill[] {
  return drillsBySport.get(sportId) ?? [];
}

export function getDrillById(id: string): Drill | undefined {
  return drillById.get(id);
}

export function getQuizzesBySport(sportId: SportId): Quiz[] {
  return quizzesBySport.get(sportId) ?? [];
}

export function getQuizById(id: string): Quiz | undefined {
  return quizById.get(id);
}

export { allDrills, allQuizzes };
