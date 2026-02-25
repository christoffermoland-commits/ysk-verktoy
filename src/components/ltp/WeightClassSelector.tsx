import type { WeightClass } from '../../types/ltp'
import { WEIGHT_CLASS_INFO } from '../../data/ltp-constants'

interface Props {
  value: WeightClass
  onChange: (wc: WeightClass) => void
}

const weightClasses: WeightClass[] = ['BK10', 'BK8', 'BK6']

export default function WeightClassSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {weightClasses.map((wc) => {
        const info = WEIGHT_CLASS_INFO[wc]
        return (
          <button
            key={wc}
            onClick={() => onChange(wc)}
            className={`p-3 rounded-lg border text-left transition-colors ${
              value === wc
                ? 'bg-accent/10 border-accent text-accent'
                : 'bg-surface-secondary border-border-default text-text-secondary hover:border-text-muted'
            }`}
          >
            <div className="font-bold text-sm">{info.label}</div>
            <div className="text-xs mt-0.5 opacity-80">{info.description}</div>
          </button>
        )
      })}
    </div>
  )
}
