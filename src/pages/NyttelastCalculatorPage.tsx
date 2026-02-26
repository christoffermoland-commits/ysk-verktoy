import { useState } from 'react'
import { Truck, Container, TrainTrack, ArrowLeft, FileText } from 'lucide-react'
import type { VehicleType, WeightClass } from '../types/ltp'
import WeightClassSelector from '../components/ltp/WeightClassSelector'
import LastebilForm from '../components/ltp/LastebilForm'
import SemitrailerForm from '../components/ltp/SemitrailerForm'
import VogntogForm from '../components/ltp/VogntogForm'

const vehicleOptions: { type: VehicleType; label: string; emoji: string; description: string; icon: typeof Truck }[] = [
  {
    type: 'lastebil-c',
    label: 'Lastebil (C)',
    emoji: '🚛',
    description: 'Solo lastebil med totalvekt over 3 500 kg',
    icon: Truck,
  },
  {
    type: 'semitrailer',
    label: 'Semitrailer (CE)',
    emoji: '🚚',
    description: 'Trekkbil + semitrailer (leddkombinasjon)',
    icon: Container,
  },
  {
    type: 'vogntog',
    label: 'Vogntog (CE)',
    emoji: '🔗',
    description: 'Lastebil + tilhenger',
    icon: TrainTrack,
  },
]

export default function NyttelastCalculatorPage() {
  const [activeType, setActiveType] = useState<VehicleType | null>(null)
  const [weightClass, setWeightClass] = useState<WeightClass>('BK10')

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 pt-2">
        <div className="text-4xl">⚖️</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Nyttelastkalkulator</h1>
        <p className="text-sm text-text-secondary max-w-md mx-auto">
          Fyll inn data fra vognkortet og finn lovlig totalvekt for kjøretøyet ditt
        </p>
      </div>

      {/* Step 1: Vehicle type selection */}
      {!activeType ? (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-widest text-center">
            Steg 1 – Velg kjøretøytype
          </h2>
          <div className="grid gap-3">
            {vehicleOptions.map((opt) => (
              <button
                key={opt.type}
                onClick={() => setActiveType(opt.type)}
                className="group flex items-center gap-4 bg-surface-secondary rounded-2xl border border-border-default p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-accent/40"
              >
                <div className="w-14 h-14 rounded-xl bg-green-500/15 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                  <span className="text-2xl">{opt.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-lg">{opt.label}</div>
                  <div className="text-sm text-text-secondary">{opt.description}</div>
                </div>
                <div className="text-text-muted group-hover:text-accent transition-colors">
                  →
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* Back button + current selection */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveType(null)}
              className="flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Bytt type
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-tertiary rounded-full">
              <span className="text-base">{vehicleOptions.find(o => o.type === activeType)?.emoji}</span>
              <span className="text-sm font-medium">{vehicleOptions.find(o => o.type === activeType)?.label}</span>
            </div>
          </div>

          {/* Step 2: Weight class */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-text-muted uppercase tracking-widest">
              Steg 2 – Velg bruksklasse
            </h2>
            <WeightClassSelector value={weightClass} onChange={setWeightClass} />
          </section>

          {/* Step 3: Vognkort data */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-text-muted uppercase tracking-widest">
              Steg 3 – Data fra vognkortet
            </h2>

            <div className="bg-surface-secondary rounded-2xl border border-border-default overflow-hidden">
              {/* Vognkort hint */}
              <div className="flex items-center gap-3 px-5 py-3 bg-accent/5 border-b border-border-default">
                <FileText className="w-4 h-4 text-accent" />
                <p className="text-xs text-text-secondary">
                  Fyll inn verdiene slik de står på kjøretøyets vognkort (registreringsbevis del 1)
                </p>
              </div>

              <div className="p-5 sm:p-6">
                {activeType === 'lastebil-c' && <LastebilForm weightClass={weightClass} />}
                {activeType === 'semitrailer' && <SemitrailerForm weightClass={weightClass} />}
                {activeType === 'vogntog' && <VogntogForm weightClass={weightClass} />}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
