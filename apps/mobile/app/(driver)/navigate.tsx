import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../src/components/Button';
import { MapCanvas } from '../../src/components/MapCanvas';
import { Pill } from '../../src/components/Pill';
import { useLang } from '../../src/i18n/LangProvider';
import { MOCK_OFFER } from '../../src/mock/data';
import { color, font, radius, space, type } from '../../src/theme/tokens';

// Nizwa Fort — placeholder destination for the "Open in Maps" handoff.
const DEMO_LAT = 22.9333;
const DEMO_LNG = 57.531;

type TripPhase = 'toPickup' | 'arrived' | 'inProgress';

export default function NavigateScreen() {
  const router = useRouter();
  const { t, lang, isRTL } = useLang();
  const [phase, setPhase] = useState<TripPhase>('toPickup');

  const openInMaps = () => {
    Linking.openURL(`https://maps.google.com/?q=${DEMO_LAT},${DEMO_LNG}`).catch(() => {});
  };

  const advance = () => {
    if (phase === 'toPickup') setPhase('arrived');
    else if (phase === 'arrived') setPhase('inProgress');
    else router.replace('/(driver)/earnings');
  };

  const actionLabel =
    phase === 'toPickup' ? t('arrivedAtPickup') : phase === 'arrived' ? t('startTrip') : t('endTrip');

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <MapCanvas showRoute driverProgress={phase === 'inProgress' ? 0.7 : 0.15} style={styles.map} />

      <SafeAreaView edges={['top']} style={styles.topBar} pointerEvents="box-none">
        <Pill
          label={
            phase === 'toPickup' ? t('pickup') : phase === 'arrived' ? t('arrivedAtPickup') : t('tripInProgress')
          }
          tone={phase === 'inProgress' ? 'accent' : 'dark'}
        />
      </SafeAreaView>

      <View style={styles.sheet}>
        <View style={[styles.passengerRow, isRTL && styles.rowReverse]}>
          <View style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.passengerLabel}>{t('passenger')}</Text>
            <Text style={[styles.destination, isRTL && styles.kufi, isRTL && styles.textEnd]}>
              {phase === 'toPickup'
                ? lang === 'ar'
                  ? MOCK_OFFER.pickupAr
                  : MOCK_OFFER.pickupEn
                : lang === 'ar'
                  ? MOCK_OFFER.dropoffAr
                  : MOCK_OFFER.dropoffEn}
            </Text>
          </View>
        </View>

        <Pressable style={[styles.mapsBtn, isRTL && styles.rowReverse]} onPress={openInMaps}>
          <Text style={styles.mapsLabel}>{t('openInMaps')}</Text>
        </Pressable>

        <Button label={actionLabel} onPress={advance} style={{ marginTop: space.md }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.limewash },
  map: { position: 'absolute', top: 0, left: 0, right: 0, height: '60%' },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, padding: space.lg, alignItems: 'center' },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: '60%',
    backgroundColor: color.limewash,
    borderTopWidth: 1,
    borderColor: color.line,
    padding: space.lg,
  },
  rowReverse: { flexDirection: 'row-reverse' },
  passengerRow: { flexDirection: 'row', alignItems: 'center', gap: space.md, marginBottom: space.md },
  avatar: { width: 40, height: 40, borderRadius: radius.pill, backgroundColor: color.sand },
  passengerLabel: {
    fontFamily: font.mono,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: color.ink40,
  },
  destination: { fontFamily: font.bodySemibold, fontSize: type.heading, color: color.basalt, marginTop: 2 },
  mapsBtn: {
    borderWidth: 1,
    borderColor: color.line,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapsLabel: { fontFamily: font.bodyMedium, fontSize: type.caption, color: color.fort },
  textEnd: { textAlign: 'right' },
  kufi: { fontFamily: font.kufi },
});
