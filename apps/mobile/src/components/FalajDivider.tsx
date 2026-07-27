import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { color } from '../theme/tokens';

type Props = { style?: ViewStyle; tone?: 'copper' | 'sand' };

/**
 * The one decorative device the brand system permits: a broken line
 * borrowed from Nizwa's falaj irrigation channels. Used to divide
 * sections and mark routes — never as ambient decoration.
 */
export function FalajDivider({ style, tone = 'copper' }: Props) {
  const dashColor = tone === 'copper' ? color.copper : color.sand;
  return (
    <View style={[styles.row, style]}>
      {Array.from({ length: 18 }).map((_, i) => (
        <View key={i} style={[styles.dash, { backgroundColor: dashColor }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  dash: {
    width: 10,
    height: 2,
    marginRight: 6,
  },
});
