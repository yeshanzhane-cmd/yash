import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLang } from '../../src/i18n/LangProvider';
import { formatOMR } from '../../src/lib/money';
import { MOCK_OFFER } from '../../src/mock/data';
import { color, font, space, type } from '../../src/theme/tokens';

const OFFER_SECONDS = 15;

export default function OfferScreen() {
  const router = useRouter();
  const { t, lang, isRTL } = useLang();
  const [secondsLeft, setSecondsLeft] = useState(OFFER_SECONDS);
  const width = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(width, {
      toValue: 0,
      duration: OFFER_SECONDS * 1000,
      useNativeDriver: false,
    }).start();

    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          router.replace('/(driver)/home');
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const barWidth = width.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.headerLabel}>{t('newRideOffer')}</Text>
          <Text style={styles.seconds}>{secondsLeft}s</Text>
        </View>
        <View style={styles.barTrack}>
          <Animated.View style={[styles.barFill, { width: barWidth }]} />
        </View>

        <View style={styles.fareBlock}>
          <Text style={styles.fare}>{formatOMR(MOCK_OFFER.fareBaisa, lang)}</Text>
          <Text style={styles.fareSub}>
            {MOCK_OFFER.distanceKm.toFixed(1)} km · {MOCK_OFFER.durationMin} {t('minutesShort')}
          </Text>
        </View>

        <View style={styles.route}>
          <RoutePoint dotColor={color.falaj} label={t('pickup')} value={lang === 'ar' ? MOCK_OFFER.pickupAr : MOCK_OFFER.pickupEn} isRTL={isRTL} />
          <View style={styles.routeConnector} />
          <RoutePoint dotColor={color.amber} label={t('dropoff')} value={lang === 'ar' ? MOCK_OFFER.dropoffAr : MOCK_OFFER.dropoffEn} isRTL={isRTL} />
        </View>

        <Text style={styles.pickupEta}>
          {t('pickupIn')} {MOCK_OFFER.pickupEtaMin} {t('minutesShort')}
        </Text>

        <View style={[styles.actions, isRTL && styles.rowReverse]}>
          <Pressable
            style={[styles.actionBtn, styles.decline]}
            onPress={() => router.replace('/(driver)/home')}
          >
            <Text style={styles.declineLabel}>{t('decline')}</Text>
          </Pressable>
          <Pressable
            style={[styles.actionBtn, styles.accept]}
            onPress={() => router.replace('/(driver)/navigate')}
          >
            <Text style={styles.acceptLabel}>{t('accept')}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

function RoutePoint({
  dotColor,
  label,
  value,
  isRTL,
}: {
  dotColor: string;
  label: string;
  value: string;
  isRTL: boolean;
}) {
  return (
    <View style={[styles.routePoint, isRTL && styles.rowReverse]}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <View>
        <Text style={styles.routeLabel}>{label}</Text>
        <Text style={[styles.routeValue, isRTL && styles.kufi]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.fort },
  safe: { flex: 1, padding: space.xl, justifyContent: 'center', gap: space.xl },
  rowReverse: { flexDirection: 'row-reverse' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  headerLabel: {
    fontFamily: font.mono,
    fontSize: type.label,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: color.sandOnFort,
  },
  seconds: {
    fontFamily: font.displayBlack,
    fontSize: 28,
    color: color.amber,
  },
  barTrack: { height: 4, backgroundColor: 'rgba(228,217,190,0.2)' },
  barFill: { height: 4, backgroundColor: color.amber },
  fareBlock: { alignItems: 'center', marginTop: space.lg },
  fare: { fontFamily: font.displayBlack, fontSize: 48, color: color.white, letterSpacing: -1.5 },
  fareSub: { fontFamily: font.mono, fontSize: 12, color: color.sandOnFort, marginTop: 4 },
  route: { gap: space.md },
  routePoint: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  dot: { width: 10, height: 10, borderRadius: 5 },
  routeConnector: { width: 1, height: 18, backgroundColor: 'rgba(228,217,190,0.3)', marginLeft: 4 },
  routeLabel: {
    fontFamily: font.mono,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: color.sandOnFort,
  },
  routeValue: { fontFamily: font.bodySemibold, fontSize: type.heading, color: color.white, marginTop: 2 },
  pickupEta: {
    fontFamily: font.bodyMedium,
    fontSize: type.caption,
    color: color.sand,
    textAlign: 'center',
  },
  actions: { flexDirection: 'row', gap: space.md, marginTop: space.lg },
  actionBtn: { flex: 1, height: 60, alignItems: 'center', justifyContent: 'center' },
  decline: { borderWidth: 1, borderColor: 'rgba(228,217,190,0.35)' },
  accept: { backgroundColor: color.falaj },
  declineLabel: { fontFamily: font.bodySemibold, fontSize: type.heading, color: color.sand },
  acceptLabel: { fontFamily: font.bodySemibold, fontSize: type.heading, color: color.white },
  kufi: { fontFamily: font.kufi },
});
