import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { useLang } from '../../src/i18n/LangProvider';
import { formatOMR } from '../../src/lib/money';
import {
  EarningsPeriod,
  TODAY_EARNINGS,
  WALLET_COMMISSION_OWED_BAISA,
  WEEK_EARNINGS,
} from '../../src/mock/data';
import { color, font, space, type } from '../../src/theme/tokens';

type Range = 'today' | 'week';

export default function EarningsScreen() {
  const { t, lang, isRTL } = useLang();
  const [range, setRange] = useState<Range>('today');
  const period: EarningsPeriod = range === 'today' ? TODAY_EARNINGS : WEEK_EARNINGS;

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScreenHeader title={t('earnings')} />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={[styles.tabs, isRTL && styles.rowReverse]}>
          <Tab label={t('todayEarnings')} active={range === 'today'} onPress={() => setRange('today')} />
          <Tab label={t('thisWeek')} active={range === 'week'} onPress={() => setRange('week')} />
        </View>

        <Card style={styles.summary}>
          <Row label={t('gross')} value={formatOMR(period.grossBaisa, lang)} isRTL={isRTL} />
          <Row
            label={t('commission')}
            value={`− ${formatOMR(period.commissionBaisa, lang)}`}
            isRTL={isRTL}
            danger
          />
          <View style={styles.divider} />
          <Row label={t('net')} value={formatOMR(period.netBaisa, lang)} isRTL={isRTL} emphasize />
          <Text style={styles.tripsNote}>
            {period.tripsCount} {t('trips')}
          </Text>
        </Card>

        <Text style={styles.sectionLabel}>{t('walletBalance')}</Text>
        <Card style={styles.walletCard}>
          <View style={[styles.walletRow, isRTL && styles.rowReverse]}>
            <Text style={[styles.walletLabel, isRTL && styles.textEnd]}>{t('commissionOwed')}</Text>
            <Text style={styles.walletValue}>
              − {formatOMR(WALLET_COMMISSION_OWED_BAISA, lang)}
            </Text>
          </View>
          <Text style={[styles.walletNote, isRTL && styles.textEnd]}>
            {lang === 'ar'
              ? 'رحلات الدفع النقدي تُحصّل بالكامل منك، وتُخصم عمولة نزوى تاكسي كرصيد مستحق.'
              : 'Cash rides are collected in full by you — the commission is tracked here as owed to Nizwa Taxi.'}
          </Text>
          <Button
            label={t('settleNow')}
            variant="secondary"
            style={{ marginTop: space.md }}
            onPress={() =>
              Alert.alert(t('settleNow'), lang === 'ar' ? 'قريباً' : 'Settlement flow — coming soon in this demo.')
            }
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function Tab({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.tab, active && styles.tabActive]}>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </Pressable>
  );
}

function Row({
  label,
  value,
  isRTL,
  danger,
  emphasize,
}: {
  label: string;
  value: string;
  isRTL: boolean;
  danger?: boolean;
  emphasize?: boolean;
}) {
  return (
    <View style={[styles.row, isRTL && styles.rowReverse]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text
        style={[
          styles.rowValue,
          danger && { color: color.clay },
          emphasize && styles.rowValueEmphasis,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.limewash },
  body: { padding: space.lg, paddingTop: 0, gap: space.md },
  rowReverse: { flexDirection: 'row-reverse' },
  tabs: { flexDirection: 'row', gap: space.sm, marginBottom: space.sm },
  tab: { flex: 1, paddingVertical: space.sm, alignItems: 'center', borderWidth: 1, borderColor: color.line },
  tabActive: { backgroundColor: color.fort, borderColor: color.fort },
  tabLabel: { fontFamily: font.mono, fontSize: 11, letterSpacing: 1, color: color.ink60 },
  tabLabelActive: { color: color.sand },
  summary: {},
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  rowLabel: { fontFamily: font.body, fontSize: type.body, color: color.ink60 },
  rowValue: { fontFamily: font.mono, fontSize: type.body, color: color.basalt },
  rowValueEmphasis: { fontFamily: font.displayBlack, fontSize: 22, color: color.fort },
  divider: { height: 1, backgroundColor: color.lineSoft, marginVertical: space.sm },
  tripsNote: { fontFamily: font.mono, fontSize: 11, color: color.ink40, marginTop: space.sm },
  sectionLabel: {
    fontFamily: font.mono,
    fontSize: type.label,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: color.ink40,
    marginTop: space.md,
  },
  walletCard: { backgroundColor: '#FBEFE9', borderColor: color.clay },
  walletRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  walletLabel: { fontFamily: font.bodySemibold, fontSize: type.caption, color: color.clay, flex: 1 },
  walletValue: { fontFamily: font.displayBlack, fontSize: 20, color: color.clay },
  walletNote: { fontFamily: font.body, fontSize: 12.5, color: color.ink60, marginTop: space.sm, lineHeight: 18 },
  textEnd: { textAlign: 'right' },
});
