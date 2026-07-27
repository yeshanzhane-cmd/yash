/**
 * Baisa-integer money handling, mirroring packages/money from the
 * production build prompt (§4.1). 1 OMR = 1000 baisa. Never a float.
 */

export type Baisa = number & { readonly __brand: 'Baisa' };

export function toBaisa(omr: number): Baisa {
  return Math.round(omr * 1000) as Baisa;
}

export function baisa(n: number): Baisa {
  return Math.round(n) as Baisa;
}

export function formatOMR(b: Baisa, locale: 'ar' | 'en' = 'en'): string {
  const sign = b < 0 ? '-' : '';
  const abs = Math.abs(b);
  const whole = Math.floor(abs / 1000);
  const fraction = String(abs % 1000).padStart(3, '0');
  const amount = `${sign}${whole}.${fraction}`;
  return locale === 'ar' ? `${amount} ر.ع.` : `${amount} OMR`;
}

export function addBaisa(...values: Baisa[]): Baisa {
  return values.reduce((sum, v) => sum + v, 0) as Baisa;
}
