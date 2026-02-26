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
} from 'lucide-react'

interface CheckItem {
  id: string
  label: string
  detail?: string
}

interface CheckSection {
  id: string
  label: string
  icon: typeof FileText
  items: CheckItem[]
}

const checkSections: CheckSection[] = [
  {
    id: 'dokumentasjon',
    label: 'Dokumentasjon',
    icon: FileText,
    items: [
      { id: 'dok-forerkort', label: 'Førerkort og YSK-bevis', detail: 'Sjekk at gyldig førerkort og kode 95 (YSK) er med' },
      { id: 'dok-vognkort', label: 'Vognkort del 1', detail: 'Skal alltid ligge i kjøretøyet' },
      { id: 'dok-fraktbrev', label: 'Lastpapirer og fraktbrev', detail: 'Kontroller at fraktbrev stemmer med lasten' },
      { id: 'dok-adr', label: 'ADR-dokumenter (ved farlig gods)', detail: 'Transportdokument, skriftlige instruksjoner og sjåførens ADR-kompetansebevis' },
      { id: 'dok-kontrollkort', label: 'Kontrollkort for fartsskriver', detail: 'Dokumentasjon på siste periodiske kontroll' },
    ],
  },
  {
    id: 'kabin',
    label: 'Kabin og interiør',
    icon: MonitorCog,
    items: [
      { id: 'kab-sete', label: 'Sete, ratt og speil', detail: 'Juster sete, ratt og alle speil til riktig posisjon' },
      { id: 'kab-horn', label: 'Horn og vindusviskere', detail: 'Test at horn og vindusviskere med spylervæske fungerer' },
      { id: 'kab-defroster', label: 'Defroster og speilvarme', detail: 'Sjekk at defroster og speilvarme virker (spesielt vinterstid)' },
      { id: 'kab-varsel', label: 'Varsellamper ved oppstart', detail: 'Alle varsellamper skal tennes og slukkes ved normal oppstart' },
      { id: 'kab-rygging', label: 'Ryggesystem og kamera', detail: 'Test ryggesensorer og -kamera der det er montert' },
      { id: 'kab-nodblink', label: 'Nødblink (varsellys)', detail: 'Sjekk at nødblink virker' },
      { id: 'kab-dorer', label: 'Dører og nødutganger', detail: 'Alle dører og nødutganger skal fungere og ikke være blokkert' },
      { id: 'kab-brannslukker', label: 'Brannslukker', detail: 'Kontroller at brannslukker er tilgjengelig og har gyldig dato' },
    ],
  },
  {
    id: 'motor',
    label: 'Motorrom og væsker',
    icon: Droplets,
    items: [
      { id: 'mot-olje', label: 'Motoroljenivå', detail: 'Sjekk med peilestav – skal være mellom min og maks' },
      { id: 'mot-kjolevaeske', label: 'Kjølevæskenivå', detail: 'Sjekk nivå i ekspansjonsbeholderen (kun på kald motor)' },
      { id: 'mot-bremsevaeske', label: 'Bremsevæskenivå', detail: 'Kontroller nivå i bremsevæskebeholderen' },
      { id: 'mot-servo', label: 'Servoolje', detail: 'Sjekk nivå i servostyringsbeholderen' },
      { id: 'mot-lekkasje', label: 'Lekkasjesjekk', detail: 'Se under og rundt motoren etter olje-, vann- eller luftlekkasjer' },
      { id: 'mot-remmer', label: 'Remmer og slanger', detail: 'Visuell sjekk av drivremmer, slanger og luftsystem for slitasje' },
      { id: 'mot-batteri', label: 'Batteri og tilkoblinger', detail: 'Kontroller at batteripolene sitter godt og er uten korrosjon' },
    ],
  },
  {
    id: 'lys',
    label: 'Lys og reflekser',
    icon: Lightbulb,
    items: [
      { id: 'lys-naer', label: 'Nærlys og fjernlys', detail: 'Test begge og sjekk at lyktene er rene' },
      { id: 'lys-park', label: 'Parklys og tåkelys', detail: 'Test foran og bak' },
      { id: 'lys-brems', label: 'Bremselys', detail: 'Be noen sjekke eller bruk refleksjon i vegg/vindu' },
      { id: 'lys-rygge', label: 'Ryggelys', detail: 'Sjekk at ryggelys tennes ved revers' },
      { id: 'lys-blink', label: 'Blinklys / retningslys', detail: 'Test alle retningslys, også på tilhenger' },
      { id: 'lys-refleks', label: 'Reflekser og markeringslys', detail: 'Kontroller at alle reflekser og markeringslys er hele og rene' },
      { id: 'lys-arbeid', label: 'Arbeidslys', detail: 'Test arbeidslys der det er montert' },
      { id: 'lys-skilt', label: 'Skiltbelysning', detail: 'Sjekk at skiltplater er synlige og belyste' },
      { id: 'lys-henger', label: 'Lys på tilhenger', detail: 'Sjekk alle lys etter tilkobling (7/13-pin, ISO 7638)' },
    ],
  },
  {
    id: 'hjul',
    label: 'Hjul, dekk og fjæring',
    icon: CircleDot,
    items: [
      { id: 'hj-monster', label: 'Mønsterdybde', detail: 'Min. 1,6 mm (sommer), 5 mm på styrende aksel (vinter). Mål med dybdemåler' },
      { id: 'hj-trykk', label: 'Lufttrykk i dekk', detail: 'Sjekk mot anbefalt trykk i dørkarmen eller instruksjonsbok' },
      { id: 'hj-skader', label: 'Dekk- og felgskader', detail: 'Se etter kutt, bulker, sprekker i dekk og felger' },
      { id: 'hj-muttere', label: 'Hjulmuttere / -bolter', detail: 'Visuell sjekk for løse eller manglende hjulmuttere (bruk momentindikator)' },
      { id: 'hj-luft', label: 'Luftbelger', detail: 'Sjekk luftbelger for sprekker og lekkasjer' },
      { id: 'hj-blad', label: 'Bladfjærer', detail: 'Kontroller for brukne blader og feilstilling' },
      { id: 'hj-nav', label: 'Nav og lagre', detail: 'Sjekk navcaps for oljelekkasje og unormal varme etter kjøring' },
    ],
  },
  {
    id: 'bremser',
    label: 'Bremser og luftsystem',
    icon: Gauge,
    items: [
      { id: 'br-trykk', label: 'Trykkoppbygging', detail: 'Start motoren og kontroller at lufttrykket bygger seg opp til driftstrykk' },
      { id: 'br-lekkasje', label: 'Lekkasjesjekk luftsystem', detail: 'Lytt etter luftlekkasjer på slanger, koplinger og ventiler' },
      { id: 'br-fotbrems', label: 'Fotbrems', detail: 'Test fotbremsen – pedalen skal ha fast motstand' },
      { id: 'br-parkering', label: 'Parkeringsbrems', detail: 'Test at parkeringsbremsen holder kjøretøyet på plass' },
      { id: 'br-retarder', label: 'Retarder / motorbremse', detail: 'Test retarder og motorbremse ved lav hastighet' },
      { id: 'br-trykktap', label: 'Trykktaptest', detail: 'Med fullt trykk og motor av: trykket skal holde seg stabilt i minst 1 minutt' },
      { id: 'br-henger', label: 'Brems på tilhenger', detail: 'Test at tilhengerens bremser virker, og at nødbremseventilen løser ut korrekt' },
    ],
  },
  {
    id: 'last',
    label: 'Last og påbygg',
    icon: Package,
    items: [
      { id: 'la-pabygg', label: 'Påbygg og utstyr', detail: 'Sikring av kran, lift, tipp eller annet påmontert utstyr' },
      { id: 'la-sikring', label: 'Lastsikringsutstyr', detail: 'Kontroller stropper, kjettinger, strekkfisker og friksjonsmatter for skader' },
      { id: 'la-plassering', label: 'Lastplassering', detail: 'Lasten skal være jevnt fordelt og tyngdepunktet så lavt som mulig' },
      { id: 'la-hoyde', label: 'Høyde og vekt', detail: 'Kontroller at total høyde og vekt er innenfor tillatte grenser for ruten' },
      { id: 'la-temp', label: 'Temperaturkontroll (kjøl/frys)', detail: 'Sjekk kjøleaggregat og temperaturregistrering ved temperaturregulert transport' },
      { id: 'la-dorer', label: 'Dører og lemmer', detail: 'Alle dører, lemmer og bakløft skal være forsvarlig lukket og sikret' },
    ],
  },
  {
    id: 'avsluttende',
    label: 'Avsluttende kontroll',
    icon: ClipboardList,
    items: [
      { id: 'av-fartsskriver', label: 'Fartsskriver', detail: 'Sjåførkort innstukket, riktig modus valgt (kjøring/annet arbeid)' },
      { id: 'av-speil', label: 'Speil og kameraer', detail: 'Sjekk at alle speil og kameraer er rene og riktig innstilt' },
      { id: 'av-avvik', label: 'Avviksnotering', detail: 'Skriv ned eventuelle avvik i kjørebok eller bedriftens kontrollskjema' },
      { id: 'av-test', label: 'Funksjonstest', detail: 'Kjør sakte fremover – lytt etter unormale lyder eller vibrasjoner' },
    ],
  },
]

export default function DagligKontrollPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [openSection, setOpenSection] = useState<string | null>('dokumentasjon')

  const totalItems = useMemo(
    () => checkSections.reduce((sum, s) => sum + s.items.length, 0),
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

  function sectionCheckedCount(section: CheckSection) {
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

      {/* Checklist accordion sections */}
      <div className="space-y-3">
        {checkSections.map((section) => {
          const Icon = section.icon
          const isOpen = openSection === section.id
          const sectionDone = sectionCheckedCount(section) === section.items.length
          const sectionCount = sectionCheckedCount(section)

          return (
            <div key={section.id} className="bg-surface-secondary rounded-xl border border-border-default overflow-hidden">
              <button
                onClick={() => setOpenSection(isOpen ? null : section.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-tertiary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${sectionDone ? 'text-green-400' : 'text-amber-400'}`} />
                  <span className="font-medium">{section.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${sectionDone ? 'text-green-400' : 'text-text-muted'}`}>
                    {sectionCount}/{section.items.length}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-3 border-t border-border-subtle">
                  {section.items.map((item) => {
                    const isChecked = !!checked[item.id]
                    return (
                      <button
                        key={item.id}
                        role="checkbox"
                        aria-checked={isChecked}
                        onClick={() => toggleItem(item.id)}
                        className="w-full flex items-start gap-3 py-3 text-left hover:bg-surface-tertiary/30 rounded-lg px-1 transition-colors"
                      >
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <span className={`text-sm font-medium ${isChecked ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                            {item.label}
                          </span>
                          {item.detail && (
                            <p className={`text-xs mt-0.5 leading-relaxed ${isChecked ? 'text-text-muted/60' : 'text-text-secondary'}`}>
                              {item.detail}
                            </p>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-text-muted text-center leading-relaxed">
        Sjekklisten er et læringsverktøy basert på generell praksis for daglig ettersyn.
        Følg alltid bedriftens egne kontrollrutiner og kjøretøyets instruksjonsbok.
      </p>
    </div>
  )
}
