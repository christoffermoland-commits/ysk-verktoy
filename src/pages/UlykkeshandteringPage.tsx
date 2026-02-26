import { useState } from 'react'
import {
  ShieldAlert,
  ChevronDown,
  Phone,
  Shield,
  Heart,
  AlertTriangle,
  Brain,
  FileText,
} from 'lucide-react'

const quickStats = [
  { label: 'Medisinsk nødhjelp', value: '113', sub: 'AMK' },
  { label: 'Politi', value: '112', sub: '' },
  { label: 'Brannvesen', value: '110', sub: '' },
  { label: 'Hovedprinsipp', value: 'S–V–H', sub: 'Sikre · Varsle · Hjelpe' },
  { label: 'Varseltrekant', value: '150 m', sub: 'foran ulykken (motorvei)' },
  { label: 'HLR-takt', value: '30:2', sub: 'kompresjoner : innblåsninger' },
]

interface Step {
  title: string
  description: string
}

interface Section {
  id: string
  label: string
  icon: typeof Shield
  steps: Step[]
}

const sections: Section[] = [
  {
    id: 'sikre',
    label: '1. Sikre ulykkesstedet',
    icon: Shield,
    steps: [
      {
        title: 'Sett på varselblink',
        description: 'Aktiver varsellys (nødblink) umiddelbart. Parker trygt utenfor veibanen, helst etter ulykkesstedet slik at du ikke sperrer for utrykningskjøretøy.',
      },
      {
        title: 'Ta på refleksvest',
        description: 'Før du forlater kjøretøyet, ta på refleksvest. Dette er påbudt i mange land og gjør deg godt synlig for annen trafikk.',
      },
      {
        title: 'Plasser varseltrekant',
        description: 'Sett ut varseltrekant minst 150 meter før ulykkesstedet på motorvei, 50–100 meter på vanlig vei. Hold trekanten foran deg mens du går for å være synlig.',
      },
      {
        title: 'Sikre trafikken',
        description: 'Stans annen trafikk om nødvendig. Sørg for at ingen nye ulykker oppstår. Slå av tenningen i involverte kjøretøy hvis det er trygt.',
      },
      {
        title: 'Vurder brann-/eksplosjonsfare',
        description: 'Se etter lekkasje av drivstoff, røykutvikling eller ADR-skilt på involverte kjøretøy. Ved fare for brann eller eksplosjon: evakuer alle fra området.',
      },
    ],
  },
  {
    id: 'varsle',
    label: '2. Varsle nødetatene',
    icon: Phone,
    steps: [
      {
        title: 'Ring 113 (AMK) ved personskade',
        description: 'Medisinsk nødtelefon. Ring ved alvorlige skader, bevisstløshet, pusteproblemer eller store blødninger. AMK sender ambulanse og kan veilede deg i førstehjelp.',
      },
      {
        title: 'Ring 112 (Politi) ved trafikkuhell',
        description: 'Politiet skal varsles ved alle trafikkulykker med personskade, og ved materielle skader der partene ikke blir enige eller det er mistanke om ruspåvirkning.',
      },
      {
        title: 'Ring 110 (Brann) ved brannfare',
        description: 'Ved brann, brannfare, fastklemte personer eller lekkasje av farlige stoffer. Brannvesenet har frigjøringsutstyr og kan håndtere kjemikalieuhell.',
      },
      {
        title: 'Gi tydelig informasjon',
        description: 'Oppgi: Hvem du er og telefonnummeret ditt. Hva som har skjedd (type ulykke). Hvor det har skjedd (veinavn, retning, kilometermerke). Hvor mange som er skadet og alvorlighetsgrad. Eventuelle farer (brann, farlig gods, strømledninger).',
      },
      {
        title: 'Last ned Hjelp 113-appen',
        description: 'Appen sender automatisk GPS-posisjon til nødsentral, og kan dele video med AMK slik at de ser omfanget av ulykken i sanntid.',
      },
    ],
  },
  {
    id: 'hjelpe',
    label: '3. Hjelpe de skadede',
    icon: Heart,
    steps: [
      {
        title: 'Kontakt med den skadede',
        description: 'Snakk til personen. Spør «Hører du meg?» og rist forsiktig i skuldrene. Respons betyr at personen er ved bevissthet – berolige og hold vedkommende i ro.',
      },
      {
        title: 'Sjekk frie luftveier',
        description: 'Bøy hodet forsiktig bakover og løft haken frem. Sjekk om personen puster ved å legge kinnet over munnen og lytte/kjenne etter pust i opptil 10 sekunder.',
      },
      {
        title: 'Bevisstløs som puster → Sideleie',
        description: 'Legg personen i stabilt sideleie. Sørg for at luftveiene forblir frie. Overvåk pust og puls kontinuerlig til ambulanse ankommer.',
      },
      {
        title: 'Bevisstløs uten pust → HLR',
        description: 'Start hjerte-lunge-redning umiddelbart: 30 brystkompresjoner (5–6 cm dybde, 100–120 per minutt) etterfulgt av 2 innblåsninger. Fortsett til ambulanse ankommer eller personen begynner å puste.',
      },
      {
        title: 'Stanse blødninger',
        description: 'Legg direkte trykk på såret med kompress eller rent tøystykke. Hold skadet kroppsdel høyt. Legg trykkbandasje over kompressen. Ved mistanke om indre blødning: legg personen flatt og gi ikke mat eller drikke.',
      },
      {
        title: 'Deleger oppgaver',
        description: 'Er det flere tilstede: fordel oppgavene. Én gir førstehjelp, én ringer nødetat, én dirigerer trafikk, én møter ambulansen. Jo raskere du organiserer, jo bedre hjelp gis.',
      },
    ],
  },
  {
    id: 'adr',
    label: '4. ADR og farlig gods',
    icon: AlertTriangle,
    steps: [
      {
        title: 'Se etter ADR-skilt og faresedler',
        description: 'Oransje varseltavle på kjøretøyet angir farlig gods. Diamantformede faresedler viser fareklassen. Ikke gå nær kjøretøyet før du har vurdert faren.',
      },
      {
        title: 'Hold avstand',
        description: 'Ved lekkasje eller ukjent fare: hold minimum 100 meter avstand og evakuer personer. Stå oppstrøms (mot vinden). Sperr av området.',
      },
      {
        title: 'Sjekk sikkerhetsdatablad',
        description: 'Sjåføren skal ha med skriftlige instruksjoner (ADR-kortet) som beskriver stoffet og tiltak ved uhell. Finn dette i førerhuset hvis det er trygt.',
      },
      {
        title: 'Varsle brannvesenet (110)',
        description: 'Brannvesenet har spesialutstyr for kjemikalieuhell. Oppgi UN-nummeret fra den oransje tavlen hvis mulig – det identifiserer stoffet.',
      },
    ],
  },
  {
    id: 'psykisk',
    label: '5. Psykisk førstehjelp',
    icon: Brain,
    steps: [
      {
        title: 'Vær rolig og tilstede',
        description: 'Snakk med rolig stemme. Fortell hva du gjør og at hjelp er på vei. Fysisk berøring (hold i hånden) kan berolige.',
      },
      {
        title: 'Beskytt mot inntrykk',
        description: 'Skjerm skadede fra synet av andre skadede og fra nysgjerrige tilskuere. Bruk om mulig teppe eller presenning som avskjerming.',
      },
      {
        title: 'Hold tilskuere unna',
        description: 'Be nysgjerrige om å trekke seg tilbake. Filming av skadede er ulovlig uten samtykke. Gi tilskuere praktiske oppgaver for å avlede oppmerksomheten.',
      },
      {
        title: 'Ta vare på deg selv etterpå',
        description: 'Det er normalt å bli preget av sterke inntrykk. Snakk med noen du stoler på. Kontakt bedriftshelsetjenesten eller fastlegen om du sliter i etterkant.',
      },
    ],
  },
  {
    id: 'dokumentasjon',
    label: '6. Dokumentasjon og etterarbeid',
    icon: FileText,
    steps: [
      {
        title: 'Ta bilder av ulykkesstedet',
        description: 'Dokumenter skader på kjøretøy, veibane, skilt og spor. Ta bilder fra flere vinkler. Dette er viktig for forsikringssaker og politietterforskning.',
      },
      {
        title: 'Noter ned hendelsesforløpet',
        description: 'Skriv ned hva som skjedde, tidspunkter, vitner og kontaktinfo så snart som mulig mens detaljene er ferske.',
      },
      {
        title: 'Varsle arbeidsgiver',
        description: 'Som yrkessjåfør skal du varsle arbeidsgiver snarest. Arbeidsulykker og nestenulykker skal rapporteres i bedriftens HMS-system.',
      },
      {
        title: 'Debriefing',
        description: 'Etter alvorlige hendelser bør det gjennomføres en debriefing (defusing/debriefing) med kollegaer og eventuelt bedriftshelsetjenesten.',
      },
    ],
  },
]

function StepItem({ step, index }: { step: Step; index: number }) {
  return (
    <div className="flex gap-3 pt-3">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center">
        <span className="text-xs font-bold text-accent">{index + 1}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-text-primary">{step.title}</h4>
        <p className="text-sm text-text-secondary mt-0.5 leading-relaxed">{step.description}</p>
      </div>
    </div>
  )
}

export default function UlykkeshandteringPage() {
  const [openSection, setOpenSection] = useState<string | null>('sikre')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-red-500/15 flex items-center justify-center">
          <ShieldAlert className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Ulykkeshåndtering</h1>
          <p className="text-sm text-text-secondary">Førstemann til skadested – steg for steg</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {quickStats.map((s) => (
          <div key={s.label} className="bg-surface-secondary rounded-xl border border-border-default p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{s.value}</div>
            <div className="text-xs text-text-secondary mt-1">{s.label}</div>
            {s.sub && <div className="text-xs text-text-muted">{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* Important callout */}
      <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
        <Heart className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-medium text-red-400">Husk</div>
          <div className="text-sm text-text-secondary">
            Det eneste du kan gjøre feil er å ikke gjøre noe. All hjelp er bedre enn ingen hjelp.
          </div>
        </div>
      </div>

      {/* Accordion sections */}
      <div className="space-y-3">
        {sections.map((section) => {
          const Icon = section.icon
          const isOpen = openSection === section.id

          return (
            <div key={section.id} className="bg-surface-secondary rounded-xl border border-border-default overflow-hidden">
              <button
                onClick={() => setOpenSection(isOpen ? null : section.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-tertiary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-red-400" />
                  <span className="font-medium">{section.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-muted">{section.steps.length} steg</span>
                  <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-1 border-t border-border-subtle">
                  {section.steps.map((step, i) => (
                    <StepItem key={i} step={step} index={i} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Visual S-V-H flow */}
      <div className="bg-surface-secondary rounded-xl border border-border-default p-6">
        <h2 className="font-semibold mb-4">Oppsummering: Sikre → Varsle → Hjelpe</h2>
        <div className="space-y-2">
          <FlowStep number={1} color="bg-amber-500" label="Sikre" description="Varseltrekant, refleksvest, sikre trafikken" />
          <FlowStep number={2} color="bg-blue-500" label="Varsle" description="Ring 113 / 112 / 110 – gi tydelig info" />
          <FlowStep number={3} color="bg-red-500" label="Hjelpe" description="Sjekk bevissthet → luftveier → sideleie / HLR" />
        </div>
        <p className="text-xs text-text-muted mt-4">
          Denne sjekklisten er et læringsverktøy og erstatter ikke offisiell opplæring i førstehjelp.
        </p>
      </div>
    </div>
  )
}

function FlowStep({ number, color, label, description }: { number: number; color: string; label: string; description: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
        <span className="text-sm font-bold text-white">{number}</span>
      </div>
      <div className="flex-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-text-muted ml-2">– {description}</span>
      </div>
    </div>
  )
}
