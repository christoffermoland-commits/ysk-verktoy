import { useState } from 'react'
import { Crosshair, Calculator, Info, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'
import type { AxleConfig, LTPTyngdepunktInput } from '../types/ltp-tyngdepunkt'
import { calculateLTPTyngdepunkt } from '../utils/ltp-tyngdepunkt-calculations'
import LTPTruckDiagram from '../components/ltp-tyngdepunkt/LTPTruckDiagram'

const inputClass =
  'w-full px-3 py-2.5 bg-surface-tertiary border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500'

const initialInput: LTPTyngdepunktInput = {
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

export default function LTPCalculatorPage() {
  const [input, setInput] = useState<LTPTyngdepunktInput>(initialInput)
  const [showResult, setShowResult] = useState(false)
  const [showForklaring, setShowForklaring] = useState(false)

  const update = (field: keyof LTPTyngdepunktInput, value: number | AxleConfig) => {
    setInput({ ...input, [field]: value })
    setShowResult(false)
  }

  const canCalculate =
    input.egenvektForan > 0 &&
    input.egenvektBak > 0 &&
    input.tillattAksellastForan > 0 &&
    input.tillattAksellastBak > 0 &&
    input.akselavstand > 0

  const result = canCalculate ? calculateLTPTyngdepunkt(input) : null

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
          <strong className="text-orange-400">LTP</strong> angir hvor lastens tyngdepunkt bør ligge i lasterommet,
          målt fra bakaksel/boggi. Riktig plassering sikrer at ingen aksellast overskrides.
        </div>
      </div>

      {/* Form */}
      <div className="bg-surface-secondary rounded-2xl border border-border-default overflow-hidden">
        {/* Axle config */}
        <div className="px-5 py-4 border-b border-border-default">
          <label className="block text-sm font-medium mb-2">Akselkonfigurasjon</label>
          <div className="grid grid-cols-2 gap-3">
            {(['2-aksler', '3-aksler'] as AxleConfig[]).map((config) => (
              <button
                key={config}
                onClick={() => update('antallAksler', config)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  input.antallAksler === config
                    ? 'bg-orange-500/15 text-orange-400 border-2 border-orange-500/40'
                    : 'bg-surface-tertiary text-text-secondary border-2 border-transparent hover:border-border-default'
                }`}
              >
                {config === '2-aksler' ? '2 aksler' : '3 aksler (boggi)'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Egenvekt */}
          <div>
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
              Egenvekt (fra vognkort eller veiing)
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Egenvekt foraksel (kg)</label>
                <p className="text-xs text-text-muted mb-1.5">Vekt på foraksel uten last</p>
                <input
                  type="number"
                  value={input.egenvektForan || ''}
                  onChange={(e) => update('egenvektForan', parseInt(e.target.value) || 0)}
                  placeholder="f.eks. 5 200"
                  className={inputClass}
                  inputMode="numeric"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Egenvekt bakaksel{input.antallAksler === '3-aksler' ? '/boggi' : ''} (kg)
                </label>
                <p className="text-xs text-text-muted mb-1.5">Vekt på bakaksel uten last</p>
                <input
                  type="number"
                  value={input.egenvektBak || ''}
                  onChange={(e) => update('egenvektBak', parseInt(e.target.value) || 0)}
                  placeholder="f.eks. 3 800"
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
                <label className="block text-sm font-medium mb-1">Tillatt aksellast foran (kg)</label>
                <p className="text-xs text-text-muted mb-1.5">Maks tillatt vekt foraksel</p>
                <input
                  type="number"
                  value={input.tillattAksellastForan || ''}
                  onChange={(e) => update('tillattAksellastForan', parseInt(e.target.value) || 0)}
                  placeholder="f.eks. 7 500"
                  className={inputClass}
                  inputMode="numeric"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tillatt aksellast bak{input.antallAksler === '3-aksler' ? '/boggi' : ''} (kg)
                </label>
                <p className="text-xs text-text-muted mb-1.5">Maks tillatt vekt bakaksel</p>
                <input
                  type="number"
                  value={input.tillattAksellastBak || ''}
                  onChange={(e) => update('tillattAksellastBak', parseInt(e.target.value) || 0)}
                  placeholder="f.eks. 11 500"
                  className={inputClass}
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>

          {/* Akselavstander */}
          <div>
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
              Avstander
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Akselavstand (cm)</label>
                <p className="text-xs text-text-muted mb-1.5">
                  Felt L i vognkort – foraksel til{' '}
                  {input.antallAksler === '3-aksler' ? '1. bakaksel' : 'bakaksel'}
                </p>
                <input
                  type="number"
                  value={input.akselavstand || ''}
                  onChange={(e) => update('akselavstand', parseInt(e.target.value) || 0)}
                  placeholder="f.eks. 480"
                  className={inputClass}
                  inputMode="numeric"
                />
              </div>

              {input.antallAksler === '3-aksler' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Boggiavstand (cm)</label>
                  <p className="text-xs text-text-muted mb-1.5">Avstand mellom aksler i boggien</p>
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
                  Fra bakaksel{input.antallAksler === '3-aksler' ? ' (boggi midtpunkt)' : ''} til bakkant av lasterommet
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
              fra bakaksel{input.antallAksler === '3-aksler' ? ' (boggi midtpunkt)' : ''}
            </p>
            {input.lasteromLengde > 0 && input.overhengBak > 0 && (
              <p className="text-sm text-text-muted mt-1">
                = {result.ltpFraLasteromBakkant} cm fra bakkant av lasterommet
              </p>
            )}
          </div>

          {/* Truck diagram */}
          {input.lasteromLengde > 0 && input.overhengBak > 0 && (
            <LTPTruckDiagram
              ltp={result.ltp}
              akselavstand={input.akselavstand}
              lasteromLengde={input.lasteromLengde}
              overhengBak={input.overhengBak}
              antallAksler={input.antallAksler}
              boggiAvstand={input.boggiAvstand}
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
    </div>
  )
}
