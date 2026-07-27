import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../src/components/Button';
import { FalajDivider } from '../../src/components/FalajDivider';
import { TowerPinMark } from '../../src/components/TowerPinMark';
import { useLang } from '../../src/i18n/LangProvider';
import { Baisa, formatOMR } from '../../src/lib/money';
import { FARE_BREAKDOWN, FARE_TOTAL, MOCK_OFFER } from '../../src/mock/data';
import { color, font, space, type } from '../../src/theme/tokens';

export default function ReceiptScreen() {
  const router = useRouter();
  const { t, lang, isRTL } = useLang();
  const [rating, setRating] = useState(5);

  const line = (label: string, value: Baisa) => (
    <View style={[styles.lineRow, isRTL && styles.rowReverse]}>
      <Text style={styles.lineLabel}>{label}</Text>
      <Text style={styles.lineValue}>{formatOMR(value, lang)}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: space.lg, paddingBottom: space.xxxl }}>
      <SafeAreaView edges={['top']}>
        <View style={styles.receipt}>
          <View style={[styles.receiptHead, isRTL && styles.rowReverse]}>
            <TowerPinMark size={18} fill={color.fort} />
            <Text style={styles.receiptBrand}>{t('appName')}</Text>
          </View>

          <Text style={styles.paid}>{t('paidInCash')}</Text>
          <Text style={styles.total}>{formatOMR(FARE_TOTAL, lang)}</Text>

          <FalajDivider style={styles.dashedFull} />

          {line(t('base'), FARE_BREAKDOWN.base)}
          {line(t('distance'), FARE_BREAKDOWN.distance)}
          {line(t('time'), FARE_BREAKDOWN.time)}
          {line(t('booking'), FARE_BREAKDOWN.booking)}
          {line(t('waiting'), FARE_BREAKDOWN.waiting)}

          <FalajDivider style={styles.dashedFull} />

          <Text style={styles.routeLine}>
            {lang === 'ar' ? MOCK_OFFER.pickupAr : MOCK_OFFER.pickupEn}
            {'  →  '}
            {lang === 'ar' ? MOCK_OFFER.dropoffAr : MOCK_OFFER.dropoffEn}
          </Text>
          <Text style={styles.routeMeta}>
            {MOCK_OFFER.distanceKm.toFixed(1)} km · {MOCK_OFFER.durationMin} {t('minutesShort')} · #
            {MOCK_OFFER.id}
          </Text>
        </View>

        <View style={styles.rateBlock}>
          <Text style={styles.rateTitle}>{t('rateYourTrip')}</Text>
          <View style={[styles.stars, isRTL && styles.rowReverse]}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Pressable key={i} onPress={() => setRating(i)} hitSlop={6}>
                <Text style={[styles.star, i <= rating && styles.starOn]}>★</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Button
          label={t('done')}
          onPress={() => router.replace('/(passenger)/home')}
          style={{ marginTop: space.xl }}
        />
        <Button
          label={t('tripHistory')}
          variant="ghost"
          onPress={() => router.push('/(passenger)/history')}
          style={{ marginTop: space.sm }}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.limewash },
  rowReverse: { flexDirection: 'row-reverse' },
  receipt: {
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.line,
    padding: space.xl,
  },
  receiptHead: { flexDirection: 'row', alignItems: 'center', gap: space.sm, marginBottom: space.md },
  receiptBrand: { fontFamily: font.display, fontSize: 13, letterSpacing: -0.2, color: color.basalt },
  paid: { fontFamily: font.mono, fontSize: 12, color: color.ink60, marginBottom: 6 },
  total: {
    fontFamily: font.displayBlack,
    fontSize: 34,
    letterSpacing: -0.8,
    color: color.basalt,
    marginBottom: space.md,
  },
  dashedFull: { marginVertical: space.md },
  lineRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  lineLabel: { fontFamily: font.mono, fontSize: 12.5, color: color.ink60 },
  lineValue: { fontFamily: font.mono, fontSize: 12.5, color: color.basalt },
  routeLine: { fontFamily: font.mono, fontSize: 12.5, color: color.basalt, marginTop: space.xs },
  routeMeta: { fontFamily: font.mono, fontSize: 11, color: color.ink60, marginTop: 4 },
  rateBlock: { alignItems: 'center', marginTop: space.xxl },
  rateTitle: { fontFamily: font.display, fontSize: type.heading, color: color.basalt, marginBottom: space.md },
  stars: { flexDirection: 'row', gap: space.sm },
  star: { fontSize: 32, color: color.line },
  starOn: { color: color.copper },
});
