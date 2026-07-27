import { Stack } from 'expo-router';
import React from 'react';
import { color } from '../../src/theme/tokens';

export default function PassengerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: color.limewash } }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="quote" />
      <Stack.Screen name="matching" />
      <Stack.Screen name="tracking" />
      <Stack.Screen name="receipt" />
      <Stack.Screen name="history" />
    </Stack>
  );
}
