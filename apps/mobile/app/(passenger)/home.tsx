import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LangToggle } from '../../src/components/LangToggle';
import { MapCanvas } from '../../src/components/MapCanvas';
import { TowerPinMark } from '../../src/components/TowerPinMark';
import { useLang } from '../../src/i18n/LangProvider';
import { Place, RECENT_PLACES, SAVED_PLACES } from '../../src/mock/data';
import { color, font, radius, shadow, space, type } from '../../src/theme/tokens';

export default function PassengerHomeScreen() {
  const router = useRouter();
  const { t, lang, isRTL } = useLang();

  const goToQuote = () => router.push('/(passenger)/quote');

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <MapCanvas style={styles.map} />

      <SafeAreaView edges={['top']} style={styles.topBar} pointerEvents="box-none">
        <View style={[styles.topRow, isRTL && styles.rowReverse]}>
          <View style={styles.brand}>
            <TowerPinMark size={22} fill={color.fort} />
            <Text style={styles.brandLabel}>{t('appName')}</Text>
          </View>
          <LangToggle />
        </View>
      </SafeAreaView>

      <View style={styles.sheet}>
        <Pressable onPress={goToQuote} style={styles.searchBar}>
          <View style={styles.searchDot} />
          <Text style={[styles.searchLabel, isRTL && styles.kufi]}>{t('whereTo')}</Text>
        </Pressable>

        <View style={[styles.quickRow, isRTL && styles.rowReverse]}>
          {SAVED_PLACES.map((p) => (
            <QuickChip key={p.id} place={p} lang={lang} isRTL={isRTL} onPress={goToQuote} />
          ))}
          <Pressable onPress={() => router.push('/(passenger)/history')} style={styles.chip}>
            <Text style={styles.chipLabel}>{t('tripHistory')}</Text>
          </Pressable>
        </View>

        <Text style={[styles.sectionLabel, isRTL && styles.textEnd]}>{t('recentTrips')}</Text>
        <FlatList
          data={RECENT_PLACES}
          keyExtractor={(p) => p.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          renderItem={({ item }) => (
            <Pressable
              onPress={goToQuote}
              style={[styles.recentRow, isRTL && styles.rowReverse]}
            >
              <View style={styles.recentIcon}>
                <TowerPinMark size={14} fill={color.copper} />
              </View>
              <View style={styles.recentText}>
                <Text style={[styles.recentTitle, isRTL && styles.kufi, isRTL && styles.textEnd]}>
                  {lang === 'ar' ? item.nameAr : item.nameEn}
                </Text>
                <Text style={[styles.recentSub, isRTL && styles.textEnd]}>
                  {lang === 'ar' ? item.addressAr : item.addressEn}
                </Text>
              </View>
            </Pressable>
          )}
        />

        <Pressable style={styles.scheduleLink}>
          <Text style={styles.scheduleLabel}>{t('scheduleRide')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function QuickChip({
  place,
  lang,
  isRTL,
  onPress,
}: {
  place: Place;
  lang: 'en' | 'ar';
  isRTL: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.chip}>
      <Text style={[styles.chipLabel, isRTL && styles.kufi]}>
        {lang === 'ar' ? place.nameAr : place.nameEn}
      </Text>
    </Pressable>
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
  brandLabel: {
    fontFamily: font.display,
    fontSize: 15,
    letterSpacing: -0.3,
    color: color.fort,
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
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.line,
    height: 56,
    paddingHorizontal: space.lg,
    ...shadow.card,
  },
  searchDot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: color.amber,
  },
  searchLabel: {
    fontFamily: font.bodyMedium,
    fontSize: type.heading,
    color: color.basalt,
  },
  quickRow: {
    flexDirection: 'row',
    gap: space.sm,
    marginTop: space.lg,
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderColor: color.line,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
  },
  chipLabel: {
    fontFamily: font.mono,
    fontSize: 11,
    letterSpacing: 0.5,
    color: color.ink60,
  },
  sectionLabel: {
    fontFamily: font.mono,
    fontSize: type.label,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: color.ink40,
    marginTop: space.xl,
    marginBottom: space.sm,
  },
  textEnd: { textAlign: 'right' },
  sep: { height: 1, backgroundColor: color.lineSoft },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingVertical: space.md,
  },
  recentIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.sand,
  },
  recentText: { flex: 1 },
  recentTitle: {
    fontFamily: font.bodySemibold,
    fontSize: type.body,
    color: color.basalt,
  },
  recentSub: {
    fontFamily: font.body,
    fontSize: type.caption,
    color: color.ink60,
    marginTop: 2,
  },
  scheduleLink: {
    alignItems: 'center',
    paddingVertical: space.lg,
  },
  scheduleLabel: {
    fontFamily: font.mono,
    fontSize: 11,
    letterSpacing: 1,
    color: color.copper,
    textTransform: 'uppercase',
  },
  kufi: { fontFamily: font.kufi },
});
