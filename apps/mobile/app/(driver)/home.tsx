import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../src/components/Card';
import { LangToggle } from '../../src/components/LangToggle';
import { MapCanvas } from '../../src/components/MapCanvas';
import { Pill } from '../../src/components/Pill';
import { TowerPinMark } from '../../src/components/TowerPinMark';
import { useLang } from '../../src/i18n/LangProvider';
import { formatOMR } from '../../src/lib/money';
import { DOCUMENT_EXPIRY_WARNING_DAYS, TODAY_EARNINGS } from '../../src/mock/data';
import { color, font, radius, space, type } from '../../src/theme/tokens';

const OFFER_DELAY_MS = 3200;

export default function DriverHomeScreen() {
  const router = useRouter();
  const { t, lang, isRTL } = useLang();
  const [online, setOnline] = useState(false);
  const offerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (online) {
      offerTimer.current = setTimeout(() => router.push('/(driver)/offer'), OFFER_DELAY_MS);
    }
    return () => {
      if (offerTimer.current) clearTimeout(offerTimer.current);
    };
  }, [online]);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <MapCanvas style={styles.map} />

      <SafeAreaView edges={['top']} style={styles.topBar} pointerEvents="box-none">
        <View style={[styles.topRow, isRTL && styles.rowReverse]}>
          <View style={[styles.brand, isRTL && styles.rowReverse]}>
            <View style={styles.driverIcon}>
              <TowerPinMark size={16} fill={color.sand} />
            </View>
            <Pill label={online ? t('online') : t('offline')} tone={online ? 'success' : 'neutral'} />
          </View>
          <LangToggle />
        </View>
      </SafeAreaView>

      <View style={styles.sheet}>
        <Pressable
          onPress={() => setOnline((v) => !v)}
          style={[styles.toggleRow, isRTL && styles.rowReverse]}
        >
          <Text style={[styles.toggleLabel, isRTL && styles.kufi]}>
            {online ? t('goOffline') : t('goOnline')}
          </Text>
          <Switch
            value={online}
            onValueChange={setOnline}
            trackColor={{ true: color.falaj, false: color.line }}
            thumbColor={color.white}
          />
        </Pressable>

        <Card style={styles.earningsCard}>
          <View style={[styles.earningsHead, isRTL && styles.rowReverse]}>
            <Text style={styles.earningsLabel}>{t('todayEarnings')}</Text>
            <Text style={styles.earningsTrips}>
              {TODAY_EARNINGS.tripsCount} {t('trips')}
            </Text>
          </View>
          <Text style={styles.earningsValue}>{formatOMR(TODAY_EARNINGS.netBaisa, lang)}</Text>
          <Pressable onPress={() => router.push('/(driver)/earnings')}>
            <Text style={styles.earningsLink}>{t('gross')} / {t('commission')} →</Text>
          </Pressable>
        </Card>

        <Card style={[styles.warnCard, isRTL && styles.rowReverse]}>
          <Text style={styles.warnIcon}>!</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.warnTitle, isRTL && styles.textEnd]}>{t('documentExpiry')}</Text>
            <Text style={[styles.warnSub, isRTL && styles.textEnd]}>
              {lang === 'ar'
                ? `رخصة القيادة تنتهي خلال ${DOCUMENT_EXPIRY_WARNING_DAYS} يوماً`
                : `Driving licence expires in ${DOCUMENT_EXPIRY_WARNING_DAYS} days`}
            </Text>
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.limewash },
  map: { position: 'absolute', top: 0, left: 0, right: 0, height: '46%' },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: space.lg,
    paddingTop: space.sm,
  },
  rowReverse: { flexDirection: 'row-reverse' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  driverIcon: {
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: color.fort,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: '40%',
    backgroundColor: color.limewash,
    borderTopWidth: 1,
    borderColor: color.line,
    padding: space.lg,
    gap: space.md,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.line,
    height: 56,
    paddingHorizontal: space.lg,
  },
  toggleLabel: { fontFamily: font.bodySemibold, fontSize: type.heading, color: color.basalt },
  earningsCard: {},
  earningsHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  earningsLabel: {
    fontFamily: font.mono,
    fontSize: type.label,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: color.ink40,
  },
  earningsTrips: { fontFamily: font.mono, fontSize: 11, color: color.ink60 },
  earningsValue: {
    fontFamily: font.displayBlack,
    fontSize: 30,
    color: color.fort,
    letterSpacing: -0.6,
    marginTop: space.xs,
    marginBottom: space.sm,
  },
  earningsLink: { fontFamily: font.mono, fontSize: 11, color: color.copper, letterSpacing: 0.5 },
  warnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    backgroundColor: '#FBEFE9',
    borderColor: color.clay,
  },
  warnIcon: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    backgroundColor: color.clay,
    color: color.white,
    fontFamily: font.displayBlack,
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 26,
    overflow: 'hidden',
  },
  warnTitle: { fontFamily: font.bodySemibold, fontSize: type.caption, color: color.clay },
  warnSub: { fontFamily: font.body, fontSize: 12, color: color.ink60, marginTop: 2 },
  textEnd: { textAlign: 'right' },
  kufi: { fontFamily: font.kufi },
});
