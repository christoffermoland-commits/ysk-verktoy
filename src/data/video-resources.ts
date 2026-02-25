import type { VideoResource } from '../types/video'

export const videoResources: VideoResource[] = [
  {
    id: 'v1',
    title: 'Kjøre- og hviletidsbestemmelser forklart',
    description: 'Gjennomgang av de viktigste reglene for kjøre- og hviletid etter EU-forordning 561/2006.',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Kjøre- og hviletid',
    tags: ['kjøretid', 'hviletid', 'regelverk'],
  },
  {
    id: 'v2',
    title: 'Slik bruker du digital fartsskriver',
    description: 'Praktisk veiledning i bruk av digital fartsskriver, sjåførkort og utskrift av data.',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Kjøre- og hviletid',
    tags: ['fartsskriver', 'takograf', 'sjåførkort'],
  },
  {
    id: 'v3',
    title: 'Lastsikring på lastebil',
    description: 'Korrekt sikring av last med stropper, kjetting og annet utstyr. Beregning av sikringskraft.',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Lasting og sikring',
    tags: ['lastsikring', 'stropper', 'sikringskraft'],
  },
  {
    id: 'v4',
    title: 'Bremsesystemer på tunge kjøretøy',
    description: 'Forklaring av ABS, EBS, retarder og motorbremse. Hvordan de fungerer og når de brukes.',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Bremser',
    tags: ['abs', 'ebs', 'retarder', 'motorbremse'],
  },
  {
    id: 'v5',
    title: 'Vektberegning og bruksklasser',
    description: 'Forstå LTP, bruksklasser (BK10/BK8/BK6), aksellast og tillatt totalvekt.',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Vekt og regler',
    tags: ['ltp', 'bruksklasse', 'aksellast', 'totalvekt'],
  },
  {
    id: 'v6',
    title: 'ADR – Transport av farlig gods',
    description: 'Introduksjon til ADR-regelverket, faresedler, UN-nummer og krav til sjåfør og kjøretøy.',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'ADR / Farlig gods',
    tags: ['adr', 'farlig gods', 'fareseddel'],
  },
  {
    id: 'v7',
    title: 'Kopling av semitrailer',
    description: 'Steg-for-steg guide til sikker til- og frakopling av semitrailer. Kontrollpunkter og sikkerhet.',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Praktisk kjøring',
    tags: ['semitrailer', 'kopling', 'svingskive'],
  },
  {
    id: 'v8',
    title: 'Daglig kontroll av lastebil',
    description: 'Hva du skal sjekke før du kjører: dekk, lys, bremser, væskenivåer og mer.',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Sikkerhet',
    tags: ['daglig kontroll', 'sjekkliste', 'sikkerhet'],
  },
]

export const videoCategories = [
  'Kjøre- og hviletid',
  'Lasting og sikring',
  'Bremser',
  'Vekt og regler',
  'ADR / Farlig gods',
  'Praktisk kjøring',
  'Sikkerhet',
]
