import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { color, font, radius, space, type } from '../theme/tokens';

type Variant = 'primary' | 'secondary' | 'ghost' | 'ghostLight' | 'danger';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

const VARIANT_STYLES: Record<Variant, { bg: string; fg: string; border?: string }> = {
  primary: { bg: color.fort, fg: color.sand },
  secondary: { bg: color.sand, fg: color.fort },
  ghost: { bg: 'transparent', fg: color.fort, border: color.line },
  ghostLight: { bg: 'transparent', fg: color.sand, border: 'rgba(228,217,190,0.35)' },
  danger: { bg: color.clay, fg: color.white },
};

export function Button({ label, onPress, variant = 'primary', disabled, loading, style }: Props) {
  const v = VARIANT_STYLES[variant];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: v.bg, borderColor: v.border ?? 'transparent' },
        v.border ? styles.bordered : null,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.fg} />
      ) : (
        <Text style={[styles.label, { color: v.fg }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: radius.none,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.xl,
  },
  bordered: {
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.45,
  },
  label: {
    fontFamily: font.bodySemibold,
    fontSize: type.heading,
    letterSpacing: -0.2,
  },
});
