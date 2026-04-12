import type { Drill, SportId } from '../types';
import { basketballDrills } from './basketball/drills';
import { soccerDrills } from './soccer/drills';
import { volleyballDrills } from './volleyball/drills';
import { handballDrills } from './handball/drills';
import { stepAerobicDrills } from './step-aerobic/drills';

const allDrills: Drill[] = [
  ...basketballDrills,
  ...soccerDrills,
  ...volleyballDrills,
  ...handballDrills,
  ...stepAerobicDrills,
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

export function getDrillsBySport(sportId: SportId): Drill[] {
  return drillsBySport.get(sportId) ?? [];
}

export function getDrillById(id: string): Drill | undefined {
  return drillById.get(id);
}

export { allDrills };
