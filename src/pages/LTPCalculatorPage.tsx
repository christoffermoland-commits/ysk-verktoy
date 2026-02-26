import { useState } from 'react'
import { Crosshair, Calculator, Info, AlertTriangle, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'
import type { AxleConfig, LTPVehicleType, LTPTyngdepunktInput } from '../types/ltp-tyngdepunkt'
import { calculateLTPTyngdepunkt } from '../utils/ltp-tyngdepunkt-calculations'
import LTPVehicleDiagram from '../components/ltp-tyngdepunkt/LTPTruckDiagram'

const inputClass =
  'w-full px-3 py-2.5 bg-surface-tertiary border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500'

interface VehicleOption {
  type: LTPVehicleType
  emoji: string
  label: string
  description: string
  axleConfigs: { value: AxleConfig; label: string }[]
}

const vehicleOptions: VehicleOption[] = [
  {
    type: 'lastebil',
    emoji: '🚛',
    label: 'Lastebil',
    description: 'Solo lastebil klasse C – 2, 3 eller 4 aksler',
    axleConfigs: [
      { value: '2-aksler', label: '2 aksler' },
      { value: '3-aksler', label: '3 aksler (boggi)' },
      { value: '4-aksler', label: '4 aksler' },
    ],
  },
  {
    type: 'buss',
    emoji: '🚌',
    label: 'Buss',
    description: 'Buss klasse D – 2 eller 3 aksler',
    axleConfigs: [
      { value: '2-aksler', label: '2 aksler' },
      { value: '3-aksler', label: '3 aksler (boggi)' },
    ],
  },
  {
    type: 'slepvogn',
    emoji: '🔗',
    label: 'Slepvogn',
    description: 'Slepvogn (tilhenger med aksler foran og bak)',
    axleConfigs: [
      { value: '2-aksler', label: '2 aksler' },
      { value: '3-aksler', label: '3 aksler (boggi bak)' },
    ],
  },
]

function getInitialInput(vehicleType: LTPVehicleType): LTPTyngdepunktInput {
  return {
    vehicleType,
    egenvektForan: 0,
    egenvektBak: 0,
    tillattAksellastForan: 0,
    tillattAksellastBak: 0,
    akselavstand: 0,
    antallAksler: '2-aksler',
    boggiAvstand: 0,
    lasteromLengde: 0,
    overhengBak: 0,
  }
}

export default function LTPCalculatorPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<LTPVehicleType | null>(null)
  const [input, setInput] = useState<LTPTyngdepunktInput>(getInitialInput('lastebil'))
  const [showResult, setShowResult] = useState(false)
  const [showForklaring, setShowForklaring] = useState(false)

  const vehicleConfig = vehicleOptions.find((v) => v.type === selectedVehicle)

  const selectVehicle = (type: LTPVehicleType) => {
    setSelectedVehicle(type)
    setInput(getInitialInput(type))
    setShowResult(false)
    setShowForklaring(false)
  }

  const goBack = () => {
    setSelectedVehicle(null)
    setShowResult(false)
    setShowForklaring(false)
  }

  const update = (field: keyof LTPTyngdepunktInput, value: number | AxleConfig | LTPVehicleType) => {
    setInput({ ...input, [field]: value })
    setShowResult(false)
  }

  const harBoggi = input.antallAksler !== '2-aksler'

  const canCalculate =
    input.egenvektForan > 0 &&
    input.egenvektBak > 0 &&
    input.tillattAksellastForan > 0 &&
    input.tillattAksellastBak > 0 &&
    input.akselavstand > 0

  const result = canCalculate ? calculateLTPTyngdepunkt(input) : null

  // Labels based on vehicle type
  const isSlepvogn = selectedVehicle === 'slepvogn'
  const frontLabel = isSlepvogn ? 'foraksel(ling)' : 'foraksel'
  const rearLabel = isSlepvogn
    ? (harBoggi ? 'bakaksling/boggi' : 'bakaksling')
    : (harBoggi ? 'bakaksel/boggi' : 'bakaksel')

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 pt-2">
        <div className="text-4xl">🎯</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">LTP-kalkulator</h1>
        <p className="text-sm text-text-secondary max-w-md mx-auto">
          Finn Lastens TyngdePunkt – hvor lasten bør plasseres i lasterommet
        </p>
      </div>

      {/* Info card */}
      <div className="flex items-start gap-3 bg-orange-500/5 rounded-xl border border-orange-500/10 p-4">
        <Info className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-text-secondary leading-relaxed">
          <strong className="text-orange-400">LTP</strong> angir hvor lastens tyngdepunkt bør ligge,
          målt fra bakaksel/boggi. Riktig plassering sikrer at ingen aksellast overskrides.
          {isSlepvogn && (
            <span className="block mt-1 text-xs text-text-muted">
              For slepvogn beregnes LTP uten førervekt, da det er en tilhenger.
            </span>
          )}
        </div>
      </div>

      {/* Step 1: Vehicle type selection */}
      {!selectedVehicle ? (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-widest text-center">
            Steg 1 – Velg kjøretøytype
          </h2>
          <div className="grid gap-3">
            {vehicleOptions.map((opt) => (
              <button
                key={opt.type}
                onClick={() => selectVehicle(opt.type)}
                className="group flex items-center gap-4 bg-surface-secondary rounded-2xl border border-border-default p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-orange-500/40"
              >
                <div className="w-14 h-14 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                  <span className="text-2xl">{opt.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-lg">{opt.label}</div>
                  <div className="text-sm text-text-secondary">{opt.description}</div>
                </div>
                <div className="text-text-muted group-hover:text-orange-400 transition-colors">
                  →
                </div>
              </button>
            ))}
          </div>

          {/* Påhengsvogn info */}
          <div className="flex items-start gap-3 bg-surface-secondary rounded-xl border border-border-default p-4 mt-4">
            <Info className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" />
            <p className="text-xs text-text-muted leading-relaxed">
              <strong>Påhengsvogn</strong> er ikke inkludert fordi LTP-beregning ikke gjelder der –
              lasten plasseres med tyngdepunktet over akslingen(e), og koblingslast fra vognkortet
              bestemmer maks last på dragstangen.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* Back button + current selection */}
          <div className="flex items-center gap-3">
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 text-sm text-text-muted hover:text-orange-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Bytt type
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-tertiary rounded-full">
              <span className="text-base">{vehicleConfig?.emoji}</span>
              <span className="text-sm font-medium">{vehicleConfig?.label}</span>
            </div>
          </div>

          {/* Step 2: Axle config */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-text-muted uppercase tracking-widest">
              Steg 2 – Akselkonfigurasjon
            </h2>
            <div className={`grid gap-3 ${
              vehicleConfig && vehicleConfig.axleConfigs.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
            }`}>
              {vehicleConfig?.axleConfigs.map((config) => (
                <button
                  key={config.value}
                  onClick={() => update('antallAksler', config.value)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    input.antallAksler === config.value
                      ? 'bg-orange-500/15 text-orange-400 border-2 border-orange-500/40'
                      : 'bg-surface-tertiary text-text-secondary border-2 border-transparent hover:border-border-default'
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </section>

          {/* Step 3: Data entry */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-text-muted uppercase tracking-widest">
              Steg 3 – Data fra vognkortet
            </h2>

            <div className="bg-surface-secondary rounded-2xl border border-border-default overflow-hidden">
              <div className="p-5 sm:p-6 space-y-5">
                {/* Egenvekt */}
                <div>
                  <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
                    Egenvekt (fra vognkort eller veiing)
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Egenvekt {frontLabel} (kg)
                      </label>
                      <p className="text-xs text-text-muted mb-1.5">
                        Vekt på {frontLabel} uten last
                        {!isSlepvogn && ' (uten fører – 75 kg legges til automatisk)'}
                      </p>
                      <input
                        type="number"
                        value={input.egenvektForan || ''}
                        onChange={(e) => update('egenvektForan', parseInt(e.target.value) || 0)}
                        placeholder={isSlepvogn ? 'f.eks. 2 400' : 'f.eks. 5 200'}
                        className={inputClass}
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Egenvekt {rearLabel} (kg)
                      </label>
                      <p className="text-xs text-text-muted mb-1.5">
                        Vekt på {rearLabel} uten last
                      </p>
                      <input
                        type="number"
                        value={input.egenvektBak || ''}
                        onChange={(e) => update('egenvektBak', parseInt(e.target.value) || 0)}
                        placeholder={isSlepvogn ? 'f.eks. 1 800' : 'f.eks. 3 800'}
                        className={inputClass}
                        inputMode="numeric"
                      />
                    </div>
                  </div>
                </div>

                {/* Tillatt aksellast */}
                <div>
                  <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
                    Tillatt aksellast (fra vognkort)
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Tillatt aksellast {frontLabel} (kg)
                      </label>
                      <p className="text-xs text-text-muted mb-1.5">
                        Maks tillatt vekt {frontLabel}
                      </p>
                      <input
                        type="number"
                        value={input.tillattAksellastForan || ''}
                        onChange={(e) => update('tillattAksellastForan', parseInt(e.target.value) || 0)}
                        placeholder={isSlepvogn ? 'f.eks. 8 000' : 'f.eks. 7 500'}
                        className={inputClass}
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Tillatt aksellast {rearLabel} (kg)
                      </label>
                      <p className="text-xs text-text-muted mb-1.5">
                        Maks tillatt vekt {rearLabel}
                        {harBoggi && ' (samlet for boggien)'}
                      </p>
                      <input
                        type="number"
                        value={input.tillattAksellastBak || ''}
                        onChange={(e) => update('tillattAksellastBak', parseInt(e.target.value) || 0)}
                        placeholder={isSlepvogn ? 'f.eks. 8 000' : 'f.eks. 11 500'}
                        className={inputClass}
                        inputMode="numeric"
                      />
                    </div>
                  </div>
                </div>

                {/* Avstander */}
                <div>
                  <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
                    Avstander
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Akselavstand (cm)</label>
                      <p className="text-xs text-text-muted mb-1.5">
                        {isSlepvogn ? 'Foraksel til bakaksel' : 'Felt L i vognkort – foraksel til '}
                        {!isSlepvogn && (harBoggi ? '1. bakaksel' : 'bakaksel')}
                      </p>
                      <input
                        type="number"
                        value={input.akselavstand || ''}
                        onChange={(e) => update('akselavstand', parseInt(e.target.value) || 0)}
                        placeholder={isSlepvogn ? 'f.eks. 465' : 'f.eks. 480'}
                        className={inputClass}
                        inputMode="numeric"
                      />
                    </div>

                    {harBoggi && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Boggiavstand (cm)</label>
                        <p className="text-xs text-text-muted mb-1.5">
                          Avstand mellom aksler i boggien
                        </p>
                        <input
                          type="number"
                          value={input.boggiAvstand || ''}
                          onChange={(e) => update('boggiAvstand', parseInt(e.target.value) || 0)}
                          placeholder="f.eks. 131"
                          className={inputClass}
                          inputMode="numeric"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-1">Lasterom lengde (cm)</label>
                      <p className="text-xs text-text-muted mb-1.5">Innvendig lengde på lasterommet</p>
                      <input
                        type="number"
                        value={input.lasteromLengde || ''}
                        onChange={(e) => update('lasteromLengde', parseInt(e.target.value) || 0)}
                        placeholder="f.eks. 620"
                        className={inputClass}
                        inputMode="numeric"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Overheng bak (cm)</label>
                      <p className="text-xs text-text-muted mb-1.5">
                        Fra bakaksel{harBoggi ? ' (boggi midtpunkt)' : ''} til bakkant av lasterommet
                      </p>
                      <input
                        type="number"
                        value={input.overhengBak || ''}
                        onChange={(e) => update('overhengBak', parseInt(e.target.value) || 0)}
                        placeholder="f.eks. 150"
                        className={inputClass}
                        inputMode="numeric"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Calculate button */}
          <button
            onClick={() => setShowResult(true)}
            disabled={!canCalculate}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-surface-tertiary disabled:text-text-muted text-white font-semibold rounded-xl transition-colors"
          >
            <Calculator className="w-5 h-5" />
            Beregn LTP
          </button>

          {!canCalculate && (
            <p className="text-xs text-text-muted text-center">
              Fyll inn egenvekt, aksellaster og akselavstand for å beregne
            </p>
          )}

          {/* Result */}
          {showResult && result && (
            <div className="space-y-5 mt-2">
              {/* Main result card */}
              <div className="rounded-2xl p-6 text-center bg-orange-500/5 border-2 border-orange-500/20">
                <div className="flex justify-center mb-3">
                  <Crosshair className="w-10 h-10 text-orange-400" />
                </div>
                <div className="text-4xl font-extrabold text-orange-400 mb-1">
                  {result.ltp.toFixed(0)} cm
                </div>
                <p className="text-sm text-text-secondary">
                  fra bakaksel{harBoggi ? ' (boggi midtpunkt)' : ''}
                </p>
                {input.lasteromLengde > 0 && input.overhengBak > 0 && (
                  <p className="text-sm text-text-muted mt-1">
                    = {result.ltpFraLasteromBakkant} cm fra bakkant av lasterommet
                  </p>
                )}
              </div>

              {/* Vehicle diagram */}
              {input.lasteromLengde > 0 && input.overhengBak > 0 && (
                <LTPVehicleDiagram
                  ltp={result.ltp}
                  akselavstand={input.akselavstand}
                  lasteromLengde={input.lasteromLengde}
                  overhengBak={input.overhengBak}
                  antallAksler={input.antallAksler}
                  boggiAvstand={input.boggiAvstand}
                  vehicleType={selectedVehicle}
                />
              )}

              {/* Weight breakdown */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-surface-secondary rounded-xl border border-border-default p-4 text-center">
                  <div className="text-xs text-text-muted mb-0.5">Nyttelast foran</div>
                  <div className="text-lg font-bold text-text-primary">
                    {result.nyttelastForan.toLocaleString('nb-NO')}
                  </div>
                  <div className="text-xs text-text-muted">kg</div>
                </div>
                <div className="bg-surface-secondary rounded-xl border border-border-default p-4 text-center">
                  <div className="text-xs text-text-muted mb-0.5">Nyttelast bak</div>
                  <div className="text-lg font-bold text-text-primary">
                    {result.nyttelastBak.toLocaleString('nb-NO')}
                  </div>
                  <div className="text-xs text-text-muted">kg</div>
                </div>
                <div className="bg-surface-secondary rounded-xl border border-border-default p-4 text-center">
                  <div className="text-xs text-text-muted mb-0.5">Total nyttelast</div>
                  <div className="text-lg font-bold text-orange-400">
                    {result.totalNyttelast.toLocaleString('nb-NO')}
                  </div>
                  <div className="text-xs text-text-muted">kg</div>
                </div>
              </div>

              {/* Forklaring (collapsible) */}
              <div className="bg-surface-secondary rounded-xl border border-border-default overflow-hidden">
                <button
                  onClick={() => setShowForklaring(!showForklaring)}
                  className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  <span>Vis utregning</span>
                  {showForklaring ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {showForklaring && (
                  <div className="px-5 pb-4 space-y-1.5">
                    {result.forklaring.map((step, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-orange-400 font-mono text-xs mt-0.5 flex-shrink-0">
                          {i + 1}.
                        </span>
                        <span className="text-text-secondary font-mono text-xs">{step}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Warnings */}
              {result.advarsler.length > 0 && (
                <div className="space-y-2">
                  {result.advarsler.map((w, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-warning/5 rounded-xl border border-warning/10 p-4"
                    >
                      <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-text-secondary">{w}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
