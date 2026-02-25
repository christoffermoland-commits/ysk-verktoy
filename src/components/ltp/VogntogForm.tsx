import { useState } from 'react'
import { Calculator } from 'lucide-react'
import type { WeightClass, VogntogInput } from '../../types/ltp'
import { calculateVogntog } from '../../utils/ltp-calculations'
import LTPResult from './LTPResult'

interface Props {
  weightClass: WeightClass
}

const inputClass = 'w-full px-3 py-2.5 bg-surface-tertiary border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent'

export default function VogntogForm({ weightClass }: Props) {
  const [input, setInput] = useState<VogntogInput>({
    lastebilTotalvekt: 0,
    tilhengerTotalvekt: 0,
    dVerdi: 0,
    tillattVogntogvekt: 0,
  })
  const [showResult, setShowResult] = useState(false)

  const update = (field: keyof VogntogInput, value: number) => {
    setInput({ ...input, [field]: value })
    setShowResult(false)
  }

  const canCalculate =
    input.lastebilTotalvekt > 0 &&
    input.tilhengerTotalvekt > 0 &&
    input.tillattVogntogvekt > 0

  const result = canCalculate ? calculateVogntog(input, weightClass) : null

  return (
    <div>
      {/* Lastebil section */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-accent mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold">1</span>
          Lastebil (vognkort lastebil)
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Totalvekt lastebil (kg)</label>
            <p className="text-xs text-text-muted mb-1.5">Felt F.2 – med full last</p>
            <input type="number" value={input.lastebilTotalvekt || ''} onChange={(e) => update('lastebilTotalvekt', parseInt(e.target.value) || 0)} placeholder="f.eks. 18 000" className={inputClass} inputMode="numeric" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tillatt vogntogvekt (kg)</label>
            <p className="text-xs text-text-muted mb-1.5">Felt F.3 på lastebilens vognkort</p>
            <input type="number" value={input.tillattVogntogvekt || ''} onChange={(e) => update('tillattVogntogvekt', parseInt(e.target.value) || 0)} placeholder="f.eks. 50 000" className={inputClass} inputMode="numeric" />
          </div>
        </div>
      </div>

      {/* Tilhenger section */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-xs font-bold">2</span>
          Tilhenger (vognkort tilhenger)
        </h3>
        <div>
          <label className="block text-sm font-medium mb-1">Totalvekt tilhenger (kg)</label>
          <p className="text-xs text-text-muted mb-1.5">Felt F.2 – med full last</p>
          <input type="number" value={input.tilhengerTotalvekt || ''} onChange={(e) => update('tilhengerTotalvekt', parseInt(e.target.value) || 0)} placeholder="f.eks. 20 000" className={inputClass} inputMode="numeric" />
        </div>
      </div>

      {/* Kopling section */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-teal-400 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center text-xs font-bold">3</span>
          Kopling
        </h3>
        <div>
          <label className="block text-sm font-medium mb-1">D-verdi (kN)</label>
          <p className="text-xs text-text-muted mb-1.5">Koplingens styrke – finnes på typeskiltet til koplingen</p>
          <input type="number" value={input.dVerdi || ''} onChange={(e) => update('dVerdi', parseFloat(e.target.value) || 0)} placeholder="f.eks. 130" className={inputClass} inputMode="numeric" />
        </div>
      </div>

      {/* Calculate button */}
      <button
        onClick={() => setShowResult(true)}
        disabled={!canCalculate}
        className="w-full mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent-hover disabled:bg-surface-tertiary disabled:text-text-muted text-white font-semibold rounded-xl transition-colors"
      >
        <Calculator className="w-5 h-5" />
        Beregn LTP
      </button>

      {!canCalculate && (
        <p className="text-xs text-text-muted text-center mt-2">
          Fyll inn totalvekt for lastebil, tilhenger og tillatt vogntogvekt for å beregne
        </p>
      )}

      {showResult && result && <LTPResult result={result} />}
    </div>
  )
}
