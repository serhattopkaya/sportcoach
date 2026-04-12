import { memo, useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Circle, Text, Group } from 'react-konva';
import { getCourtConfig } from '../../lib/court-config';
import { teamColors } from '../../lib/color-palette';
import type { SportId, EntityState } from '../../types';

interface CourtCanvasProps {
  sportId: SportId;
  entities?: EntityState[];
  maxHeight?: number;
}

// Module-level image cache to avoid re-loading across mounts
const imageCache = new Map<string, HTMLImageElement>();

function loadCourtImage(src: string): HTMLImageElement | null {
  const cached = imageCache.get(src);
  if (cached) return cached;

  const img = new window.Image();
  img.src = src;
  img.onload = () => imageCache.set(src, img);
  return null;
}

export const CourtCanvas = memo(function CourtCanvas({ sportId, entities = [], maxHeight }: CourtCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [courtImage, setCourtImage] = useState<HTMLImageElement | null>(null);
  const config = getCourtConfig(sportId);

  useEffect(() => {
    const cached = imageCache.get(config.svgPath);
    if (cached) {
      setCourtImage(cached);
      return;
    }
    const img = new window.Image();
    img.src = config.svgPath;
    img.onload = () => {
      imageCache.set(config.svgPath, img);
      setCourtImage(img);
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
