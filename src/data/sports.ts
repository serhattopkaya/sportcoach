import type { Sport } from '../types';

export const sports: Sport[] = [
  {
    id: 'basketball',
    nameKey: 'sport.basketball',
    emoji: '🏀',
    courtAspectRatio: 94 / 50,
    teamSize: 5,
    categories: ['warmup', 'dribbling', 'passing', 'shooting', 'offense', 'defense', 'game-play'],
  },
  {
    id: 'soccer',
    nameKey: 'sport.soccer',
    emoji: '⚽',
    courtAspectRatio: 105 / 68,
    teamSize: 11,
    categories: ['warmup', 'passing', 'dribbling', 'shooting', 'offense', 'defense', 'goalkeeping', 'game-play'],
  },
  {
    id: 'volleyball',
    nameKey: 'sport.volleyball',
    emoji: '🏐',
    courtAspectRatio: 18 / 9,
    teamSize: 6,
    categories: ['warmup', 'passing', 'setting', 'spiking', 'blocking', 'serving', 'defense', 'game-play'],
  },
  {
    id: 'handball',
    nameKey: 'sport.handball',
    emoji: '🤾',
    courtAspectRatio: 40 / 20,
    teamSize: 7,
    categories: ['warmup', 'passing', 'shooting', 'offense', 'defense', 'goalkeeping', 'game-play'],
  },
  {
    id: 'step-aerobic',
    nameKey: 'sport.step-aerobic',
    emoji: '🏋️',
    courtAspectRatio: 16 / 9,
    teamSize: 1,
    categories: ['warmup', 'basic-steps', 'combinations', 'choreography', 'cooldown'],
  },
];

export function getSport(id: string): Sport | undefined {
  return sports.find((s) => s.id === id);
}
