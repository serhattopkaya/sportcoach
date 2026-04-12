import type { SportId } from '../types';
import basketballCourt from '../assets/courts/basketball-court.svg';
import soccerField from '../assets/courts/soccer-field.svg';
import volleyballCourt from '../assets/courts/volleyball-court.svg';
import handballCourt from '../assets/courts/handball-court.svg';
import stepAerobicFloor from '../assets/courts/step-aerobic-floor.svg';

interface CourtConfig {
  svgPath: string;
  viewBox: { width: number; height: number };
}

const courtConfigs: Record<SportId, CourtConfig> = {
  basketball: {
    svgPath: basketballCourt,
    viewBox: { width: 940, height: 500 },
  },
  soccer: {
    svgPath: soccerField,
    viewBox: { width: 1050, height: 680 },
  },
  volleyball: {
    svgPath: volleyballCourt,
    viewBox: { width: 900, height: 500 },
  },
  handball: {
    svgPath: handballCourt,
    viewBox: { width: 1000, height: 500 },
  },
  'step-aerobic': {
    svgPath: stepAerobicFloor,
    viewBox: { width: 960, height: 540 },
  },
};

export function getCourtConfig(sportId: SportId): CourtConfig {
  return courtConfigs[sportId];
}
