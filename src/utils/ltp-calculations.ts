import type { LastebilInput, SemitrailerInput, VogntogInput, WeightClass, LTPResult } from '../types/ltp'
import { WEIGHT_CLASS_LIMITS, AXLE_COUNT_LIMITS } from '../data/ltp-constants'

export function calculateLastebilC(input: LastebilInput, weightClass: WeightClass): LTPResult {
  const limits = WEIGHT_CLASS_LIMITS[weightClass]
  const axleLimits = AXLE_COUNT_LIMITS[weightClass]

  const totalVekt = input.egenvekt + input.nyttelast
  const maxFromVognkort = input.tillattTotalvekt
  const maxFromBK = axleLimits[input.antallAksler] ?? axleLimits[2]
  const maxTillattVekt = Math.min(maxFromVognkort, maxFromBK)

  const warnings: string[] = []
  let limitingFactor = ''

  if (maxFromVognkort < maxFromBK) {
    limitingFactor = `Begrenset av vognkortets tillatte totalvekt (${maxFromVognkort} kg)`
  } else {
    limitingFactor = `Begrenset av bruksklasse ${weightClass} for ${input.antallAksler}-akslet kjøretøy (${maxFromBK} kg)`
  }

  const maxAxleLoad = limits.singleAxle
  const avgAxleLoad = totalVekt / input.antallAksler
  if (avgAxleLoad > maxAxleLoad * 0.9) {
    warnings.push(`Gjennomsnittlig aksellast (${Math.round(avgAxleLoad)} kg) nærmer seg grensen på ${maxAxleLoad} kg per aksel`)
  }

  if (totalVekt > maxTillattVekt * 0.95 && totalVekt <= maxTillattVekt) {
    warnings.push('Nær maksimal tillatt totalvekt')
  }

  return {
    totalVekt,
    maxTillattVekt,
    ledigKapasitet: Math.max(0, maxTillattVekt - totalVekt),
    isLegal: totalVekt <= maxTillattVekt,
    limitingFactor,
    warnings,
  }
}

export function calculateSemitrailer(input: SemitrailerInput, weightClass: WeightClass): LTPResult {
  const limits = WEIGHT_CLASS_LIMITS[weightClass]

  const totalVekt = input.trekkbilEgenvekt + input.semitrailerEgenvekt
  const maxFromVognkort = input.tillattTotalvektKombinasjon
  const maxFromBK = limits.maxTotalSemitrailer
  const maxTillattVekt = Math.min(maxFromVognkort, maxFromBK)

  const warnings: string[] = []
  let limitingFactor = ''

  if (maxFromVognkort < maxFromBK) {
    limitingFactor = `Begrenset av vognkortets tillatte totalvekt for kombinasjonen (${maxFromVognkort} kg)`
  } else {
    limitingFactor = `Begrenset av bruksklasse ${weightClass} for semitrailer (${maxFromBK} kg)`
  }

  const trekkbilTotal = input.trekkbilEgenvekt + input.koplingstrykk
  if (trekkbilTotal > input.tillattTotalvektTrekkbil) {
    warnings.push(`Trekkbilens totalvekt med koplingstrykk (${trekkbilTotal} kg) overskrider tillatt totalvekt (${input.tillattTotalvektTrekkbil} kg)`)
  }

  if (totalVekt > maxTillattVekt * 0.95 && totalVekt <= maxTillattVekt) {
    warnings.push('Nær maksimal tillatt totalvekt')
  }

  return {
    totalVekt,
    maxTillattVekt,
    ledigKapasitet: Math.max(0, maxTillattVekt - totalVekt),
    isLegal: totalVekt <= maxTillattVekt && trekkbilTotal <= input.tillattTotalvektTrekkbil,
    limitingFactor,
    warnings,
  }
}

export function calculateVogntog(input: VogntogInput, weightClass: WeightClass): LTPResult {
  const limits = WEIGHT_CLASS_LIMITS[weightClass]

  const totalVekt = input.lastebilTotalvekt + input.tilhengerTotalvekt
  const maxFromVognkort = input.tillattVogntogvekt
  const maxFromBK = limits.maxTotalVogntog
  const maxTillattVekt = Math.min(maxFromVognkort, maxFromBK)

  const warnings: string[] = []
  let limitingFactor = ''

  if (maxFromVognkort < maxFromBK) {
    limitingFactor = `Begrenset av vognkortets tillatte vogntogvekt (${maxFromVognkort} kg)`
  } else {
    limitingFactor = `Begrenset av bruksklasse ${weightClass} for vogntog (${maxFromBK} kg)`
  }

  // D-verdi sjekk: D >= (T × R × g) / (T + R)
  const T = input.lastebilTotalvekt
  const R = input.tilhengerTotalvekt
  const g = 9.81
  const requiredDVerdi = (T * R * g) / ((T + R) * 1000) // kN
  const dVerdiOk = input.dVerdi >= requiredDVerdi

  if (!dVerdiOk) {
    warnings.push(`D-verdien (${input.dVerdi} kN) er for lav. Påkrevd minst ${requiredDVerdi.toFixed(1)} kN for denne kombinasjonen.`)
  }

  if (totalVekt > maxTillattVekt * 0.95 && totalVekt <= maxTillattVekt) {
    warnings.push('Nær maksimal tillatt totalvekt')
  }

  return {
    totalVekt,
    maxTillattVekt,
    ledigKapasitet: Math.max(0, maxTillattVekt - totalVekt),
    isLegal: totalVekt <= maxTillattVekt && dVerdiOk,
    limitingFactor,
    warnings,
  }
}
