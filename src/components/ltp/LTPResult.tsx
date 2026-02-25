import { CheckCircle, XCircle, AlertTriangle, Weight, TrendingDown, Info } from 'lucide-react'
import type { LTPResult as LTPResultType } from '../../types/ltp'

interface Props {
  result: LTPResultType
}

export default function LTPResult({ result }: Props) {
  const percentage = (result.totalVekt / result.maxTillattVekt) * 100
  const clampedPercentage = Math.min(100, percentage)

  // Gauge color
  const gaugeColor = percentage > 100
    ? 'text-danger'
    : percentage > 90
      ? 'text-warning'
      : 'text-success'

  const gaugeTrack = percentage > 100
    ? 'stroke-danger'
    : percentage > 90
      ? 'stroke-warning'
      : 'stroke-success'

  // SVG circular gauge
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const strokeOffset = circumference - (clampedPercentage / 100) * circumference

  const fmt = (n: number) => n.toLocaleString('nb-NO')

  return (
    <div className="space-y-6 mt-8">
      {/* Big status card */}
      <div className={`rounded-2xl p-6 text-center ${
        result.isLegal
          ? 'bg-success/5 border-2 border-success/20'
          : 'bg-danger/5 border-2 border-danger/20'
      }`}>
        {/* Circular gauge */}
        <div className="flex justify-center mb-4">
          <div className="relative w-44 h-44">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              {/* Background track */}
              <circle
                cx="80" cy="80" r={radius}
                fill="none"
                stroke="currentColor"
                className="text-surface-tertiary"
                strokeWidth="12"
              />
              {/* Progress arc */}
              <circle
                cx="80" cy="80" r={radius}
                fill="none"
                className={gaugeTrack}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-extrabold ${gaugeColor}`}>
                {percentage.toFixed(0)}%
              </span>
              <span className="text-xs text-text-muted">av maks</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 mb-2">
          {result.isLegal ? (
            <CheckCircle className="w-6 h-6 text-success" />
          ) : (
            <XCircle className="w-6 h-6 text-danger" />
          )}
          <span className={`text-xl font-bold ${result.isLegal ? 'text-success' : 'text-danger'}`}>
            {result.isLegal ? 'Lovlig totalvekt' : 'Ulovlig – for tungt!'}
          </span>
        </div>
        <p className="text-sm text-text-secondary">
          {fmt(result.totalVekt)} kg av {fmt(result.maxTillattVekt)} kg tillatt
        </p>
      </div>

      {/* Weight breakdown cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-surface-secondary rounded-xl border border-border-default p-4 text-center">
          <Weight className="w-5 h-5 text-accent mx-auto mb-1" />
          <div className="text-xs text-text-muted mb-0.5">Totalvekt</div>
          <div className="text-lg font-bold">{fmt(result.totalVekt)}</div>
          <div className="text-xs text-text-muted">kg</div>
        </div>
        <div className="bg-surface-secondary rounded-xl border border-border-default p-4 text-center">
          <TrendingDown className="w-5 h-5 text-text-muted mx-auto mb-1" />
          <div className="text-xs text-text-muted mb-0.5">Maks tillatt</div>
          <div className="text-lg font-bold">{fmt(result.maxTillattVekt)}</div>
          <div className="text-xs text-text-muted">kg</div>
        </div>
        <div className="bg-surface-secondary rounded-xl border border-border-default p-4 text-center">
          <div className={`w-5 h-5 mx-auto mb-1 rounded-full flex items-center justify-center text-xs font-bold ${
            result.ledigKapasitet > 0 ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
          }`}>
            {result.ledigKapasitet > 0 ? '+' : '!'}
          </div>
          <div className="text-xs text-text-muted mb-0.5">Ledig kapasitet</div>
          <div className={`text-lg font-bold ${result.ledigKapasitet > 0 ? 'text-success' : 'text-danger'}`}>
            {result.ledigKapasitet > 0 ? fmt(result.ledigKapasitet) : `-${fmt(Math.abs(result.totalVekt - result.maxTillattVekt))}`}
          </div>
          <div className="text-xs text-text-muted">kg</div>
        </div>
      </div>

      {/* Visual weight bar */}
      <div className="bg-surface-secondary rounded-xl border border-border-default p-5">
        <div className="text-sm font-medium mb-3">Vektfordeling</div>
        <div className="space-y-3">
          {/* Total weight bar */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-secondary">Totalvekt</span>
              <span className={`font-medium ${gaugeColor}`}>{fmt(result.totalVekt)} kg</span>
            </div>
            <div className="relative w-full h-4 bg-surface-tertiary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentage > 100 ? 'bg-danger' : percentage > 90 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${clampedPercentage}%` }}
              />
              {/* Max limit marker */}
              {percentage > 100 && (
                <div className="absolute top-0 bottom-0 w-0.5 bg-white/50" style={{ left: `${(100 / percentage) * 100}%` }} />
              )}
            </div>
          </div>

          {/* Max allowed bar (reference) */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-secondary">Maks tillatt ({result.limitingFactor.includes('vognkort') ? 'vognkort' : 'bruksklasse'})</span>
              <span className="font-medium text-text-primary">{fmt(result.maxTillattVekt)} kg</span>
            </div>
            <div className="w-full h-4 bg-surface-tertiary rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-accent/30" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Limiting factor info */}
      <div className="flex items-start gap-3 bg-accent/5 rounded-xl border border-accent/10 p-4">
        <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-medium text-accent mb-0.5">Begrensende faktor</div>
          <p className="text-sm text-text-secondary">{result.limitingFactor}</p>
        </div>
      </div>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <div className="space-y-2">
          {result.warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-3 bg-warning/5 rounded-xl border border-warning/10 p-4">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-text-secondary">{w}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
