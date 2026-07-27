import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { color } from '../theme/tokens';

type Props = {
  size?: number;
  fill?: string;
};

/**
 * The "Tower Pin" mark from the Brand Identity System: a crenellated
 * round tower (Nizwa Fort) that tapers into a map pin. Never stretch,
 * rotate, recolour outside the approved fills, or add effects.
 */
export function TowerPinMark({ size = 48, fill = color.fort }: Props) {
  const height = size * 1.24;
  return (
    <Svg width={size} height={height} viewBox="0 0 100 124">
      <Path
        fillRule="evenodd"
        fill={fill}
        d="
          M18 14 H26 V22 H32 V14 H40 V22 H46 V14 H54 V22 H60 V14 H68 V22 H74 V14 H82
          V62 C82 82 68 96 50 118 C32 96 18 82 18 62 Z
          M38 88 L38 60 Q38 46 50 40 Q62 46 62 60 L62 88 Z"
      />
    </Svg>
  );
}
