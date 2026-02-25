export type AxleConfig = '2-aksler' | '3-aksler'

export interface LTPTyngdepunktInput {
  /** Egenvekt på foraksel (kg) – fra vognkort eller veiing */
  egenvektForan: number
  /** Egenvekt på bakaksel/boggi (kg) – fra vognkort eller veiing */
  egenvektBak: number
  /** Tillatt aksellast foran (kg) – fra vognkort */
  tillattAksellastForan: number
  /** Tillatt aksellast bak/boggi (kg) – fra vognkort */
  tillattAksellastBak: number
  /** Akselavstand i cm – avstand mellom foraksel og bakaksel (eller 1. bakaksel) */
  akselavstand: number
  /** Antall aksler */
  antallAksler: AxleConfig
  /** Avstand mellom aksler i boggi (cm) – kun for 3-akslet */
  boggiAvstand: number
  /** Lengde på lasterommet i cm */
  lasteromLengde: number
  /** Avstand fra bakaksel (eller boggi midtpunkt) til bakre kant av lasterommet (cm) */
  overhengBak: number
}

export interface LTPTyngdepunktResult {
  /** LTP i cm målt fra bakaksel/boggi midtpunkt */
  ltp: number
  /** Nyttelast som kan lastes på foraksel (kg) */
  nyttelastForan: number
  /** Nyttelast som kan lastes på bakaksel/boggi (kg) */
  nyttelastBak: number
  /** Total nyttelast (kg) */
  totalNyttelast: number
  /** LTP som prosent av akselavstanden (fra bak) */
  ltpProsent: number
  /** Avstand fra bakre kant av lasterom til LTP (cm) */
  ltpFraLasteromBakkant: number
  /** Forklaring av beregningen */
  forklaring: string[]
  /** Eventuelle advarsler */
  advarsler: string[]
}
