import type { AxleConfig } from '../../types/ltp-tyngdepunkt'

interface Props {
  /** LTP i cm fra bakaksel/boggi midtpunkt */
  ltp: number
  /** Akselavstand i cm */
  akselavstand: number
  /** Lasterom lengde i cm */
  lasteromLengde: number
  /** Overheng bak i cm */
  overhengBak: number
  /** Antall aksler */
  antallAksler: AxleConfig
  /** Boggiavstand i cm (for 3-aksler) */
  boggiAvstand: number
}

export default function LTPTruckDiagram({
  ltp,
  akselavstand,
  lasteromLengde,
  overhengBak,
  antallAksler,
  boggiAvstand,
}: Props) {
  // SVG dimensions
  const svgWidth = 540
  const svgHeight = 200
  const padding = 30

  // Calculate scaling: total truck visual length
  const overhengForan = 80 // visual front overhang (cab)
  const totalTruckVisualLength = overhengForan + akselavstand + overhengBak + 40
  const scale = (svgWidth - padding * 2) / totalTruckVisualLength

  // Key positions (x coordinates)
  const frontAxleX = padding + overhengForan * scale
  const rearAxleX = frontAxleX + akselavstand * scale

  // Boggi positions
  const boggiMid = antallAksler === '3-aksler' ? boggiAvstand / 2 : 0
  const rearEffectiveX = rearAxleX + boggiMid * scale
  const boggiAxle1X = antallAksler === '3-aksler' ? rearAxleX : rearAxleX
  const boggiAxle2X = antallAksler === '3-aksler' ? rearAxleX + boggiAvstand * scale : rearAxleX

  // Lasterom
  const lasteromEndX = rearEffectiveX + overhengBak * scale
  const lasteromStartX = lasteromEndX - lasteromLengde * scale

  // LTP position (from rear effective axle, going forward)
  const ltpX = rearEffectiveX - ltp * scale

  // Vertical positions
  const groundY = svgHeight - 20
  const axleY = groundY - 16
  const wheelRadius = 14
  const chassisY = axleY - 26
  const cargoTopY = chassisY - 50
  const cabTopY = chassisY - 42

  // Cab boundaries
  const cabStartX = padding + 10
  const cabEndX = lasteromStartX - 6

  return (
    <div className="bg-surface-secondary rounded-xl border border-border-default p-4 sm:p-5">
      <div className="text-sm font-medium mb-3">Plassering av LTP i lasterommet</div>

      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto"
        style={{ maxHeight: '220px' }}
      >
        {/* Ground line */}
        <line
          x1={padding - 10}
          y1={groundY}
          x2={svgWidth - padding + 10}
          y2={groundY}
          stroke="currentColor"
          className="text-border-default"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Chassis line */}
        <line
          x1={cabStartX}
          y1={chassisY}
          x2={lasteromEndX + 4}
          y2={chassisY}
          stroke="currentColor"
          className="text-text-muted"
          strokeWidth="2"
        />

        {/* Cab */}
        <rect
          x={cabStartX}
          y={cabTopY}
          width={cabEndX - cabStartX}
          height={chassisY - cabTopY}
          rx="6"
          fill="currentColor"
          className="text-surface-tertiary"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Cab window */}
        <rect
          x={cabStartX + 6}
          y={cabTopY + 6}
          width={cabEndX - cabStartX - 12}
          height={(chassisY - cabTopY) * 0.4}
          rx="3"
          fill="currentColor"
          className="text-accent/20"
          stroke="currentColor"
          strokeWidth="0.5"
        />

        {/* Cargo area (lasterom) */}
        <rect
          x={lasteromStartX}
          y={cargoTopY}
          width={lasteromEndX - lasteromStartX}
          height={chassisY - cargoTopY}
          rx="3"
          fill="none"
          stroke="currentColor"
          className="text-text-muted"
          strokeWidth="1.5"
          strokeDasharray="6 3"
        />
        {/* Cargo fill */}
        <rect
          x={lasteromStartX + 1}
          y={cargoTopY + 1}
          width={lasteromEndX - lasteromStartX - 2}
          height={chassisY - cargoTopY - 2}
          rx="2"
          fill="currentColor"
          className="text-orange-500/5"
        />

        {/* Wheels – front axle */}
        <circle
          cx={frontAxleX}
          cy={axleY}
          r={wheelRadius}
          fill="currentColor"
          className="text-text-muted"
        />
        <circle
          cx={frontAxleX}
          cy={axleY}
          r={wheelRadius - 4}
          fill="currentColor"
          className="text-surface-primary"
        />

        {/* Wheels – rear axle(s) */}
        <circle
          cx={boggiAxle1X}
          cy={axleY}
          r={wheelRadius}
          fill="currentColor"
          className="text-text-muted"
        />
        <circle
          cx={boggiAxle1X}
          cy={axleY}
          r={wheelRadius - 4}
          fill="currentColor"
          className="text-surface-primary"
        />

        {antallAksler === '3-aksler' && (
          <>
            <circle
              cx={boggiAxle2X}
              cy={axleY}
              r={wheelRadius}
              fill="currentColor"
              className="text-text-muted"
            />
            <circle
              cx={boggiAxle2X}
              cy={axleY}
              r={wheelRadius - 4}
              fill="currentColor"
              className="text-surface-primary"
            />
          </>
        )}

        {/* LTP marker line */}
        <line
          x1={ltpX}
          y1={cargoTopY - 8}
          x2={ltpX}
          y2={chassisY + 4}
          stroke="#f97316"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* LTP triangle marker (pointing down) */}
        <polygon
          points={`${ltpX - 8},${cargoTopY - 18} ${ltpX + 8},${cargoTopY - 18} ${ltpX},${cargoTopY - 6}`}
          fill="#f97316"
        />

        {/* LTP label */}
        <text
          x={ltpX}
          y={cargoTopY - 24}
          textAnchor="middle"
          className="text-xs font-bold"
          fill="#f97316"
        >
          LTP
        </text>

        {/* Dimension: LTP distance from rear axle */}
        <line
          x1={rearEffectiveX}
          y1={groundY + 12}
          x2={ltpX}
          y2={groundY + 12}
          stroke="#f97316"
          strokeWidth="1"
          markerStart="url(#arrowLeft)"
          markerEnd="url(#arrowRight)"
        />
        <text
          x={(rearEffectiveX + ltpX) / 2}
          y={groundY + 10}
          textAnchor="middle"
          className="text-[10px] font-medium"
          fill="#f97316"
        >
          {ltp.toFixed(0)} cm
        </text>

        {/* Rear axle label */}
        <text
          x={rearEffectiveX}
          y={groundY + 12}
          textAnchor="middle"
          className="text-[9px]"
          fill="currentColor"
          opacity="0.5"
        >
          {antallAksler === '3-aksler' ? 'boggi' : 'bakaksel'}
        </text>

        {/* Arrow markers */}
        <defs>
          <marker
            id="arrowLeft"
            viewBox="0 0 10 10"
            refX="0"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M10 0 L0 5 L10 10 Z" fill="#f97316" />
          </marker>
          <marker
            id="arrowRight"
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill="#f97316" />
          </marker>
        </defs>
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-orange-500 rounded-full" />
          <span className="text-[11px] text-text-muted">LTP-posisjon</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 border border-text-muted/40 rounded-sm border-dashed" />
          <span className="text-[11px] text-text-muted">Lasterom</span>
        </div>
      </div>
    </div>
  )
}
