import type { LTPTyngdepunktInput, LTPTyngdepunktResult } from '../types/ltp-tyngdepunkt'

const FORER_VEKT = 75 // kg – standardvekt for fører

/**
 * Beregner Lastens Tyngdepunkt (LTP) for en lastebil.
 *
 * Formel: LTP = (Nyttelast foran × Akselavstand) / Total nyttelast
 *
 * LTP angir avstanden fra bakaksel (eller boggi midtpunkt) til der
 * tyngdepunktet til lasten bør være, for å utnytte kjøretøyets kapasitet optimalt.
 */
export function calculateLTPTyngdepunkt(input: LTPTyngdepunktInput): LTPTyngdepunktResult {
  const advarsler: string[] = []
  const forklaring: string[] = []

  // Legg til førervekt på foraksel
  const effektivEgenvektForan = input.egenvektForan + FORER_VEKT
  forklaring.push(
    `Egenvekt foran inkl. fører: ${input.egenvektForan} + ${FORER_VEKT} = ${effektivEgenvektForan} kg`
  )

  // Beregn nyttelast per aksel
  const nyttelastForan = input.tillattAksellastForan - effektivEgenvektForan
  const nyttelastBak = input.tillattAksellastBak - input.egenvektBak

  forklaring.push(
    `Nyttelast foran: ${input.tillattAksellastForan} − ${effektivEgenvektForan} = ${nyttelastForan} kg`
  )
  forklaring.push(
    `Nyttelast bak: ${input.tillattAksellastBak} − ${input.egenvektBak} = ${nyttelastBak} kg`
  )

  if (nyttelastForan < 0) {
    advarsler.push(
      `Egenvekt foran (${effektivEgenvektForan} kg) overskrider tillatt aksellast foran (${input.tillattAksellastForan} kg). Kontroller verdiene.`
    )
  }

  if (nyttelastBak < 0) {
    advarsler.push(
      `Egenvekt bak (${input.egenvektBak} kg) overskrider tillatt aksellast bak (${input.tillattAksellastBak} kg). Kontroller verdiene.`
    )
  }

  const totalNyttelast = nyttelastForan + nyttelastBak
  forklaring.push(
    `Total nyttelast: ${nyttelastForan} + ${nyttelastBak} = ${totalNyttelast} kg`
  )

  if (totalNyttelast <= 0) {
    advarsler.push('Total nyttelast er 0 eller negativ. Kan ikke beregne LTP.')
    return {
      ltp: 0,
      nyttelastForan,
      nyttelastBak,
      totalNyttelast,
      ltpProsent: 0,
      ltpFraLasteromBakkant: 0,
      forklaring,
      advarsler,
    }
  }

  // For 3-akslet (boggi): effektiv akselavstand er til midtpunktet av boggien
  let effektivAkselavstand = input.akselavstand
  if (input.antallAksler === '3-aksler' && input.boggiAvstand > 0) {
    const boggiMidtpunkt = input.boggiAvstand / 2
    effektivAkselavstand = input.akselavstand + boggiMidtpunkt
    forklaring.push(
      `Boggi midtpunkt: ${input.boggiAvstand} / 2 = ${boggiMidtpunkt} cm bak 1. bakaksel`
    )
    forklaring.push(
      `Effektiv akselavstand (til boggi midtpunkt): ${input.akselavstand} + ${boggiMidtpunkt} = ${effektivAkselavstand} cm`
    )
  }

  // LTP-formel
  const ltp = (nyttelastForan * effektivAkselavstand) / totalNyttelast
  forklaring.push(
    `LTP = (${nyttelastForan} × ${effektivAkselavstand}) / ${totalNyttelast} = ${ltp.toFixed(1)} cm`
  )
  forklaring.push(
    `Lastens tyngdepunkt bør være ${ltp.toFixed(0)} cm foran bakaksel${input.antallAksler === '3-aksler' ? ' (boggi midtpunkt)' : ''}`
  )

  const ltpProsent = (ltp / effektivAkselavstand) * 100

  // Beregn avstand fra bakre kant av lasterom til LTP
  const ltpFraLasteromBakkant = input.overhengBak + ltp

  if (ltpFraLasteromBakkant > input.lasteromLengde) {
    advarsler.push(
      `LTP (${ltpFraLasteromBakkant.toFixed(0)} cm fra bakkant) er utenfor lasterommet (${input.lasteromLengde} cm). Kontroller verdiene.`
    )
  }

  if (nyttelastForan > totalNyttelast * 0.6) {
    advarsler.push(
      'Uvanlig stor nyttelast på foraksel. Kontroller at egenvekt og aksellaster er riktig.'
    )
  }

  return {
    ltp: Math.round(ltp * 10) / 10,
    nyttelastForan,
    nyttelastBak,
    totalNyttelast,
    ltpProsent: Math.round(ltpProsent * 10) / 10,
    ltpFraLasteromBakkant: Math.round(ltpFraLasteromBakkant),
    forklaring,
    advarsler,
  }
}
