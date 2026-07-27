import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { color, font, space, type } from '../theme/tokens';
import { useLang } from '../i18n/LangProvider';

type Props = {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
};

export function ScreenHeader({ title, onBack, right }: Props) {
  const router = useRouter();
  const { t, isRTL } = useLang();
  const backArrow = isRTL ? '→' : '←';

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('back')}
        onPress={onBack ?? (() => router.back())}
        hitSlop={12}
        style={styles.backBtn}
      >
        <Text style={styles.backArrow}>{backArrow}</Text>
      </Pressable>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.right}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.lg,
    paddingTop: space.lg,
    paddingBottom: space.md,
    gap: space.md,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.line,
  },
  backArrow: {
    fontFamily: font.display,
    fontSize: 18,
    color: color.basalt,
  },
  title: {
    flex: 1,
    fontFamily: font.display,
    fontSize: type.title,
    letterSpacing: -0.4,
    color: color.basalt,
  },
  right: {
    minWidth: 36,
    alignItems: 'flex-end',
  },
});
