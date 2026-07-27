import { Stack } from 'expo-router';
import React from 'react';
import { color } from '../../src/theme/tokens';

export default function DriverLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: color.limewash } }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="offer" />
      <Stack.Screen name="navigate" />
      <Stack.Screen name="earnings" />
    </Stack>
  );
}
