export type SportId = 'basketball' | 'soccer' | 'volleyball' | 'handball' | 'step-aerobic';

export type DrillCategory =
  | 'warmup'
  | 'passing'
  | 'shooting'
  | 'dribbling'
  | 'defense'
  | 'offense'
  | 'conditioning'
  | 'game-play'
  | 'serving'
  | 'setting'
  | 'spiking'
  | 'blocking'
  | 'goalkeeping'
  | 'basic-steps'
  | 'combinations'
  | 'choreography'
  | 'cooldown';

export interface Sport {
  id: SportId;
  nameKey: string;
  emoji: string;
  courtAspectRatio: number;
  teamSize: number;
  categories: DrillCategory[];
}
