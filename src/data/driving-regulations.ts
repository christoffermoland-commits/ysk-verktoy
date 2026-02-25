import type { DrivingRegulation } from '../types/driving-time'

export const drivingRegulations: DrivingRegulation[] = [
  {
    id: 'daily-driving',
    category: 'daglig-kjoring',
    title: 'Daglig kjøretid',
    mainRule: 'Maksimal daglig kjøretid er 9 timer.',
    maxValue: 9,
    unit: 'timer',
    exceptions: [
      'Kan utvides til 10 timer maksimalt to ganger i løpet av en uke.',
    ],
    legalReference: 'Art. 6(1) Forordning (EF) nr. 561/2006',
  },
  {
    id: 'weekly-driving',
    category: 'ukentlig-kjoring',
    title: 'Ukentlig kjøretid',
    mainRule: 'Maksimal ukentlig kjøretid er 56 timer.',
    maxValue: 56,
    unit: 'timer',
    exceptions: [],
    legalReference: 'Art. 6(2) Forordning (EF) nr. 561/2006',
  },
  {
    id: 'biweekly-driving',
    category: 'ukentlig-kjoring',
    title: 'Kjøretid over to uker',
    mainRule: 'Samlet kjøretid i to sammenhengende uker skal ikke overstige 90 timer.',
    maxValue: 90,
    unit: 'timer',
    exceptions: [],
    legalReference: 'Art. 6(3) Forordning (EF) nr. 561/2006',
  },
  {
    id: 'break-rule',
    category: 'pause',
    title: 'Pause',
    mainRule: 'Etter 4 timer og 30 minutter sammenhengende kjøring skal føreren ta en pause på minst 45 minutter.',
    maxValue: 45,
    unit: 'minutter',
    exceptions: [
      'Pausen kan deles i to: først minst 15 minutter, deretter minst 30 minutter. Rekkefølgen er fast – 15 minutters pause først, deretter 30 minutters pause.',
    ],
    legalReference: 'Art. 7 Forordning (EF) nr. 561/2006',
  },
  {
    id: 'daily-rest',
    category: 'daglig-hvile',
    title: 'Daglig hvile',
    mainRule: 'Innenfor hver periode på 24 timer skal føreren ha en sammenhengende hvileperiode på minst 11 timer.',
    maxValue: 11,
    unit: 'timer',
    exceptions: [
      'Kan reduseres til 9 timer (redusert daglig hvile) maksimalt tre ganger mellom to ukehviler.',
      'Kan deles i to perioder: først minst 3 timer, deretter minst 9 timer (totalt 12 timer).',
    ],
    legalReference: 'Art. 8(2) Forordning (EF) nr. 561/2006',
  },
  {
    id: 'weekly-rest',
    category: 'ukentlig-hvile',
    title: 'Ukentlig hvile',
    mainRule: 'Føreren skal ta en ukentlig hvileperiode på minst 45 sammenhengende timer.',
    maxValue: 45,
    unit: 'timer',
    exceptions: [
      'Kan reduseres til minst 24 timer annenhver uke (redusert ukehvile).',
      'Reduksjonen skal kompenseres med en tilsvarende sammenhengende hvileperiode før utløpet av den tredje uken etter den aktuelle uken.',
      'Kompensasjonen skal tas i sammenheng med en annen hvileperiode på minst 9 timer.',
    ],
    legalReference: 'Art. 8(6) Forordning (EF) nr. 561/2006',
  },
]

export const regulationCategories = [
  { id: 'daglig-kjoring' as const, label: 'Daglig kjøretid', icon: 'Car' },
  { id: 'ukentlig-kjoring' as const, label: 'Ukentlig kjøretid', icon: 'Calendar' },
  { id: 'pause' as const, label: 'Pause', icon: 'Coffee' },
  { id: 'daglig-hvile' as const, label: 'Daglig hvile', icon: 'Moon' },
  { id: 'ukentlig-hvile' as const, label: 'Ukentlig hvile', icon: 'BedDouble' },
]
