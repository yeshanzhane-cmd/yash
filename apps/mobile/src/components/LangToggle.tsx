import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { color, font } from '../theme/tokens';
import { useLang } from '../i18n/LangProvider';

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => setLang(lang === 'en' ? 'ar' : 'en')}
      style={styles.btn}
      hitSlop={8}
    >
      <Text style={styles.label}>{lang === 'en' ? 'ع' : 'EN'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.line,
  },
  label: {
    fontFamily: font.mono,
    fontSize: 13,
    color: color.fort,
  },
});
