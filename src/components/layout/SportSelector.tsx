import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { sports } from '../../data/sports';
import { sportColors } from '../../lib/color-palette';

export function SportSelector() {
  const { t } = useTranslation();
  const { selectedSport, setSport } = useAppStore();

  return (
    <div className="flex gap-1 p-1">
      {sports.map((sport) => {
        const isActive = selectedSport === sport.id;
        const colors = sportColors[sport.id];
        return (
          <button
            key={sport.id}
            onClick={() => setSport(sport.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all min-h-[44px]"
            style={{
              backgroundColor: isActive ? colors.bg : 'transparent',
              color: isActive ? colors.text : '#64748b',
            }}
          >
            <span className="text-lg">{sport.emoji}</span>
            <span className="hidden sm:inline">{t(sport.nameKey)}</span>
          </button>
        );
      })}
    </div>
  );
}
