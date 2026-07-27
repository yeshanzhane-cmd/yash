import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { color, font, radius, space, type } from '../theme/tokens';

type Tone = 'neutral' | 'success' | 'danger' | 'accent' | 'dark';

const TONE_STYLES: Record<Tone, { bg: string; fg: string }> = {
  neutral: { bg: color.sand, fg: color.fort },
  success: { bg: color.falaj, fg: color.white },
  danger: { bg: color.clay, fg: color.white },
  accent: { bg: color.amber, fg: color.white },
  dark: { bg: color.fort, fg: color.sand },
};

export function Pill({
  label,
  tone = 'neutral',
  style,
}: {
  label: string;
  tone?: Tone;
  style?: ViewStyle;
}) {
  const t = TONE_STYLES[tone];
  return (
    <View style={[styles.base, { backgroundColor: t.bg }, style]}>
      <Text style={[styles.label, { color: t.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: space.md,
    paddingVertical: space.xs,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: font.mono,
    fontSize: type.label,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
