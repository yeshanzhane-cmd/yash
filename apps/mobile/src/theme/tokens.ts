/**
 * Design tokens ported from the Nizwa Taxi Brand Identity System v1.0.
 * Keep this file the single source of truth — components must not
 * hardcode hex values or font families outside of it.
 */

export const color = {
  fort: '#0B3226',
  falaj: '#2E7D5B',
  sand: '#E4D9BE',
  copper: '#A9662B',
  clay: '#8C3B2E',
  basalt: '#17150F',
  limewash: '#FBF8F1',
  amber: '#E8892B',
  white: '#FFFFFF',
  line: 'rgba(23,21,15,0.14)',
  lineSoft: 'rgba(23,21,15,0.07)',
  ink60: 'rgba(23,21,15,0.6)',
  ink40: 'rgba(23,21,15,0.4)',
  sandOnFort: 'rgba(228,217,190,0.8)',
} as const;

// Functional-only aliases — never used decoratively (see brand rule 03 · Colour).
export const semantic = {
  success: color.falaj,
  danger: color.clay,
  accent: color.copper,
  background: color.limewash,
  surface: color.white,
  textPrimary: color.basalt,
  textOnDark: color.white,
} as const;

export const font = {
  display: 'Archivo_800ExtraBold',
  displayBlack: 'Archivo_900Black',
  displaySemibold: 'Archivo_700Bold',
  kufi: 'NotoKufiArabic_700Bold',
  kufiRegular: 'NotoKufiArabic_400Regular',
  body: 'IBMPlexSansArabic_400Regular',
  bodyMedium: 'IBMPlexSansArabic_500Medium',
  bodySemibold: 'IBMPlexSansArabic_600SemiBold',
  bodyBold: 'IBMPlexSansArabic_700Bold',
  mono: 'IBMPlexMono_400Regular',
  monoMedium: 'IBMPlexMono_500Medium',
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

// Zero radius everywhere except the app-icon tile itself — the mark's
// own taper is the only curve the system permits (brand rule §8).
export const radius = {
  none: 0,
  sm: 2,
  pill: 999,
} as const;

export const type = {
  display: 34,
  title: 22,
  heading: 17,
  body: 15,
  caption: 13,
  label: 11,
} as const;

export const shadow = {
  card: {
    shadowColor: color.basalt,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
} as const;
