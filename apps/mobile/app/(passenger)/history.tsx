import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../src/components/Card';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { useLang } from '../../src/i18n/LangProvider';
import { formatOMR } from '../../src/lib/money';
import { TRIP_HISTORY, TripRecord } from '../../src/mock/data';
import { color, font, space, type } from '../../src/theme/tokens';

export default function HistoryScreen() {
  const { t, lang, isRTL } = useLang();

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScreenHeader title={t('tripHistory')} />
      <FlatList
        data={TRIP_HISTORY}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: space.sm }} />}
        renderItem={({ item }) => <TripRow item={item} lang={lang} isRTL={isRTL} />}
      />
    </SafeAreaView>
  );
}

function TripRow({ item, lang, isRTL }: { item: TripRecord; lang: 'en' | 'ar'; isRTL: boolean }) {
  return (
    <Card style={[styles.row, isRTL && styles.rowReverse]}>
      <View style={styles.info}>
        <Text style={[styles.route, isRTL && styles.kufi, isRTL && styles.textEnd]}>
          {lang === 'ar' ? item.fromAr : item.fromEn} → {lang === 'ar' ? item.toAr : item.toEn}
        </Text>
        <Text style={[styles.meta, isRTL && styles.textEnd]}>
          {lang === 'ar' ? item.dateAr : item.dateEn} · {item.distanceKm.toFixed(1)} km ·{' '}
          {item.durationMin} min
        </Text>
      </View>
      <Text style={styles.fare}>{formatOMR(item.fareBaisa, lang)}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.limewash },
  list: { padding: space.lg, paddingTop: space.sm },
  rowReverse: { flexDirection: 'row-reverse' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  info: { flex: 1, marginRight: space.md },
  route: { fontFamily: font.bodySemibold, fontSize: type.body, color: color.basalt },
  meta: { fontFamily: font.mono, fontSize: 11, color: color.ink60, marginTop: 4 },
  fare: { fontFamily: font.display, fontSize: 16, color: color.fort },
  textEnd: { textAlign: 'right' },
  kufi: { fontFamily: font.kufi },
});
