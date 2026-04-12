import { memo, useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Circle, Text, Group, Rect } from 'react-konva';
import { getCourtConfig } from '../../lib/court-config';
import { sportColors, teamColors } from '../../lib/color-palette';
import { DEFAULT_POSE } from '../../lib/animation-engine';
import { HumanFigure } from './HumanFigure';
import type { SportId, EntityState, AnimationPerspective } from '../../types';

interface CourtCanvasProps {
  sportId: SportId;
  entities?: EntityState[];
  maxHeight?: number;
  perspective?: AnimationPerspective;
}

// Module-level image cache to avoid re-loading across mounts
const imageCache = new Map<string, HTMLImageElement>();

export const CourtCanvas = memo(function CourtCanvas({ sportId, entities = [], maxHeight, perspective = 'side' }: CourtCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const config = getCourtConfig(sportId);
  const [, setImageVersion] = useState(0);
  const courtImage = imageCache.get(config.svgPath) ?? null;

  useEffect(() => {
    let cancelled = false;
    if (imageCache.has(config.svgPath)) return;

    const img = new window.Image();
    img.src = config.svgPath;
    img.onload = () => {
      if (cancelled) return;
      imageCache.set(config.svgPath, img);
      setImageVersion((version) => version + 1);
    };

    return () => {
      cancelled = true;
    };
  }, [config.svgPath]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const aspectRatio = config.viewBox.width / config.viewBox.height;
      let height = width / aspectRatio;
      if (maxHeight && height > maxHeight) {
        height = maxHeight;
      }
      setDimensions((prev) => {
        if (prev.width === width && prev.height === height) return prev;
        return { width, height };
      });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [config.viewBox, maxHeight]);

  return (
    <div ref={containerRef} className="w-full">
      {dimensions.width > 0 && (
        <Stage width={dimensions.width} height={dimensions.height}>
          <Layer>
            {courtImage && (
              <KonvaImage
                image={courtImage}
                width={dimensions.width}
                height={dimensions.height}
              />
            )}
          </Layer>
          <Layer>
            {entities.map((entity) => {
              const x = entity.x * dimensions.width;
              const y = entity.y * dimensions.height;
              const radius = Math.min(dimensions.width, dimensions.height) * 0.035;

              if (entity.type === 'platform') {
                const pw = dimensions.width * 0.22;
                const ph = dimensions.height * 0.045;
                return (
                  <Rect
                    key={entity.entityId}
                    x={x - pw / 2}
                    y={y - ph / 2}
                    width={pw}
                    height={ph}
                    fill="#475569"
                    stroke="#334155"
                    strokeWidth={1.5}
                    cornerRadius={3}
                    opacity={entity.opacity ?? 1}
                  />
                );
              }

              if (entity.type === 'person') {
                const figureHeight = dimensions.height * 0.62;
                const figureColor = sportColors[sportId]?.accent ?? '#374151';
                return (
                  <HumanFigure
                    key={entity.entityId}
                    x={x}
                    y={y}
                    figureHeight={figureHeight}
                    pose={entity.pose ?? DEFAULT_POSE}
                    color={figureColor}
                    opacity={entity.opacity ?? 1}
                    perspective={perspective}
                  />
                );
              }

              if (entity.type === 'ball') {
                return (
                  <Circle
                    key={entity.entityId}
                    x={x}
                    y={y}
                    radius={radius * 0.6}
                    fill="#f59e0b"
                    stroke="#d97706"
                    strokeWidth={1.5}
                    opacity={entity.opacity ?? 1}
                  />
                );
              }

              if (entity.type === 'cone') {
                return (
                  <Circle
                    key={entity.entityId}
                    x={x}
                    y={y}
                    radius={radius * 0.4}
                    fill="#f97316"
                    stroke="#ea580c"
                    strokeWidth={1}
                    opacity={entity.opacity ?? 1}
                  />
                );
              }

              const color = teamColors[entity.team];
              const fontSize = radius * 0.95;
              return (
                <Group key={entity.entityId} x={x} y={y} opacity={entity.opacity ?? 1}>
                  <Circle radius={radius} fill={color} stroke="#ffffff" strokeWidth={2} />
                  {entity.label && (
                    <Text
                      text={entity.label}
                      fontSize={fontSize}
                      fontStyle="bold"
                      fill="#ffffff"
                      align="center"
                      verticalAlign="middle"
                      width={radius * 2}
                      height={fontSize}
                      offsetX={radius}
                      offsetY={fontSize / 2}
                    />
                  )}
                </Group>
              );
            })}
          </Layer>
        </Stage>
      )}
    </div>
  );
});
