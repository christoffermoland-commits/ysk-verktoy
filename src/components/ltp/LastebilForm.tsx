import { useState } from 'react'
import { Calculator } from 'lucide-react'
import type { WeightClass, LastebilInput } from '../../types/ltp'
import { calculateLastebilC } from '../../utils/ltp-calculations'
import LTPResult from './LTPResult'

interface Props {
  weightClass: WeightClass
}

const inputClass = 'w-full px-3 py-2.5 bg-surface-tertiary border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent'

export default function LastebilForm({ weightClass }: Props) {
  const [input, setInput] = useState<LastebilInput>({
    egenvekt: 0,
    nyttelast: 0,
    tillattTotalvekt: 0,
    antallAksler: 2,
  })
  const [showResult, setShowResult] = useState(false)

  const update = (field: keyof LastebilInput, value: number) => {
    setInput({ ...input, [field]: value })
    setShowResult(false)
  }

  const canCalculate = input.egenvekt > 0 && input.tillattTotalvekt > 0
  const result = canCalculate ? calculateLastebilC(input, weightClass) : null

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Egenvekt (kg)</label>
          <p className="text-xs text-text-muted mb-1.5">Felt G i vognkortet</p>
          <input
            type="number"
            value={input.egenvekt || ''}
            onChange={(e) => update('egenvekt', parseInt(e.target.value) || 0)}
            placeholder="f.eks. 8 500"
            className={inputClass}
            inputMode="numeric"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tillatt totalvekt (kg)</label>
          <p className="text-xs text-text-muted mb-1.5">Felt F.2 i vognkortet</p>
          <input
            type="number"
            value={input.tillattTotalvekt || ''}
            onChange={(e) => update('tillattTotalvekt', parseInt(e.target.value) || 0)}
            placeholder="f.eks. 18 000"
            className={inputClass}
            inputMode="numeric"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Antall aksler</label>
          <p className="text-xs text-text-muted mb-1.5">Felt L i vognkortet</p>
          <select
            value={input.antallAksler}
            onChange={(e) => update('antallAksler', parseInt(e.target.value) as 2 | 3 | 4)}
            className={inputClass}
          >
            <option value={2}>2 aksler</option>
            <option value={3}>3 aksler (boggi)</option>
            <option value={4}>4 aksler</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nyttelast / last (kg)</label>
          <p className="text-xs text-text-muted mb-1.5">Hvor mye last har du med?</p>
          <input
            type="number"
            value={input.nyttelast || ''}
            onChange={(e) => update('nyttelast', parseInt(e.target.value) || 0)}
            placeholder="f.eks. 9 000"
            className={inputClass}
            inputMode="numeric"
          />
        </div>
      </div>

      {/* Calculate button */}
      <button
        onClick={() => setShowResult(true)}
        disabled={!canCalculate}
        className="w-full mt-6 flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent-hover disabled:bg-surface-tertiary disabled:text-text-muted text-white font-semibold rounded-xl transition-colors"
      >
        <Calculator className="w-5 h-5" />
        Beregn nyttelast
      </button>

      {!canCalculate && (
        <p className="text-xs text-text-muted text-center mt-2">
          Fyll inn minst egenvekt og tillatt totalvekt for å beregne
        </p>
      )}

      {showResult && result && <LTPResult result={result} />}
    </div>
  )
}
