import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../src/components/Button';
import { Pill } from '../../src/components/Pill';
import { TowerPinMark } from '../../src/components/TowerPinMark';
import { useLang } from '../../src/i18n/LangProvider';
import { color, font, space, type } from '../../src/theme/tokens';

const MATCH_DELAY_MS = 2600;

export default function MatchingScreen() {
  const router = useRouter();
  const { t } = useLang();
  const [matched, setMatched] = useState(false);
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 900, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 900, easing: Easing.in(Easing.ease), useNativeDriver: true }),
      ])
    );
    loop.start();

    const matchTimer = setTimeout(() => setMatched(true), MATCH_DELAY_MS);
    const navTimer = setTimeout(() => router.replace('/(passenger)/tracking'), MATCH_DELAY_MS + 1100);

    return () => {
      loop.stop();
      clearTimeout(matchTimer);
      clearTimeout(navTimer);
    };
  }, []);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.35] });
  const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] });

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <View style={styles.pulseWrap}>
            <Animated.View style={[styles.ring, { transform: [{ scale }], opacity }]} />
            <TowerPinMark size={64} fill={color.sand} />
          </View>

          <Text style={styles.title}>{matched ? t('rideConfirmedTitle') : t('findingDriver')}</Text>
          {!matched && <Text style={styles.subtitle}>{t('matchingSub')}</Text>}
          {matched && <Pill label="NZ-04182" tone="dark" style={{ marginTop: space.sm }} />}
        </View>

        {!matched && (
          <Button
            label={t('cancelRide')}
            variant="ghostLight"
            onPress={() => router.replace('/(passenger)/home')}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.fort },
  safe: { flex: 1, justifyContent: 'space-between', padding: space.xl },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.lg },
  pulseWrap: { width: 140, height: 140, alignItems: 'center', justifyContent: 'center' },
  ring: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: color.sand,
  },
  title: {
    fontFamily: font.display,
    fontSize: type.title,
    color: color.white,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: font.body,
    fontWeight: '300',
    fontSize: type.body,
    color: color.sandOnFort,
    textAlign: 'center',
    maxWidth: 260,
  },
});
