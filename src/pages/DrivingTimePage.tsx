import { Link } from 'react-router-dom'
import { Clock, Car, Calendar, Coffee, Moon, BedDouble, Calculator, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { drivingRegulations, regulationCategories } from '../data/driving-regulations'

const iconMap = { Car, Calendar, Coffee, Moon, BedDouble }

const quickStats = [
  { label: 'Maks daglig kjøretid', value: '9t', sub: '(10t x2/uke)' },
  { label: 'Maks ukentlig', value: '56t', sub: '' },
  { label: 'Maks 2 uker', value: '90t', sub: '' },
  { label: 'Pause etter', value: '4,5t', sub: '(45 min pause)' },
  { label: 'Daglig hvile', value: '11t', sub: '(9t x3)' },
  { label: 'Ukentlig hvile', value: '45t', sub: '(24t annenhver)' },
]

export default function DrivingTimePage() {
  const [openSection, setOpenSection] = useState<string | null>('daglig-kjoring')

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Clock className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Kjøre- og hviletid</h1>
          <p className="text-sm text-text-secondary">EU-forordning 561/2006</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {quickStats.map((s) => (
          <div key={s.label} className="bg-surface-secondary rounded-xl border border-border-default p-4 text-center">
            <div className="text-2xl font-bold text-accent">{s.value}</div>
            <div className="text-xs text-text-secondary mt-1">{s.label}</div>
            {s.sub && <div className="text-xs text-text-muted">{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* Calculator link */}
      <Link
        to="/kjore-hviletid/kalkulator"
        className="flex items-center gap-3 bg-accent/10 border border-accent/20 rounded-xl p-4 hover:bg-accent/15 transition-colors"
      >
        <Calculator className="w-5 h-5 text-accent" />
        <div>
          <div className="font-medium text-accent">Kjøretidskalkulator</div>
          <div className="text-xs text-text-secondary">Beregn hvor lenge du kan kjøre i dag</div>
        </div>
      </Link>

      {/* Regulations accordion */}
      <div className="space-y-3">
        {regulationCategories.map((cat) => {
          const Icon = iconMap[cat.icon as keyof typeof iconMap]
          const regs = drivingRegulations.filter((r) => r.category === cat.id)
          const isOpen = openSection === cat.id

          return (
            <div key={cat.id} className="bg-surface-secondary rounded-xl border border-border-default overflow-hidden">
              <button
                onClick={() => setOpenSection(isOpen ? null : cat.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-tertiary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className="w-5 h-5 text-accent" />}
                  <span className="font-medium">{cat.label}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-4 border-t border-border-subtle">
                  {regs.map((reg) => (
                    <div key={reg.id} className="pt-4">
                      <h3 className="font-medium mb-2">{reg.title}</h3>
                      <p className="text-sm text-text-secondary mb-2">{reg.mainRule}</p>
                      {reg.exceptions.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Unntak:</p>
                          {reg.exceptions.map((ex, i) => (
                            <p key={i} className="text-sm text-text-secondary pl-3 border-l-2 border-accent/30">
                              {ex}
                            </p>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-text-muted mt-2">{reg.legalReference}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Timeline visual */}
      <div className="bg-surface-secondary rounded-xl border border-border-default p-6">
        <h2 className="font-semibold mb-4">Eksempel: En vanlig kjøredag</h2>
        <div className="space-y-2">
          <TimeBlock color="bg-accent" label="Kjøring" time="06:00 – 10:30" duration="4t 30min" />
          <TimeBlock color="bg-warning" label="Pause" time="10:30 – 11:15" duration="45 min" />
          <TimeBlock color="bg-accent" label="Kjøring" time="11:15 – 15:45" duration="4t 30min" />
          <TimeBlock color="bg-success" label="Daglig hvile" time="15:45 – 02:45" duration="11 timer" />
        </div>
        <p className="text-xs text-text-muted mt-4">
          Total kjøretid: 9 timer | Pause: 45 min | Hvile: 11 timer
        </p>
      </div>
    </div>
  )
}

function TimeBlock({ color, label, time, duration }: { color: string; label: string; time: string; duration: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-3 h-3 rounded-full ${color} flex-shrink-0`} />
      <div className="flex-1 flex items-center justify-between">
        <div>
          <span className="text-sm font-medium">{label}</span>
          <span className="text-xs text-text-muted ml-2">{time}</span>
        </div>
        <span className="text-xs text-text-secondary">{duration}</span>
      </div>
    </div>
  )
}
