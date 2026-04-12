import { useTranslation } from 'react-i18next';
import type { Difficulty } from '../../types';

const difficultyColors: Record<Difficulty, { bg: string; text: string }> = {
  beginner: { bg: '#dcfce7', text: '#166534' },
  intermediate: { bg: '#fef3c7', text: '#92400e' },
  advanced: { bg: '#fecaca', text: '#991b1b' },
};

export function getDifficultyColors(difficulty: Difficulty) {
  return difficultyColors[difficulty];
}

export function DifficultyBadge({ difficulty, size = 'sm' }: { difficulty: Difficulty; size?: 'xs' | 'sm' }) {
  const { t } = useTranslation();
  const colors = difficultyColors[difficulty];
  const cls = size === 'xs'
    ? 'text-[10px] font-semibold px-1.5 py-0.5 rounded'
    : 'text-xs font-semibold px-2 py-0.5 rounded';

  return (
    <span className={cls} style={{ backgroundColor: colors.bg, color: colors.text }}>
      {t(`difficulty.${difficulty}`)}
    </span>
  );
}
