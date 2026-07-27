import { Baisa, addBaisa, baisa } from '../lib/money';

export type Place = {
  id: string;
  nameEn: string;
  nameAr: string;
  addressEn: string;
  addressAr: string;
};

export const SAVED_PLACES: Place[] = [
  {
    id: 'home',
    nameEn: 'Home',
    nameAr: 'المنزل',
    addressEn: 'Firq, Nizwa',
    addressAr: 'فرق، نزوى',
  },
  {
    id: 'work',
    nameEn: 'Work',
    nameAr: 'العمل',
    addressEn: 'Nizwa Souq',
    addressAr: 'سوق نزوى',
  },
];

export const RECENT_PLACES: Place[] = [
  {
    id: 'fort',
    nameEn: 'Nizwa Fort',
    nameAr: 'حصن نزوى',
    addressEn: 'Nizwa Fort, Al Dakhiliyah',
    addressAr: 'حصن نزوى، الداخلية',
  },
  {
    id: 'hospital',
    nameEn: 'Nizwa Hospital',
    nameAr: 'مستشفى نزوى',
    addressEn: 'Nizwa Hospital Road',
    addressAr: 'طريق مستشفى نزوى',
  },
  {
    id: 'university',
    nameEn: 'University of Nizwa',
    nameAr: 'جامعة نزوى',
    addressEn: 'Birkat Al Mouz, Nizwa',
    addressAr: 'بركة الموز، نزوى',
  },
];

export type RideType = {
  id: 'standard' | 'comfort';
  labelKey: 'standard' | 'comfort';
  etaMin: number;
  fareBaisa: Baisa;
};

export const RIDE_TYPES: RideType[] = [
  { id: 'standard', labelKey: 'standard', etaMin: 4, fareBaisa: baisa(2150) },
  { id: 'comfort', labelKey: 'comfort', etaMin: 6, fareBaisa: baisa(3200) },
];

export type FareBreakdown = {
  base: Baisa;
  distance: Baisa;
  time: Baisa;
  booking: Baisa;
  waiting: Baisa;
};

export const FARE_BREAKDOWN: FareBreakdown = {
  base: baisa(500),
  distance: baisa(1050),
  time: baisa(420),
  booking: baisa(100),
  waiting: baisa(80),
};

export const FARE_TOTAL: Baisa = addBaisa(
  FARE_BREAKDOWN.base,
  FARE_BREAKDOWN.distance,
  FARE_BREAKDOWN.time,
  FARE_BREAKDOWN.booking,
  FARE_BREAKDOWN.waiting
);

export type Driver = {
  id: string;
  nameEn: string;
  nameAr: string;
  rating: number;
  plate: string;
  vehicleEn: string;
  vehicleAr: string;
  carNumber: string;
  phone: string;
};

export const MOCK_DRIVER: Driver = {
  id: 'NZ-0142',
  nameEn: 'Salim Al Amri',
  nameAr: 'سالم العامري',
  rating: 4.9,
  plate: '1234 AB',
  vehicleEn: 'White Toyota Camry',
  vehicleAr: 'تويوتا كامري بيضاء',
  carNumber: 'CAR 042',
  phone: '+968 8000 0000',
};

export type RideOffer = {
  id: string;
  pickupEn: string;
  pickupAr: string;
  dropoffEn: string;
  dropoffAr: string;
  distanceKm: number;
  durationMin: number;
  fareBaisa: Baisa;
  pickupEtaMin: number;
};

export const MOCK_OFFER: RideOffer = {
  id: 'NZ-04182',
  pickupEn: 'Nizwa Souq',
  pickupAr: 'سوق نزوى',
  dropoffEn: 'Firq',
  dropoffAr: 'فرق',
  distanceKm: 7.0,
  durationMin: 14,
  fareBaisa: baisa(2150),
  pickupEtaMin: 3,
};

export type TripRecord = {
  id: string;
  dateEn: string;
  dateAr: string;
  fromEn: string;
  fromAr: string;
  toEn: string;
  toAr: string;
  fareBaisa: Baisa;
  distanceKm: number;
  durationMin: number;
};

export const TRIP_HISTORY: TripRecord[] = [
  {
    id: 'NZ-04182',
    dateEn: 'Today, 07:42',
    dateAr: 'اليوم، ٠٧:٤٢',
    fromEn: 'Nizwa Souq',
    fromAr: 'سوق نزوى',
    toEn: 'Firq',
    toAr: 'فرق',
    fareBaisa: baisa(2150),
    distanceKm: 7.0,
    durationMin: 14,
  },
  {
    id: 'NZ-04091',
    dateEn: 'Yesterday, 18:05',
    dateAr: 'أمس، ١٨:٠٥',
    fromEn: 'University of Nizwa',
    fromAr: 'جامعة نزوى',
    toEn: 'Nizwa Hospital',
    toAr: 'مستشفى نزوى',
    fareBaisa: baisa(1780),
    distanceKm: 5.2,
    durationMin: 11,
  },
  {
    id: 'NZ-03950',
    dateEn: 'Mon, 09:20',
    dateAr: 'الإثنين، ٠٩:٢٠',
    fromEn: 'Home',
    fromAr: 'المنزل',
    toEn: 'Nizwa Fort',
    toAr: 'حصن نزوى',
    fareBaisa: baisa(1420),
    distanceKm: 3.6,
    durationMin: 9,
  },
];

export type EarningsPeriod = {
  tripsCount: number;
  grossBaisa: Baisa;
  commissionBaisa: Baisa;
  netBaisa: Baisa;
};

export const TODAY_EARNINGS: EarningsPeriod = {
  tripsCount: 9,
  grossBaisa: baisa(19850),
  commissionBaisa: baisa(2978),
  netBaisa: baisa(16872),
};

export const WEEK_EARNINGS: EarningsPeriod = {
  tripsCount: 54,
  grossBaisa: baisa(118400),
  commissionBaisa: baisa(17760),
  netBaisa: baisa(100640),
};

export const WALLET_COMMISSION_OWED_BAISA: Baisa = baisa(4310);

export const DOCUMENT_EXPIRY_WARNING_DAYS = 14;
