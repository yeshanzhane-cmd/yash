import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { color, radius, space } from '../theme/tokens';

export function Card({ style, ...rest }: ViewProps) {
  return <View style={[styles.card, style]} {...rest} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.line,
    borderRadius: radius.none,
    padding: space.lg,
  },
});
