import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useAppStore } from '../store/useAppStore';
import { sports } from '../data/sports';
import { getDrillsBySport } from '../data';
import { sportColors } from '../lib/color-palette';
import { CourtCanvas } from '../components/court/CourtCanvas';
import type { EntityState } from '../types';

const previewEntities: EntityState[] = [
  { entityId: 'p1', type: 'player', team: 'A', label: '1', x: 0.3, y: 0.3 },
  { entityId: 'p2', type: 'player', team: 'A', label: '2', x: 0.3, y: 0.7 },
  { entityId: 'p3', type: 'player', team: 'A', label: '3', x: 0.2, y: 0.5 },
  { entityId: 'p4', type: 'player', team: 'B', label: '1', x: 0.7, y: 0.3 },
  { entityId: 'p5', type: 'player', team: 'B', label: '2', x: 0.7, y: 0.7 },
  { entityId: 'p6', type: 'player', team: 'B', label: '3', x: 0.8, y: 0.5 },
  { entityId: 'ball', type: 'ball', team: 'neutral', x: 0.5, y: 0.5 },
];

export function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedSport, setSport } = useAppStore();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('home.welcome')}</h2>
        <p className="text-slate-500">{t('home.subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {sports.map((sport) => {
          const sc = sportColors[sport.id];
          const count = getDrillsBySport(sport.id).length;
          const isActive = selectedSport === sport.id;
          return (
            <button
              key={sport.id}
              onClick={() => {
                setSport(sport.id);
                navigate('/drills');
              }}
              className="p-5 rounded-xl text-left transition-all min-h-[100px] border-2"
              style={{
                backgroundColor: isActive ? sc.light : '#ffffff',
                borderColor: isActive ? sc.bg : '#e2e8f0',
              }}
            >
              <span className="text-3xl">{sport.emoji}</span>
              <h3 className="text-lg font-bold text-slate-800 mt-2">{t(sport.nameKey)}</h3>
              <p className="text-sm text-slate-500 mt-1">
                {t('home.drillCount', { count })}
              </p>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wide">
          {t(`sport.${selectedSport}`)}
        </h3>
        <CourtCanvas
          sportId={selectedSport}
          maxHeight={350}
          entities={previewEntities}
        />
      </div>
    </div>
  );
}
