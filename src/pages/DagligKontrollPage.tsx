import { useState, useMemo } from 'react'
import {
  ClipboardCheck,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
  Circle,
  FileText,
  MonitorCog,
  Droplets,
  Lightbulb,
  CircleDot,
  Gauge,
  Package,
  ClipboardList,
  List,
} from 'lucide-react'

/* ── Forenklet sjekkliste (hovedvisning) ── */

interface SimpleItem {
  id: string
  label: string
}

interface SimpleSection {
  id: string
  label: string
  icon: typeof FileText
  items: SimpleItem[]
}

const simpleSections: SimpleSection[] = [
  {
    id: 's-dok',
    label: 'Dokumenter',
    icon: FileText,
    items: [
      { id: 's-dok-1', label: 'Førerkort, vognkort og YSK-bevis er med' },
      { id: 's-dok-2', label: 'Fraktbrev og eventuelle ADR-dokumenter' },
    ],
  },
  {
    id: 's-kabin',
    label: 'Førerhus',
    icon: MonitorCog,
    items: [
      { id: 's-kab-1', label: 'Juster sete, ratt og speil' },
      { id: 's-kab-2', label: 'Test horn, vindusviskere og defroster' },
      { id: 's-kab-3', label: 'Sjekk varsellamper ved oppstart' },
      { id: 's-kab-4', label: 'Brannslukker og sikkerhetsutstyr tilgjengelig' },
    ],
  },
  {
    id: 's-motor',
    label: 'Motorrom',
    icon: Droplets,
    items: [
      { id: 's-mot-1', label: 'Sjekk væskenivåer (olje, kjølevæske, brems, servo)' },
      { id: 's-mot-2', label: 'Sjekk for lekkasjer under kjøretøyet' },
    ],
  },
  {
    id: 's-lys',
    label: 'Lys',
    icon: Lightbulb,
    items: [
      { id: 's-lys-1', label: 'Test alle lys (nær, fjern, bremse, blink, rygge)' },
      { id: 's-lys-2', label: 'Sjekk reflekser, markeringslys og skiltbelysning' },
    ],
  },
  {
    id: 's-hjul',
    label: 'Hjul og dekk',
    icon: CircleDot,
    items: [
      { id: 's-hj-1', label: 'Sjekk lufttrykk og mønsterdybde' },
      { id: 's-hj-2', label: 'Sjekk hjulmuttere, felger og fjæring' },
    ],
  },
  {
    id: 's-brems',
    label: 'Bremser',
    icon: Gauge,
    items: [
      { id: 's-br-1', label: 'Test bremser (fotbrems, parkering, retarder)' },
      { id: 's-br-2', label: 'Sjekk lufttrykk og gjør trykktaptest' },
    ],
  },
  {
    id: 's-last',
    label: 'Last og tilhenger',
    icon: Package,
    items: [
      { id: 's-la-1', label: 'Sjekk lastsikring og lastplassering' },
      { id: 's-la-2', label: 'Sjekk kopling, dører og lemmer' },
      { id: 's-la-3', label: 'Kontroller lys og bremser på tilhenger' },
    ],
  },
  {
    id: 's-avslutt',
    label: 'Avsluttende',
    icon: ClipboardList,
    items: [
      { id: 's-av-1', label: 'Sjåførkort i fartsskriver, riktig modus' },
      { id: 's-av-2', label: 'Kjør sakte frem – lytt etter unormale lyder' },
      { id: 's-av-3', label: 'Noter eventuelle avvik' },
    ],
  },
]

/* ── Detaljert sjekkliste (supplement) ── */

interface DetailItem {
  label: string
  detail: string
}

interface DetailSection {
  id: string
  label: string
  items: DetailItem[]
}

const detailSections: DetailSection[] = [
  {
    id: 'd-dok',
    label: 'Dokumentasjon',
    items: [
      { label: 'Førerkort og YSK-bevis', detail: 'Sjekk at gyldig førerkort og kode 95 (YSK) er med' },
      { label: 'Vognkort del 1', detail: 'Skal alltid ligge i kjøretøyet' },
      { label: 'Lastpapirer og fraktbrev', detail: 'Kontroller at fraktbrev stemmer med lasten' },
      { label: 'ADR-dokumenter', detail: 'Transportdokument, skriftlige instruksjoner og ADR-kompetansebevis (ved farlig gods)' },
      { label: 'Kontrollkort fartsskriver', detail: 'Dokumentasjon på siste periodiske kontroll' },
    ],
  },
  {
    id: 'd-kabin',
    label: 'Kabin og interiør',
    items: [
      { label: 'Sete, ratt og speil', detail: 'Juster sete, ratt og alle speil til riktig posisjon' },
      { label: 'Horn og vindusviskere', detail: 'Test at horn og vindusviskere med spylervæske fungerer' },
      { label: 'Defroster og speilvarme', detail: 'Sjekk at defroster og speilvarme virker (spesielt vinterstid)' },
      { label: 'Varsellamper ved oppstart', detail: 'Alle varsellamper skal tennes og slukkes ved normal oppstart' },
      { label: 'Ryggesystem og kamera', detail: 'Test ryggesensorer og -kamera der det er montert' },
      { label: 'Nødblink (varsellys)', detail: 'Sjekk at nødblink virker' },
      { label: 'Dører og nødutganger', detail: 'Alle dører og nødutganger skal fungere og ikke være blokkert' },
      { label: 'Brannslukker', detail: 'Kontroller at brannslukker er tilgjengelig og har gyldig dato' },
    ],
  },
  {
    id: 'd-motor',
    label: 'Motorrom og væsker',
    items: [
      { label: 'Motoroljenivå', detail: 'Sjekk med peilestav – skal være mellom min og maks' },
      { label: 'Kjølevæskenivå', detail: 'Sjekk nivå i ekspansjonsbeholderen (kun på kald motor)' },
      { label: 'Bremsevæskenivå', detail: 'Kontroller nivå i bremsevæskebeholderen' },
      { label: 'Servoolje', detail: 'Sjekk nivå i servostyringsbeholderen' },
      { label: 'Lekkasjesjekk', detail: 'Se under og rundt motoren etter olje-, vann- eller luftlekkasjer' },
      { label: 'Remmer og slanger', detail: 'Visuell sjekk av drivremmer, slanger og luftsystem for slitasje' },
      { label: 'Batteri og tilkoblinger', detail: 'Kontroller at batteripolene sitter godt og er uten korrosjon' },
    ],
  },
  {
    id: 'd-lys',
    label: 'Lys og reflekser',
    items: [
      { label: 'Nærlys og fjernlys', detail: 'Test begge og sjekk at lyktene er rene' },
      { label: 'Parklys og tåkelys', detail: 'Test foran og bak' },
      { label: 'Bremselys', detail: 'Be noen sjekke eller bruk refleksjon i vegg/vindu' },
      { label: 'Ryggelys', detail: 'Sjekk at ryggelys tennes ved revers' },
      { label: 'Blinklys / retningslys', detail: 'Test alle retningslys, også på tilhenger' },
      { label: 'Reflekser og markeringslys', detail: 'Kontroller at alle reflekser og markeringslys er hele og rene' },
      { label: 'Arbeidslys', detail: 'Test arbeidslys der det er montert' },
      { label: 'Skiltbelysning', detail: 'Sjekk at skiltplater er synlige og belyste' },
      { label: 'Lys på tilhenger', detail: 'Sjekk alle lys etter tilkobling (7/13-pin, ISO 7638)' },
    ],
  },
  {
    id: 'd-hjul',
    label: 'Hjul, dekk og fjæring',
    items: [
      { label: 'Mønsterdybde', detail: 'Min. 1,6 mm (sommer), 5 mm på styrende aksel (vinter). Mål med dybdemåler' },
      { label: 'Lufttrykk i dekk', detail: 'Sjekk mot anbefalt trykk i dørkarmen eller instruksjonsbok' },
      { label: 'Dekk- og felgskader', detail: 'Se etter kutt, bulker, sprekker i dekk og felger' },
      { label: 'Hjulmuttere / -bolter', detail: 'Visuell sjekk for løse eller manglende hjulmuttere (bruk momentindikator)' },
      { label: 'Luftbelger', detail: 'Sjekk luftbelger for sprekker og lekkasjer' },
      { label: 'Bladfjærer', detail: 'Kontroller for brukne blader og feilstilling' },
      { label: 'Nav og lagre', detail: 'Sjekk navcaps for oljelekkasje og unormal varme etter kjøring' },
    ],
  },
  {
    id: 'd-bremser',
    label: 'Bremser og luftsystem',
    items: [
      { label: 'Trykkoppbygging', detail: 'Start motoren og kontroller at lufttrykket bygger seg opp til driftstrykk' },
      { label: 'Lekkasjesjekk luftsystem', detail: 'Lytt etter luftlekkasjer på slanger, koplinger og ventiler' },
      { label: 'Fotbrems', detail: 'Test fotbremsen – pedalen skal ha fast motstand' },
      { label: 'Parkeringsbrems', detail: 'Test at parkeringsbremsen holder kjøretøyet på plass' },
      { label: 'Retarder / motorbremse', detail: 'Test retarder og motorbremse ved lav hastighet' },
      { label: 'Trykktaptest', detail: 'Med fullt trykk og motor av: trykket skal holde seg stabilt i minst 1 minutt' },
      { label: 'Brems på tilhenger', detail: 'Test at tilhengerens bremser virker, og at nødbremseventilen løser ut korrekt' },
    ],
  },
  {
    id: 'd-last',
    label: 'Last og påbygg',
    items: [
      { label: 'Påbygg og utstyr', detail: 'Sikring av kran, lift, tipp eller annet påmontert utstyr' },
      { label: 'Lastsikringsutstyr', detail: 'Kontroller stropper, kjettinger, strekkfisker og friksjonsmatter for skader' },
      { label: 'Lastplassering', detail: 'Lasten skal være jevnt fordelt og tyngdepunktet så lavt som mulig' },
      { label: 'Høyde og vekt', detail: 'Kontroller at total høyde og vekt er innenfor tillatte grenser for ruten' },
      { label: 'Temperaturkontroll', detail: 'Sjekk kjøleaggregat og temperaturregistrering ved temperaturregulert transport' },
      { label: 'Dører og lemmer', detail: 'Alle dører, lemmer og bakløft skal være forsvarlig lukket og sikret' },
    ],
  },
  {
    id: 'd-avslutt',
    label: 'Avsluttende kontroll',
    items: [
      { label: 'Fartsskriver', detail: 'Sjåførkort innstukket, riktig modus valgt (kjøring/annet arbeid)' },
      { label: 'Speil og kameraer', detail: 'Sjekk at alle speil og kameraer er rene og riktig innstilt' },
      { label: 'Avviksnotering', detail: 'Skriv ned eventuelle avvik i kjørebok eller bedriftens kontrollskjema' },
      { label: 'Funksjonstest', detail: 'Kjør sakte fremover – lytt etter unormale lyder eller vibrasjoner' },
    ],
  },
]

/* ── Komponent ── */

export default function DagligKontrollPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [showDetails, setShowDetails] = useState(false)
  const [openDetail, setOpenDetail] = useState<string | null>(null)

  const totalItems = useMemo(
    () => simpleSections.reduce((sum, s) => sum + s.items.length, 0),
    []
  )
  const totalChecked = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked]
  )
  const percentage = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0
  const allDone = totalChecked === totalItems

  function toggleItem(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function resetAll() {
    setChecked({})
  }

  function sectionCheckedCount(section: SimpleSection) {
    return section.items.filter((item) => checked[item.id]).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
          <ClipboardCheck className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Kontroll før kjøring</h1>
          <p className="text-sm text-text-secondary">Sjekkliste for kontroll av kjøretøy før kjøring</p>
        </div>
      </div>

      {/* Progress section */}
      <div className={`rounded-xl border p-4 transition-colors ${
        allDone
          ? 'bg-green-500/10 border-green-500/20'
          : 'bg-surface-secondary border-border-default'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {allDone ? (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            ) : (
              <ClipboardCheck className="w-5 h-5 text-amber-400" />
            )}
            <span className={`text-sm font-medium ${allDone ? 'text-green-400' : 'text-text-primary'}`}>
              {allDone
                ? 'Kontrollen er fullført!'
                : `${totalChecked} av ${totalItems} kontrollert`}
            </span>
          </div>
          {totalChecked > 0 && (
            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-text-muted hover:text-text-primary hover:bg-surface-tertiary transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Nullstill
            </button>
          )}
        </div>
        <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              allDone ? 'bg-green-500' : 'bg-amber-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-xs text-text-muted mt-1.5 text-right">{percentage}%</div>
      </div>

      {/* Simplified checklist */}
      <div className="space-y-3">
        {simpleSections.map((section) => {
          const Icon = section.icon
          const sectionDone = sectionCheckedCount(section) === section.items.length
          const sectionCount = sectionCheckedCount(section)

          return (
            <div key={section.id} className="bg-surface-secondary rounded-xl border border-border-default overflow-hidden">
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${sectionDone ? 'text-green-400' : 'text-amber-400'}`} />
                  <span className="text-sm font-medium text-text-secondary">{section.label}</span>
                </div>
                <span className={`text-xs ${sectionDone ? 'text-green-400' : 'text-text-muted'}`}>
                  {sectionCount}/{section.items.length}
                </span>
              </div>
              <div className="px-3 pb-2">
                {section.items.map((item) => {
                  const isChecked = !!checked[item.id]
                  return (
                    <button
                      key={item.id}
                      role="checkbox"
                      aria-checked={isChecked}
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex items-center gap-3 py-2.5 text-left hover:bg-surface-tertiary/30 rounded-lg px-1.5 transition-colors"
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-text-muted flex-shrink-0" />
                      )}
                      <span className={`text-sm ${isChecked ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                        {item.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Detailed list toggle */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full flex items-center justify-between bg-surface-secondary rounded-xl border border-border-default p-4 hover:bg-surface-tertiary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <List className="w-5 h-5 text-accent" />
          <div className="text-left">
            <span className="font-medium text-sm">Detaljert sjekkliste</span>
            <p className="text-xs text-text-muted">Fullstendig liste med forklaringer for hvert punkt</p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${showDetails ? 'rotate-180' : ''}`} />
      </button>

      {showDetails && (
        <div className="space-y-3">
          {detailSections.map((section) => {
            const isOpen = openDetail === section.id

            return (
              <div key={section.id} className="bg-surface-secondary rounded-xl border border-border-default overflow-hidden">
                <button
                  onClick={() => setOpenDetail(isOpen ? null : section.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-tertiary/50 transition-colors"
                >
                  <span className="font-medium text-sm">{section.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted">{section.items.length} punkt</span>
                    <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 border-t border-border-subtle space-y-3">
                    {section.items.map((item, i) => (
                      <div key={i} className="pt-3">
                        <h4 className="text-sm font-medium text-text-primary">{item.label}</h4>
                        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-text-muted text-center leading-relaxed">
        Sjekklisten er et læringsverktøy basert på generell praksis for daglig ettersyn.
        Følg alltid bedriftens egne kontrollrutiner og kjøretøyets instruksjonsbok.
      </p>
    </div>
  )
}
