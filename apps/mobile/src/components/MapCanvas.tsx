import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { color } from '../theme/tokens';
import { TowerPinMark } from './TowerPinMark';

type Props = {
  style?: ViewStyle;
  showRoute?: boolean;
  driverProgress?: number; // 0..1 along the route
};

/**
 * Stylised stand-in for the live map. This demo has no maps API key
 * wired up (see packages/maps §4.7 in the build prompt — a real
 * provider goes behind that interface later); the abstraction here
 * keeps every screen visually correct without depending on one.
 */
export function MapCanvas({ style, showRoute, driverProgress }: Props) {
  const routeMid = driverProgress ?? 0.4;
  return (
    <View style={[styles.wrap, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 360 240" preserveAspectRatio="xMidYMid slice">
        <Path d="M0 0 H360 V240 H0 Z" fill={color.sand} opacity={0.5} />
        {Array.from({ length: 9 }).map((_, i) => (
          <Line
            key={`v${i}`}
            x1={i * 45}
            y1={0}
            x2={i * 45}
            y2={240}
            stroke={color.fort}
            strokeOpacity={0.06}
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <Line
            key={`h${i}`}
            x1={0}
            y1={i * 48}
            x2={360}
            y2={i * 48}
            stroke={color.fort}
            strokeOpacity={0.06}
            strokeWidth={1}
          />
        ))}
        {showRoute && (
          <Path
            d="M60 190 C 120 140, 160 160, 200 110 S 300 60, 320 40"
            stroke={color.copper}
            strokeWidth={3}
            strokeDasharray="10 8"
            fill="none"
          />
        )}
        {showRoute && (
          <Circle
            cx={60 + (320 - 60) * routeMid}
            cy={190 - (190 - 40) * routeMid}
            r={7}
            fill={color.amber}
            stroke={color.white}
            strokeWidth={2}
          />
        )}
      </Svg>
      <View style={styles.pin} pointerEvents="none">
        <TowerPinMark size={30} fill={color.fort} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: color.sand,
    overflow: 'hidden',
    position: 'relative',
  },
  pin: {
    position: 'absolute',
    top: '46%',
    left: '46%',
  },
});
