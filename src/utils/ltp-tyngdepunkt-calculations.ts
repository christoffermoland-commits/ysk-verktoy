import type { LTPTyngdepunktInput, LTPTyngdepunktResult } from '../types/ltp-tyngdepunkt'

const FORER_VEKT = 75 // kg – standardvekt for fører

/**
 * Beregner Lastens Tyngdepunkt (LTP).
 *
 * Formel: LTP = (Nyttelast foran × Akselavstand) / Total nyttelast
 *
 * LTP angir avstanden fra bakaksel (eller boggi midtpunkt) til der
 * tyngdepunktet til lasten bør være, for å utnytte kjøretøyets kapasitet optimalt.
 *
 * Støttede kjøretøytyper:
 * - Lastebil: 2, 3 (boggi), eller 4 aksler. Førervekt 75 kg legges til foraksel.
 * - Buss: 2 eller 3 aksler (boggi). Førervekt 75 kg legges til foraksel.
 * - Slepvogn: 2 eller 3 aksler. Ingen førervekt (tilhenger).
 *
 * Kilde: øvingsoppgaver.no (artikler om LTP for lastebil, buss og slep)
 */
export function calculateLTPTyngdepunkt(input: LTPTyngdepunktInput): LTPTyngdepunktResult {
  const advarsler: string[] = []
  const forklaring: string[] = []

  // Førervekt gjelder lastebil og buss, men IKKE slepvogn
  const harForer = input.vehicleType !== 'slepvogn'
  const forerVekt = harForer ? FORER_VEKT : 0

  let effektivEgenvektForan: number

  if (harForer) {
    effektivEgenvektForan = input.egenvektForan + forerVekt
    forklaring.push(
      `Egenvekt foran inkl. fører: ${input.egenvektForan} + ${forerVekt} = ${effektivEgenvektForan} kg`
    )
  } else {
    effektivEgenvektForan = input.egenvektForan
    forklaring.push(
      `Egenvekt foran: ${input.egenvektForan} kg (slepvogn – ingen førervekt)`
    )
  }

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

  // Beregn effektiv akselavstand (til midtpunktet av boggi for 3+ aksler bak)
  let effektivAkselavstand = input.akselavstand
  const harBoggi = input.antallAksler !== '2-aksler' && input.boggiAvstand > 0

  if (harBoggi) {
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

  const boggiLabel = harBoggi ? ' (boggi midtpunkt)' : ''
  const vehicleLabel =
    input.vehicleType === 'lastebil' ? 'lastebilen' :
    input.vehicleType === 'buss' ? 'bussen' : 'slepvognen'

  forklaring.push(
    `Lastens tyngdepunkt bør være ${ltp.toFixed(0)} cm foran bakaksel${boggiLabel} på ${vehicleLabel}`
  )

  const ltpProsent = (ltp / effektivAkselavstand) * 100

  // Beregn avstand fra bakre kant av lasterom til LTP
  const ltpFraLasteromBakkant = input.overhengBak + ltp

  if (input.lasteromLengde > 0 && ltpFraLasteromBakkant > input.lasteromLengde) {
    advarsler.push(
      `LTP (${ltpFraLasteromBakkant.toFixed(0)} cm fra bakkant) er utenfor lasterommet (${input.lasteromLengde} cm). Kontroller verdiene.`
    )
  }

  if (harForer && nyttelastForan > totalNyttelast * 0.6) {
    advarsler.push(
      'Uvanlig stor nyttelast på foraksel. Kontroller at egenvekt og aksellaster er riktig.'
    )
  }

  // Påminnelse om at LTP alene ikke er nok
  forklaring.push(
    `Husk: LTP er ikke hele svaret – sjekk også veigrensene (bruksklasse) for lovlig totalvekt.`
  )

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
