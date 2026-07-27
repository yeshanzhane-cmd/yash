/**
 * All user-facing copy lives here in both scripts (brand invariant 4.6).
 * Arabic strings are written, not machine-translated.
 */

export type Lang = 'en' | 'ar';

export const strings = {
  appName: { en: 'Nizwa Taxi', ar: 'نزوى تاكسي' },
  tagline: { en: 'Your ride, your city.', ar: 'رحلتك، مدينتك' },

  // Role select
  choosePassenger: { en: 'I need a ride', ar: 'أحتاج إلى رحلة' },
  chooseDriver: { en: "I'm a driver", ar: 'أنا سائق' },
  choosePassengerSub: { en: 'Book a taxi anywhere in Nizwa', ar: 'احجز تاكسي في أي مكان بنزوى' },
  chooseDriverSub: { en: 'Go online and accept rides', ar: 'فعّل حالتك واستقبل الرحلات' },

  // Passenger — Home
  whereTo: { en: 'Where are you going?', ar: 'إلى أين تريد الذهاب؟' },
  currentLocation: { en: 'Your location', ar: 'موقعك الحالي' },
  savedPlaces: { en: 'Saved places', ar: 'الأماكن المحفوظة' },
  recentTrips: { en: 'Recent', ar: 'الأخيرة' },
  home: { en: 'Home', ar: 'المنزل' },
  work: { en: 'Work', ar: 'العمل' },
  scheduleRide: { en: 'Schedule for later', ar: 'حجز لوقت لاحق' },

  // Quote
  fareConfirmed: { en: 'Fare confirmed', ar: 'تم تأكيد الأجرة' },
  fixedFareNotice: {
    en: 'Your fare is fixed unless the destination changes.',
    ar: 'أجرتك ثابتة ما لم تتغير الوجهة.',
  },
  freeWaiting: { en: 'Free waiting time: 3 minutes', ar: 'وقت الانتظار المجاني: ٣ دقائق' },
  confirmRide: { en: 'Confirm ride', ar: 'تأكيد الرحلة' },
  estimatedTime: { en: 'Estimated time', ar: 'الوقت المقدر' },
  distance: { en: 'Distance', ar: 'المسافة' },
  rideType: { en: 'Ride type', ar: 'نوع الرحلة' },
  standard: { en: 'Standard', ar: 'عادي' },
  comfort: { en: 'Comfort · Van', ar: 'مريح · فان' },

  // Matching
  findingDriver: { en: 'Finding your driver', ar: 'جارٍ البحث عن سائق' },
  matchingSub: {
    en: 'Offering your ride to the nearest available driver.',
    ar: 'يتم عرض رحلتك على أقرب سائق متاح.',
  },
  cancelRide: { en: 'Cancel ride', ar: 'إلغاء الرحلة' },
  rideConfirmedTitle: { en: 'Ride confirmed', ar: 'تم تأكيد الرحلة' },
  noDriversTitle: {
    en: 'No drivers available in Nizwa right now.',
    ar: 'لا يوجد سائقون متاحون في نزوى حالياً.',
  },
  noDriversAction: { en: 'Schedule a ride for later?', ar: 'هل تريد حجز رحلة لوقت لاحق؟' },

  // Tracking
  driverArrives: { en: 'Your driver arrives in', ar: 'سيصل سائقك خلال' },
  minutesShort: { en: 'min', ar: 'د' },
  callDriver: { en: 'Call', ar: 'اتصال' },
  messageDriver: { en: 'Message', ar: 'رسالة' },
  shareTrip: { en: 'Share trip', ar: 'مشاركة الرحلة' },
  sos: { en: 'SOS', ar: 'طوارئ' },
  plate: { en: 'Plate', ar: 'اللوحة' },
  tripInProgress: { en: 'Trip in progress', ar: 'الرحلة جارية' },

  // Receipt
  paidInCash: { en: 'Paid in cash', ar: 'تم الدفع نقداً' },
  base: { en: 'Base', ar: 'الأساس' },
  time: { en: 'Time', ar: 'الوقت' },
  booking: { en: 'Booking', ar: 'الحجز' },
  waiting: { en: 'Waiting', ar: 'الانتظار' },
  total: { en: 'Total', ar: 'الإجمالي' },
  rateYourTrip: { en: 'Rate your trip', ar: 'قيّم رحلتك' },
  done: { en: 'Done', ar: 'تم' },
  tripHistory: { en: 'Trip history', ar: 'سجل الرحلات' },

  // Driver — Home
  goOnline: { en: 'Go online', ar: 'تفعيل الحالة' },
  goOffline: { en: 'Go offline', ar: 'إيقاف الحالة' },
  online: { en: 'Online', ar: 'متصل' },
  offline: { en: 'Offline', ar: 'غير متصل' },
  earnings: { en: 'Earnings', ar: 'الأرباح' },
  todayEarnings: { en: "Today's earnings", ar: 'أرباح اليوم' },
  documentExpiry: { en: 'Document expiring soon', ar: 'وثيقة على وشك الانتهاء' },

  // Driver — Offer
  newRideOffer: { en: 'New ride offer', ar: 'عرض رحلة جديد' },
  pickupIn: { en: 'Pickup in', ar: 'الاستلام خلال' },
  accept: { en: 'Accept', ar: 'قبول' },
  decline: { en: 'Decline', ar: 'رفض' },
  pickup: { en: 'Pickup', ar: 'نقطة الانطلاق' },
  dropoff: { en: 'Drop-off', ar: 'نقطة الوصول' },

  // Driver — Navigate
  arrivedAtPickup: { en: 'Arrived', ar: 'وصلت' },
  startTrip: { en: 'Start trip', ar: 'بدء الرحلة' },
  endTrip: { en: 'End trip', ar: 'إنهاء الرحلة' },
  openInMaps: { en: 'Open in Maps', ar: 'فتح في الخرائط' },
  passenger: { en: 'Passenger', ar: 'الراكب' },

  // Driver — Earnings
  gross: { en: 'Gross fare', ar: 'الأجرة الإجمالية' },
  commission: { en: 'Commission (15%)', ar: 'العمولة (١٥٪)' },
  net: { en: 'Net earnings', ar: 'صافي الأرباح' },
  commissionOwed: { en: 'Commission owed to Nizwa Taxi', ar: 'العمولة المستحقة لنزوى تاكسي' },
  walletBalance: { en: 'Wallet balance', ar: 'رصيد المحفظة' },
  settleNow: { en: 'Settle now', ar: 'تسوية الآن' },
  thisWeek: { en: 'This week', ar: 'هذا الأسبوع' },
  trips: { en: 'Trips', ar: 'الرحلات' },

  // Common
  back: { en: 'Back', ar: 'رجوع' },
  language: { en: 'Language', ar: 'اللغة' },
} as const;

export type StringKey = keyof typeof strings;

export function t(key: StringKey, lang: Lang): string {
  return strings[key][lang];
}
