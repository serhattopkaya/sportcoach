import { memo } from 'react';
import { Group, Line, Circle, Text } from 'react-konva';
import type { PoseData, AnimationPerspective } from '../../types';

interface HumanFigureProps {
  x: number;
  y: number;
  figureHeight: number;
  pose: PoseData;
  color: string;
  opacity?: number;
  perspective?: AnimationPerspective;
}

interface Pt {
  x: number;
  y: number;
}

// Bone lengths as fractions of total figure height
const HEAD_R = 0.065;
const NECK = 0.035;
const TORSO = 0.27;
const UPPER_ARM = 0.16;
const FOREARM = 0.14;
const THIGH = 0.23;
const SHIN = 0.23;

function rad(deg: number) {
  return (deg * Math.PI) / 180;
}

/**
 * Move from a point in a given direction.
 * Angle convention: 0 = straight down, clockwise positive.
 * In screen coords: 0=down, 90=right, 180=up, -90=left.
 */
function advance(from: Pt, angleDeg: number, length: number): Pt {
  const r = rad(angleDeg);
  return {
    x: from.x + length * Math.sin(r),
    y: from.y + length * Math.cos(r),
  };
}

function computeSkeleton(hip: Pt, pose: PoseData, h: number) {
  const len = (ratio: number) => ratio * h;

  // Torso goes UP from hip (180=up, subtract tilt so positive tilt = lean right/forward)
  const torsoAngle = 180 - pose.torsoTilt;
  const shoulder = advance(hip, torsoAngle, len(TORSO));
  const neckEnd = advance(shoulder, torsoAngle, len(NECK));
  const headCenter = advance(neckEnd, torsoAngle, len(HEAD_R));

  // Arms (absolute angles from straight-down)
  const lElbow = advance(shoulder, pose.leftUpperArm, len(UPPER_ARM));
  const lHand = advance(lElbow, pose.leftForearm, len(FOREARM));
  const rElbow = advance(shoulder, pose.rightUpperArm, len(UPPER_ARM));
  const rHand = advance(rElbow, pose.rightForearm, len(FOREARM));

  // Legs (absolute angles from straight-down)
  const lKnee = advance(hip, pose.leftThigh, len(THIGH));
  const lFoot = advance(lKnee, pose.leftShin, len(SHIN));
  const rKnee = advance(hip, pose.rightThigh, len(THIGH));
  const rFoot = advance(rKnee, pose.rightShin, len(SHIN));

  return {
    headCenter,
    headR: len(HEAD_R),
    neckEnd,
    shoulder,
    hip,
    lElbow,
    lHand,
    rElbow,
    rHand,
    lKnee,
    lFoot,
    rKnee,
    rFoot,
  };
}

export const HumanFigure = memo(function HumanFigure({
  x,
  y,
  figureHeight,
  pose,
  color,
  opacity = 1,
  perspective = 'side',
}: HumanFigureProps) {
  const s = computeSkeleton({ x, y }, pose, figureHeight);
  const thick = Math.max(2, figureHeight * 0.025);
  const thin = thick * 0.75;
  const jointR = thick * 0.55;

  // Behind view: both sides equally visible; side view: far side at 0.5 opacity
  const farOpacity = perspective === 'behind' ? 0.85 : 0.5;

  return (
    <Group opacity={opacity}>
      {/* Far-side limbs (left) — drawn first, behind body */}
      <Line
        points={[s.shoulder.x, s.shoulder.y, s.lElbow.x, s.lElbow.y, s.lHand.x, s.lHand.y]}
        stroke={color}
        strokeWidth={thin}
        lineCap="round"
        lineJoin="round"
        opacity={farOpacity}
      />
      <Line
        points={[s.hip.x, s.hip.y, s.lKnee.x, s.lKnee.y, s.lFoot.x, s.lFoot.y]}
        stroke={color}
        strokeWidth={thick}
        lineCap="round"
        lineJoin="round"
        opacity={farOpacity}
      />

      {/* Torso + neck */}
      <Line
        points={[s.hip.x, s.hip.y, s.shoulder.x, s.shoulder.y, s.neckEnd.x, s.neckEnd.y]}
        stroke={color}
        strokeWidth={thick}
        lineCap="round"
        lineJoin="round"
      />

      {/* Near-side limbs (right) — drawn on top */}
      <Line
        points={[s.hip.x, s.hip.y, s.rKnee.x, s.rKnee.y, s.rFoot.x, s.rFoot.y]}
        stroke={color}
        strokeWidth={thick}
        lineCap="round"
        lineJoin="round"
      />
      <Line
        points={[s.shoulder.x, s.shoulder.y, s.rElbow.x, s.rElbow.y, s.rHand.x, s.rHand.y]}
        stroke={color}
        strokeWidth={thin}
        lineCap="round"
        lineJoin="round"
      />

      {/* Joint dots */}
      <Circle x={s.hip.x} y={s.hip.y} radius={jointR} fill={color} />
      <Circle x={s.shoulder.x} y={s.shoulder.y} radius={jointR} fill={color} />
      <Circle x={s.lKnee.x} y={s.lKnee.y} radius={jointR} fill={color} opacity={farOpacity} />
      <Circle x={s.rKnee.x} y={s.rKnee.y} radius={jointR} fill={color} />
      <Circle x={s.lElbow.x} y={s.lElbow.y} radius={jointR * 0.8} fill={color} opacity={farOpacity} />
      <Circle x={s.rElbow.x} y={s.rElbow.y} radius={jointR * 0.8} fill={color} />

      {/* Head */}
      <Circle
        x={s.headCenter.x}
        y={s.headCenter.y}
        radius={s.headR}
        fill={color}
        stroke="#ffffff"
        strokeWidth={1.5}
      />

      {/* Foot labels */}
      <Text
        x={s.lFoot.x - thick * 1.2}
        y={s.lFoot.y + thick * 0.5}
        text="L"
        fontSize={thick * 3}
        fontStyle="bold"
        fill={color}
        opacity={farOpacity}
      />
      <Text
        x={s.rFoot.x - thick * 1.2}
        y={s.rFoot.y + thick * 0.5}
        text="R"
        fontSize={thick * 3}
        fontStyle="bold"
        fill={color}
      />
    </Group>
  );
});
