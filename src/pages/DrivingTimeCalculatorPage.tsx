import { useState, useMemo } from 'react'
import { Calculator, Plus, Trash2, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { BreakEntry } from '../types/driving-time'
import { calculateDrivingTime } from '../utils/driving-time-calculations'

function getCurrentTime(): string {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

export default function DrivingTimeCalculatorPage() {
  const [startTime, setStartTime] = useState('06:00')
  const [currentTime, setCurrentTime] = useState(getCurrentTime)
  const [breaks, setBreaks] = useState<BreakEntry[]>([])

  const addBreak = () => {
    setBreaks([
      ...breaks,
      { id: crypto.randomUUID(), startTime: '', duration: 45 },
    ])
  }

  const removeBreak = (id: string) => {
    setBreaks(breaks.filter((b) => b.id !== id))
  }

  const updateBreak = (id: string, field: keyof BreakEntry, value: string | number) => {
    setBreaks(breaks.map((b) => (b.id === id ? { ...b, [field]: value } : b)))
  }

  const validBreaks = breaks.filter((b) => b.startTime !== '')
  const result = useMemo(
    () => calculateDrivingTime({ startTime, breaks: validBreaks }, currentTime),
    [startTime, validBreaks, currentTime]
  )

  const urgencyColor = (remaining: number, max: number) => {
    const ratio = remaining / max
    if (ratio > 0.3) return 'text-success'
    if (ratio > 0.1) return 'text-warning'
    return 'text-danger'
  }

  return (
    <div className="space-y-6">
      <Link to="/kjore-hviletid" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-accent transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Tilbake til regler
      </Link>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Kjøretidskalkulator</h1>
          <p className="text-sm text-text-secondary">Beregn gjenværende kjøretid</p>
        </div>
      </div>

      {/* Input form */}
      <div className="bg-surface-secondary rounded-xl border border-border-default p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Startet kjøring kl.</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Nåværende tid</label>
            <input
              type="time"
              value={currentTime}
              onChange={(e) => setCurrentTime(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-tertiary border border-border-default rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Breaks */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Pauser tatt</label>
            <button
              onClick={addBreak}
              className="flex items-center gap-1 text-xs text-accent hover:text-accent-hover transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Legg til pause
            </button>
          </div>

          {breaks.length === 0 && (
            <p className="text-sm text-text-muted py-2">Ingen pauser registrert ennå.</p>
          )}

          <div className="space-y-2">
            {breaks.map((brk) => (
              <div key={brk.id} className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="text-xs text-text-muted">Starttid</label>
                  <input
                    type="time"
                    value={brk.startTime}
                    onChange={(e) => updateBreak(brk.id, 'startTime', e.target.value)}
                    className="w-full px-3 py-2 bg-surface-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div className="w-24">
                  <label className="text-xs text-text-muted">Varighet (min)</label>
                  <input
                    type="number"
                    min={1}
                    value={brk.duration}
                    onChange={(e) => updateBreak(brk.id, 'duration', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-surface-tertiary border border-border-default rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                    inputMode="numeric"
                  />
                </div>
                <button
                  onClick={() => removeBreak(brk.id)}
                  className="p-2 text-text-muted hover:text-danger transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-surface-secondary rounded-xl border border-border-default p-5">
          <div className="text-sm text-text-muted mb-1">Gjenværende før pause</div>
          <div className={`text-3xl font-bold ${urgencyColor(result.remainingBeforeBreak, 270)}`}>
            {Math.floor(result.remainingBeforeBreak / 60)}t {result.remainingBeforeBreak % 60}min
          </div>
          <div className="text-xs text-text-muted mt-1">
            Neste påkrevde pause kl. {result.nextMandatoryBreakAt}
          </div>
        </div>

        <div className="bg-surface-secondary rounded-xl border border-border-default p-5">
          <div className="text-sm text-text-muted mb-1">Gjenværende daglig kjøretid</div>
          <div className={`text-3xl font-bold ${urgencyColor(result.remainingDailyDriving, 540)}`}>
            {Math.floor(result.remainingDailyDriving / 60)}t {result.remainingDailyDriving % 60}min
          </div>
          <div className="text-xs text-text-muted mt-1">
            Daglig hvile senest kl. {result.dailyRestStartsAt}
          </div>
        </div>

        <div className="bg-surface-secondary rounded-xl border border-border-default p-5">
          <div className="text-sm text-text-muted mb-1">Total kjøretid i dag</div>
          <div className="text-3xl font-bold text-text-primary">
            {Math.floor(result.totalDrivingMinutes / 60)}t {result.totalDrivingMinutes % 60}min
          </div>
        </div>

        <div className="bg-surface-secondary rounded-xl border border-border-default p-5">
          <div className="text-sm text-text-muted mb-1">Utvidet dag tilgjengelig?</div>
          <div className={`text-3xl font-bold ${result.canExtendToday ? 'text-success' : 'text-text-muted'}`}>
            {result.canExtendToday ? 'Ja (10t)' : 'Nei'}
          </div>
          <div className="text-xs text-text-muted mt-1">
            Maks 2 ganger per uke
          </div>
        </div>
      </div>

      {/* Timeline */}
      {result.timeline.length > 0 && (
        <div className="bg-surface-secondary rounded-xl border border-border-default p-6">
          <h2 className="font-semibold mb-4">Tidslinje</h2>
          <div className="space-y-2">
            {result.timeline.map((seg, i) => {
              const colors: Record<string, string> = {
                driving: 'bg-accent',
                break: 'bg-warning',
                rest: 'bg-success',
                'projected-driving': 'bg-accent/40',
                'projected-break': 'bg-warning/40',
                'projected-rest': 'bg-success/40',
              }
              const isProjected = seg.type.startsWith('projected')
              return (
                <div key={i} className={`flex items-center gap-3 ${isProjected ? 'opacity-60' : ''}`}>
                  <div className={`w-3 h-3 rounded-full ${colors[seg.type]} flex-shrink-0`} />
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">{seg.label}</span>
                      <span className="text-xs text-text-muted ml-2">{seg.startTime} – {seg.endTime}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
