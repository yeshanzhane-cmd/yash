import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { FalajDivider } from '../../src/components/FalajDivider';
import { MapCanvas } from '../../src/components/MapCanvas';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { useLang } from '../../src/i18n/LangProvider';
import { formatOMR } from '../../src/lib/money';
import { RIDE_TYPES, RideType } from '../../src/mock/data';
import { color, font, space, type } from '../../src/theme/tokens';

export default function QuoteScreen() {
  const router = useRouter();
  const { t, lang, isRTL } = useLang();
  const [selected, setSelected] = useState<RideType['id']>('standard');

  const ride = RIDE_TYPES.find((r) => r.id === selected)!;

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: color.limewash }}>
        <ScreenHeader title={t('fareConfirmed')} />
      </SafeAreaView>

      <MapCanvas showRoute style={styles.map} />

      <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: space.xxxl }}>
        <View style={[styles.routeRow, isRTL && styles.rowReverse]}>
          <RoutePoint label={lang === 'ar' ? 'موقعك' : 'Your location'} color={color.fort} />
          <View style={styles.routeLine} />
          <RoutePoint label={lang === 'ar' ? 'فرق' : 'Firq'} color={color.amber} />
        </View>

        <Text style={styles.sectionLabel}>{t('rideType')}</Text>
        <View style={{ gap: space.sm }}>
          {RIDE_TYPES.map((r) => (
            <Card
              key={r.id}
              style={[
                styles.rideOption,
                r.id === selected && styles.rideOptionSelected,
                isRTL && styles.rowReverse,
              ]}
              onTouchEnd={() => setSelected(r.id)}
            >
              <View>
                <Text style={[styles.rideName, isRTL && styles.textEnd]}>{t(r.labelKey)}</Text>
                <Text style={[styles.rideEta, isRTL && styles.textEnd]}>
                  {r.etaMin} {t('minutesShort')}
                </Text>
              </View>
              <Text style={styles.ridePrice}>{formatOMR(r.fareBaisa, lang)}</Text>
            </Card>
          ))}
        </View>

        <FalajDivider style={styles.divider} />

        <View style={styles.metaRow}>
          <MetaItem label={t('distance')} value="7.0 km" />
          <MetaItem label={t('estimatedTime')} value={`${ride.etaMin + 10} ${t('minutesShort')}`} />
        </View>

        <Card style={styles.notice}>
          <Text style={[styles.noticeText, isRTL && styles.textEnd, isRTL && styles.kufi]}>
            {t('fixedFareNotice')}
          </Text>
          <Text style={[styles.noticeSub, isRTL && styles.textEnd]}>{t('freeWaiting')}</Text>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button label={t('confirmRide')} onPress={() => router.push('/(passenger)/matching')} />
      </View>
    </View>
  );
}

function RoutePoint({ label, color: dotColor }: { label: string; color: string }) {
  return (
    <View style={styles.routePoint}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <Text style={styles.routeLabel} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaItem}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.limewash },
  map: { height: 150 },
  rowReverse: { flexDirection: 'row-reverse' },
  body: {
    flex: 1,
    padding: space.lg,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    marginBottom: space.xl,
  },
  routePoint: { flexDirection: 'row', alignItems: 'center', gap: space.xs, maxWidth: '45%' },
  dot: { width: 8, height: 8, borderRadius: 4 },
  routeLine: { flex: 1, height: 1, backgroundColor: color.line },
  routeLabel: { fontFamily: font.bodyMedium, fontSize: type.caption, color: color.basalt },
  sectionLabel: {
    fontFamily: font.mono,
    fontSize: type.label,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: color.ink40,
    marginBottom: space.sm,
  },
  rideOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rideOptionSelected: {
    borderColor: color.fort,
    borderWidth: 2,
  },
  rideName: { fontFamily: font.bodySemibold, fontSize: type.body, color: color.basalt },
  rideEta: { fontFamily: font.mono, fontSize: 11, color: color.ink60, marginTop: 2 },
  ridePrice: { fontFamily: font.display, fontSize: 18, color: color.fort, letterSpacing: -0.3 },
  divider: { marginVertical: space.xl },
  metaRow: { flexDirection: 'row', gap: space.xl, marginBottom: space.lg },
  metaItem: {},
  metaLabel: {
    fontFamily: font.mono,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: color.ink40,
  },
  metaValue: {
    fontFamily: font.display,
    fontSize: type.heading,
    color: color.basalt,
    marginTop: 2,
  },
  notice: { backgroundColor: color.sand, borderColor: color.sand },
  noticeText: { fontFamily: font.bodySemibold, fontSize: type.caption, color: color.fort },
  noticeSub: {
    fontFamily: font.body,
    fontSize: 12,
    color: color.fort,
    opacity: 0.75,
    marginTop: 6,
  },
  textEnd: { textAlign: 'right' },
  kufi: { fontFamily: font.kufi },
  footer: {
    padding: space.lg,
    borderTopWidth: 1,
    borderColor: color.line,
    backgroundColor: color.limewash,
  },
});
