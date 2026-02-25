export type VehicleType = 'lastebil-c' | 'semitrailer' | 'vogntog'

export type WeightClass = 'BK10' | 'BK8' | 'BK6'

export interface LastebilInput {
  egenvekt: number
  nyttelast: number
  tillattTotalvekt: number
  antallAksler: 2 | 3 | 4
}

export interface SemitrailerInput {
  trekkbilEgenvekt: number
  semitrailerEgenvekt: number
  koplingstrykk: number
  tillattTotalvektTrekkbil: number
  tillattTotalvektSemitrailer: number
  tillattTotalvektKombinasjon: number
}

export interface VogntogInput {
  lastebilTotalvekt: number
  tilhengerTotalvekt: number
  dVerdi: number
  tillattVogntogvekt: number
}

export interface LTPResult {
  totalVekt: number
  maxTillattVekt: number
  ledigKapasitet: number
  isLegal: boolean
  limitingFactor: string
  warnings: string[]
}
