import type { SportId } from '../types';

export const sportColors: Record<SportId, { bg: string; text: string; accent: string; light: string }> = {
  basketball: { bg: '#f97316', text: '#ffffff', accent: '#ea580c', light: '#fff7ed' },
  soccer: { bg: '#22c55e', text: '#ffffff', accent: '#16a34a', light: '#f0fdf4' },
  volleyball: { bg: '#3b82f6', text: '#ffffff', accent: '#2563eb', light: '#eff6ff' },
  handball: { bg: '#ef4444', text: '#ffffff', accent: '#dc2626', light: '#fef2f2' },
  'step-aerobic': { bg: '#a855f7', text: '#ffffff', accent: '#9333ea', light: '#faf5ff' },
};

import type { EntityState } from '../types';

export const teamColors: Record<EntityState['team'], string> = {
  A: '#3b82f6',
  B: '#ef4444',
  neutral: '#94a3b8',
};
