import { useState } from 'react'
import { Calculator } from 'lucide-react'
import type { WeightClass, SemitrailerInput } from '../../types/ltp'
import { calculateSemitrailer } from '../../utils/ltp-calculations'
import LTPResult from './LTPResult'

interface Props {
  weightClass: WeightClass
}

const inputClass = 'w-full px-3 py-2.5 bg-surface-tertiary border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent'

export default function SemitrailerForm({ weightClass }: Props) {
  const [input, setInput] = useState<SemitrailerInput>({
    trekkbilEgenvekt: 0,
    semitrailerEgenvekt: 0,
    koplingstrykk: 0,
    tillattTotalvektTrekkbil: 0,
    tillattTotalvektSemitrailer: 0,
    tillattTotalvektKombinasjon: 0,
  })
  const [showResult, setShowResult] = useState(false)

  const update = (field: keyof SemitrailerInput, value: number) => {
    setInput({ ...input, [field]: value })
    setShowResult(false)
  }

  const canCalculate =
    input.trekkbilEgenvekt > 0 &&
    input.semitrailerEgenvekt > 0 &&
    input.tillattTotalvektKombinasjon > 0

  const result = canCalculate ? calculateSemitrailer(input, weightClass) : null

  return (
    <div>
      {/* Trekkbil section */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-accent mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold">1</span>
          Trekkbil (vognkort trekkbil)
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Egenvekt trekkbil (kg)</label>
            <p className="text-xs text-text-muted mb-1.5">Felt G</p>
            <input type="number" value={input.trekkbilEgenvekt || ''} onChange={(e) => update('trekkbilEgenvekt', parseInt(e.target.value) || 0)} placeholder="f.eks. 7 500" className={inputClass} inputMode="numeric" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tillatt totalvekt trekkbil (kg)</label>
            <p className="text-xs text-text-muted mb-1.5">Felt F.2</p>
            <input type="number" value={input.tillattTotalvektTrekkbil || ''} onChange={(e) => update('tillattTotalvektTrekkbil', parseInt(e.target.value) || 0)} placeholder="f.eks. 18 000" className={inputClass} inputMode="numeric" />
          </div>
        </div>
      </div>

      {/* Semitrailer section */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-xs font-bold">2</span>
          Semitrailer (vognkort semitrailer)
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Egenvekt semitrailer (kg)</label>
            <p className="text-xs text-text-muted mb-1.5">Felt G</p>
            <input type="number" value={input.semitrailerEgenvekt || ''} onChange={(e) => update('semitrailerEgenvekt', parseInt(e.target.value) || 0)} placeholder="f.eks. 7 000" className={inputClass} inputMode="numeric" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tillatt totalvekt semitrailer (kg)</label>
            <p className="text-xs text-text-muted mb-1.5">Felt F.2</p>
            <input type="number" value={input.tillattTotalvektSemitrailer || ''} onChange={(e) => update('tillattTotalvektSemitrailer', parseInt(e.target.value) || 0)} placeholder="f.eks. 35 000" className={inputClass} inputMode="numeric" />
          </div>
        </div>
      </div>

      {/* Combination section */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-teal-400 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center text-xs font-bold">3</span>
          Kombinasjon
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Koplingstrykk (kg)</label>
            <p className="text-xs text-text-muted mb-1.5">Vekt overført til trekkbil via svingskiven</p>
            <input type="number" value={input.koplingstrykk || ''} onChange={(e) => update('koplingstrykk', parseInt(e.target.value) || 0)} placeholder="f.eks. 10 000" className={inputClass} inputMode="numeric" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tillatt totalvekt kombinasjon (kg)</label>
            <p className="text-xs text-text-muted mb-1.5">Felt F.3 på trekkbilens vognkort</p>
            <input type="number" value={input.tillattTotalvektKombinasjon || ''} onChange={(e) => update('tillattTotalvektKombinasjon', parseInt(e.target.value) || 0)} placeholder="f.eks. 44 000" className={inputClass} inputMode="numeric" />
          </div>
        </div>
      </div>

      {/* Calculate button */}
      <button
        onClick={() => setShowResult(true)}
        disabled={!canCalculate}
        className="w-full mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent-hover disabled:bg-surface-tertiary disabled:text-text-muted text-white font-semibold rounded-xl transition-colors"
      >
        <Calculator className="w-5 h-5" />
        Beregn nyttelast
      </button>

      {!canCalculate && (
        <p className="text-xs text-text-muted text-center mt-2">
          Fyll inn minst egenvekt for trekkbil, semitrailer og tillatt totalvekt for kombinasjonen
        </p>
      )}

      {showResult && result && <LTPResult result={result} />}
    </div>
  )
}
