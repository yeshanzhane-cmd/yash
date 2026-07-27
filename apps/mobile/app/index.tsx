import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FalajDivider } from '../src/components/FalajDivider';
import { LangToggle } from '../src/components/LangToggle';
import { TowerPinMark } from '../src/components/TowerPinMark';
import { useLang } from '../src/i18n/LangProvider';
import { color, font, space, type } from '../src/theme/tokens';

export default function RoleSelectScreen() {
  const router = useRouter();
  const { t, isRTL } = useLang();

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={[styles.topBar, isRTL && styles.rowReverse]}>
          <View />
          <LangToggle />
        </View>

        <View style={styles.hero}>
          <TowerPinMark size={72} fill={color.sand} />
          <Text style={styles.wordmark}>{t('appName')}</Text>
          <Text style={[styles.tagline, isRTL && styles.kufi]}>{t('tagline')}</Text>
        </View>

        <FalajDivider style={styles.divider} tone="sand" />

        <View style={styles.roles}>
          <RoleCard
            title={t('choosePassenger')}
            subtitle={t('choosePassengerSub')}
            onPress={() => router.push('/(passenger)/home')}
            emphasis
            isRTL={isRTL}
          />
          <RoleCard
            title={t('chooseDriver')}
            subtitle={t('chooseDriverSub')}
            onPress={() => router.push('/(driver)/home')}
            isRTL={isRTL}
          />
        </View>

        <Text style={styles.footnote}>MVP demo · mock data · no live backend</Text>
      </SafeAreaView>
    </View>
  );
}

function RoleCard({
  title,
  subtitle,
  onPress,
  emphasis,
  isRTL,
}: {
  title: string;
  subtitle: string;
  onPress: () => void;
  emphasis?: boolean;
  isRTL: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.roleCard,
        emphasis ? styles.roleCardEmphasis : styles.roleCardGhost,
        pressed && styles.rolePressed,
      ]}
    >
      <Text
        style={[
          styles.roleTitle,
          isRTL && styles.kufi,
          { color: emphasis ? color.fort : color.sand },
        ]}
      >
        {title}
      </Text>
      <Text style={[styles.roleSubtitle, { color: emphasis ? color.ink60 : color.sandOnFort }]}>
        {subtitle}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.fort,
  },
  safe: {
    flex: 1,
    paddingHorizontal: space.xl,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: space.sm,
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  hero: {
    alignItems: 'center',
    gap: space.md,
  },
  wordmark: {
    fontFamily: font.displayBlack,
    fontSize: 34,
    letterSpacing: -1.2,
    color: color.white,
    marginTop: space.md,
  },
  tagline: {
    fontFamily: font.body,
    fontWeight: '300',
    fontSize: type.body,
    color: color.sandOnFort,
  },
  kufi: {
    fontFamily: font.kufi,
  },
  divider: {
    marginVertical: space.xl,
  },
  roles: {
    gap: space.md,
  },
  roleCard: {
    padding: space.xl,
    borderWidth: 1,
  },
  roleCardEmphasis: {
    backgroundColor: color.sand,
    borderColor: color.sand,
  },
  roleCardGhost: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(228,217,190,0.3)',
  },
  rolePressed: {
    opacity: 0.85,
  },
  roleTitle: {
    fontFamily: font.display,
    fontSize: type.title,
    letterSpacing: -0.4,
    marginBottom: space.xs,
  },
  roleSubtitle: {
    fontFamily: font.body,
    fontSize: type.caption,
  },
  footnote: {
    textAlign: 'center',
    fontFamily: font.mono,
    fontSize: 10,
    letterSpacing: 1,
    color: 'rgba(228,217,190,0.4)',
    paddingBottom: space.sm,
  },
});
