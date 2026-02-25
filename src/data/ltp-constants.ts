import type { WeightClass } from '../types/ltp'

export const WEIGHT_CLASS_LIMITS: Record<WeightClass, {
  singleAxle: number
  tandemBogie: number
  tripleBogie: number
  maxTotalSemitrailer: number
  maxTotalVogntog: number
}> = {
  BK10: {
    singleAxle: 10000,
    tandemBogie: 19000,
    tripleBogie: 24000,
    maxTotalSemitrailer: 50000,
    maxTotalVogntog: 50000,
  },
  BK8: {
    singleAxle: 8000,
    tandemBogie: 12500,
    tripleBogie: 18000,
    maxTotalSemitrailer: 39000,
    maxTotalVogntog: 40000,
  },
  BK6: {
    singleAxle: 6000,
    tandemBogie: 10000,
    tripleBogie: 12000,
    maxTotalSemitrailer: 28000,
    maxTotalVogntog: 32000,
  },
}

export const AXLE_COUNT_LIMITS: Record<WeightClass, Record<number, number>> = {
  BK10: { 2: 19500, 3: 26000, 4: 32000 },
  BK8:  { 2: 16000, 3: 22000, 4: 27000 },
  BK6:  { 2: 12000, 3: 18000, 4: 22000 },
}

export const WEIGHT_CLASS_INFO: Record<WeightClass, { label: string; description: string }> = {
  BK10: {
    label: 'BK10',
    description: 'Riksveier og de fleste fylkesveier. Tillater 10 tonn aksellast.',
  },
  BK8: {
    label: 'BK8',
    description: 'Noen fylkesveier og kommunale veier. Tillater 8 tonn aksellast.',
  },
  BK6: {
    label: 'BK6',
    description: 'Svakere veier med begrenset bæreevne. Tillater 6 tonn aksellast.',
  },
}

export const VEHICLE_TYPE_INFO = {
  'lastebil-c': {
    label: 'Lastebil (C)',
    description: 'Solo lastebil med totalvekt over 3500 kg',
  },
  semitrailer: {
    label: 'Semitrailer',
    description: 'Trekkbil med semitrailer (leddkombinasjon)',
  },
  vogntog: {
    label: 'Vogntog',
    description: 'Lastebil med tilhenger (CE)',
  },
} as const
