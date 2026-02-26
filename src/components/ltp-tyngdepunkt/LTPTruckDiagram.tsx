import type { AxleConfig, LTPVehicleType } from '../../types/ltp-tyngdepunkt'

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
  /** Boggiavstand i cm (for 3-aksler+) */
  boggiAvstand: number
  /** Kjøretøytype */
  vehicleType: LTPVehicleType
}

export default function LTPVehicleDiagram({
  ltp,
  akselavstand,
  lasteromLengde,
  overhengBak,
  antallAksler,
  boggiAvstand,
  vehicleType,
}: Props) {
  // SVG dimensions
  const svgWidth = 540
  const svgHeight = 210
  const padding = 30

  const isSlepvogn = vehicleType === 'slepvogn'

  // Calculate scaling
  const cabVisualLength = isSlepvogn ? 30 : 80 // Slepvogn has no cab, just a drawbar
  const tailPadding = 40
  const totalVisualLength = cabVisualLength + akselavstand + overhengBak + tailPadding
  const scale = (svgWidth - padding * 2) / totalVisualLength

  // Key positions (x coordinates)
  const frontAxleX = padding + cabVisualLength * scale
  const rearAxleX = frontAxleX + akselavstand * scale

  // Boggi positions
  const harBoggi = antallAksler !== '2-aksler'
  const boggiMid = harBoggi ? boggiAvstand / 2 : 0
  const rearEffectiveX = rearAxleX + boggiMid * scale
  const boggiAxle1X = rearAxleX
  const boggiAxle2X = harBoggi ? rearAxleX + boggiAvstand * scale : rearAxleX

  // 4-axle: front boggi
  const is4Axle = antallAksler === '4-aksler'
  const frontAxle2X = is4Axle ? frontAxleX + 30 * scale : frontAxleX

  // Lasterom
  const lasteromEndX = rearEffectiveX + overhengBak * scale
  const lasteromStartX = lasteromEndX - lasteromLengde * scale

  // LTP position
  const ltpX = rearEffectiveX - ltp * scale

  // Vertical positions
  const groundY = svgHeight - 20
  const axleY = groundY - 16
  const wheelRadius = 14
  const chassisY = axleY - 26
  const cargoTopY = chassisY - 50
  const cabTopY = chassisY - (vehicleType === 'buss' ? 50 : 42) // Bus is taller

  // Cab/front boundaries
  const cabStartX = isSlepvogn ? frontAxleX - 20 * scale : padding + 10
  const cabEndX = isSlepvogn ? frontAxleX + 10 * scale : lasteromStartX - 6

  // Rear axle label
  const rearLabel = harBoggi ? 'boggi' : (isSlepvogn ? 'bakaksling' : 'bakaksel')

  return (
    <div className="bg-surface-secondary rounded-xl border border-border-default p-4 sm:p-5">
      <div className="text-sm font-medium mb-3">
        Plassering av LTP – {vehicleType === 'lastebil' ? 'Lastebil' : vehicleType === 'buss' ? 'Buss' : 'Slepvogn'}
      </div>

      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto"
        style={{ maxHeight: '230px' }}
      >
        {/* Arrow markers (defined first) */}
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
          x1={isSlepvogn ? frontAxleX - 30 * scale : cabStartX}
          y1={chassisY}
          x2={lasteromEndX + 4}
          y2={chassisY}
          stroke="currentColor"
          className="text-text-muted"
          strokeWidth="2"
        />

        {/* Vehicle body */}
        {isSlepvogn ? (
          <>
            {/* Slepvogn: drawbar (dragarmen foran) */}
            <line
              x1={frontAxleX - 30 * scale}
              y1={chassisY}
              x2={frontAxleX}
              y2={chassisY}
              stroke="currentColor"
              className="text-text-muted"
              strokeWidth="3"
            />
            {/* Coupling point */}
            <circle
              cx={frontAxleX - 30 * scale}
              cy={chassisY}
              r={4}
              fill="currentColor"
              className="text-text-muted"
            />
          </>
        ) : vehicleType === 'buss' ? (
          <>
            {/* Buss: full body (no separate cab) */}
            <rect
              x={cabStartX}
              y={cabTopY}
              width={lasteromEndX - cabStartX}
              height={chassisY - cabTopY}
              rx="8"
              fill="currentColor"
              className="text-surface-tertiary"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Bus windows row */}
            {Array.from({ length: Math.min(6, Math.floor((lasteromEndX - cabStartX - 20) / 40)) }).map((_, i) => (
              <rect
                key={i}
                x={cabStartX + 14 + i * 40}
                y={cabTopY + 8}
                width={28}
                height={(chassisY - cabTopY) * 0.35}
                rx="3"
                fill="currentColor"
                className="text-accent/20"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            ))}
            {/* Bus door */}
            <rect
              x={cabStartX + 4}
              y={cabTopY + 8}
              width={8}
              height={(chassisY - cabTopY) - 12}
              rx="2"
              fill="currentColor"
              className="text-accent/10"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </>
        ) : (
          <>
            {/* Lastebil: cab */}
            <rect
              x={cabStartX}
              y={cabTopY}
              width={Math.max(cabEndX - cabStartX, 20)}
              height={chassisY - cabTopY}
              rx="6"
              fill="currentColor"
              className="text-surface-tertiary"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Cab window */}
            {cabEndX - cabStartX > 30 && (
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
            )}
          </>
        )}

        {/* Cargo area (lasterom) – dashed outline */}
        {!isSlepvogn || vehicleType === 'slepvogn' ? (
          <>
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
            <rect
              x={lasteromStartX + 1}
              y={cargoTopY + 1}
              width={lasteromEndX - lasteromStartX - 2}
              height={chassisY - cargoTopY - 2}
              rx="2"
              fill="currentColor"
              className="text-orange-500/5"
            />
          </>
        ) : null}

        {/* Wheels – front axle */}
        <circle cx={frontAxleX} cy={axleY} r={wheelRadius} fill="currentColor" className="text-text-muted" />
        <circle cx={frontAxleX} cy={axleY} r={wheelRadius - 4} fill="currentColor" className="text-surface-primary" />

        {/* 4-axle: second front axle */}
        {is4Axle && (
          <>
            <circle cx={frontAxle2X} cy={axleY} r={wheelRadius} fill="currentColor" className="text-text-muted" />
            <circle cx={frontAxle2X} cy={axleY} r={wheelRadius - 4} fill="currentColor" className="text-surface-primary" />
          </>
        )}

        {/* Wheels – rear axle(s) */}
        <circle cx={boggiAxle1X} cy={axleY} r={wheelRadius} fill="currentColor" className="text-text-muted" />
        <circle cx={boggiAxle1X} cy={axleY} r={wheelRadius - 4} fill="currentColor" className="text-surface-primary" />

        {harBoggi && (
          <>
            <circle cx={boggiAxle2X} cy={axleY} r={wheelRadius} fill="currentColor" className="text-text-muted" />
            <circle cx={boggiAxle2X} cy={axleY} r={wheelRadius - 4} fill="currentColor" className="text-surface-primary" />
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

        {/* LTP triangle marker */}
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
          {rearLabel}
        </text>
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
