import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pill } from '../../src/components/Pill';
import { MapCanvas } from '../../src/components/MapCanvas';
import { useLang } from '../../src/i18n/LangProvider';
import { MOCK_DRIVER } from '../../src/mock/data';
import { color, font, radius, space, type } from '../../src/theme/tokens';

type Phase = 'enroute' | 'inprogress';

export default function TrackingScreen() {
  const router = useRouter();
  const { t, lang, isRTL } = useLang();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>('enroute');

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(1, p + 0.04);
        if (next >= 1 && p < 1) setPhase('inprogress');
        return next;
      });
    }, 250);

    const navTimer = setTimeout(() => router.replace('/(passenger)/receipt'), 8200);

    return () => {
      clearInterval(tick);
      clearTimeout(navTimer);
    };
  }, []);

  const driverName = lang === 'ar' ? MOCK_DRIVER.nameAr : MOCK_DRIVER.nameEn;
  const vehicle = lang === 'ar' ? MOCK_DRIVER.vehicleAr : MOCK_DRIVER.vehicleEn;

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <MapCanvas showRoute driverProgress={progress} style={styles.map} />

      <SafeAreaView edges={['top']} style={styles.topBar} pointerEvents="box-none">
        <Pill
          label={phase === 'inprogress' ? t('tripInProgress') : `${t('driverArrives')} 4 ${t('minutesShort')}`}
          tone={phase === 'inprogress' ? 'accent' : 'dark'}
        />
      </SafeAreaView>

      <View style={styles.sheet}>
        <View style={[styles.driverRow, isRTL && styles.rowReverse]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLabel}>{driverName.slice(0, 1)}</Text>
          </View>
          <View style={styles.driverInfo}>
            <Text style={[styles.driverName, isRTL && styles.kufi, isRTL && styles.textEnd]}>
              {driverName}
            </Text>
            <Text style={[styles.driverMeta, isRTL && styles.textEnd]}>
              ★ {MOCK_DRIVER.rating.toFixed(1)} · {vehicle}
            </Text>
          </View>
          <View style={styles.plate}>
            <Text style={styles.plateText}>{MOCK_DRIVER.plate}</Text>
          </View>
        </View>

        <View style={[styles.actionRow, isRTL && styles.rowReverse]}>
          <ActionButton label={t('callDriver')} />
          <ActionButton label={t('messageDriver')} />
          <ActionButton label={t('shareTrip')} />
        </View>

        <Pressable style={styles.sosBtn}>
          <Text style={styles.sosLabel}>{t('sos')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <Pressable style={styles.action}>
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.limewash },
  map: { position: 'absolute', top: 0, left: 0, right: 0, height: '58%' },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, padding: space.lg, alignItems: 'center' },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: '58%',
    backgroundColor: color.limewash,
    borderTopWidth: 1,
    borderColor: color.line,
    padding: space.lg,
  },
  rowReverse: { flexDirection: 'row-reverse' },
  driverRow: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: color.fort,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: { fontFamily: font.display, fontSize: 18, color: color.sand },
  driverInfo: { flex: 1 },
  driverName: { fontFamily: font.bodySemibold, fontSize: type.heading, color: color.basalt },
  driverMeta: { fontFamily: font.body, fontSize: type.caption, color: color.ink60, marginTop: 2 },
  plate: {
    borderWidth: 2,
    borderColor: color.basalt,
    backgroundColor: color.white,
    paddingHorizontal: space.sm,
    paddingVertical: 4,
  },
  plateText: { fontFamily: font.mono, fontSize: 12, letterSpacing: 1, color: color.basalt },
  actionRow: { flexDirection: 'row', gap: space.sm, marginTop: space.lg },
  action: {
    flex: 1,
    borderWidth: 1,
    borderColor: color.line,
    paddingVertical: space.md,
    alignItems: 'center',
  },
  actionLabel: { fontFamily: font.bodyMedium, fontSize: type.caption, color: color.fort },
  sosBtn: {
    marginTop: space.md,
    backgroundColor: color.clay,
    paddingVertical: space.md,
    alignItems: 'center',
  },
  sosLabel: {
    fontFamily: font.mono,
    fontSize: 12,
    letterSpacing: 2,
    color: color.white,
  },
  textEnd: { textAlign: 'right' },
  kufi: { fontFamily: font.kufi },
});
