import type { DrivingSession, DrivingTimeResult, TimelineSegment } from '../types/driving-time'

const MAX_CONTINUOUS_DRIVING = 270 // 4.5 hours in minutes
const REQUIRED_BREAK = 45
const MAX_DAILY_DRIVING = 540 // 9 hours
const MAX_DAILY_DRIVING_EXTENDED = 600 // 10 hours

function parseTime(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

function formatTime(minutes: number): string {
  const totalMinutes = ((minutes % 1440) + 1440) % 1440
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}

export function calculateDrivingTime(session: DrivingSession, currentTime: string): DrivingTimeResult {
  const startMinutes = parseTime(session.startTime)
  const currentMinutes = parseTime(currentTime)
  const elapsed = currentMinutes >= startMinutes
    ? currentMinutes - startMinutes
    : (1440 - startMinutes) + currentMinutes

  // Sort breaks by start time
  const sortedBreaks = [...session.breaks].sort(
    (a, b) => parseTime(a.startTime) - parseTime(b.startTime)
  )

  // Build timeline and calculate driving vs break time
  const timeline: TimelineSegment[] = []
  let totalDrivingMinutes = 0
  let continuousDriving = 0
  let lastBreakResetTime = startMinutes
  let pos = startMinutes

  for (const brk of sortedBreaks) {
    const brkStart = parseTime(brk.startTime)
    if (brkStart > pos) {
      const drivingDuration = brkStart - pos
      totalDrivingMinutes += drivingDuration
      continuousDriving += drivingDuration
      timeline.push({
        type: 'driving',
        startTime: formatTime(pos),
        endTime: formatTime(brkStart),
        durationMinutes: drivingDuration,
        label: `Kjøring (${drivingDuration} min)`,
      })
    }

    timeline.push({
      type: 'break',
      startTime: formatTime(brkStart),
      endTime: formatTime(brkStart + brk.duration),
      durationMinutes: brk.duration,
      label: `Pause (${brk.duration} min)`,
    })

    // A break >= 45 min resets the continuous driving counter
    if (brk.duration >= REQUIRED_BREAK) {
      continuousDriving = 0
      lastBreakResetTime = brkStart + brk.duration
    }

    pos = brkStart + brk.duration
  }

  // Driving from last break/position to current time
  if (currentMinutes > pos) {
    const drivingDuration = currentMinutes - pos
    totalDrivingMinutes += drivingDuration
    continuousDriving += drivingDuration
    timeline.push({
      type: 'driving',
      startTime: formatTime(pos),
      endTime: formatTime(currentMinutes),
      durationMinutes: drivingDuration,
      label: `Kjøring (${drivingDuration} min)`,
    })
  }

  const remainingBeforeBreak = Math.max(0, MAX_CONTINUOUS_DRIVING - continuousDriving)
  const canExtendToday = totalDrivingMinutes < MAX_DAILY_DRIVING
  const maxToday = canExtendToday ? MAX_DAILY_DRIVING_EXTENDED : MAX_DAILY_DRIVING
  const remainingDailyDriving = Math.max(0, maxToday - totalDrivingMinutes)

  const nextMandatoryBreakAt = formatTime(currentMinutes + remainingBeforeBreak)

  // Daily rest must start so that 11h rest fits in 24h from start
  const latestEndOfDriving = startMinutes + (24 * 60) - (11 * 60)
  const dailyRestStartsAt = formatTime(Math.min(
    latestEndOfDriving,
    currentMinutes + remainingDailyDriving
  ))

  // Add projected segments
  if (remainingBeforeBreak > 0 && remainingDailyDriving > 0) {
    const projectedDriving = Math.min(remainingBeforeBreak, remainingDailyDriving)
    timeline.push({
      type: 'projected-driving',
      startTime: formatTime(currentMinutes),
      endTime: formatTime(currentMinutes + projectedDriving),
      durationMinutes: projectedDriving,
      label: `Mulig kjøring (${projectedDriving} min)`,
    })

    if (projectedDriving === remainingBeforeBreak && remainingDailyDriving > remainingBeforeBreak) {
      timeline.push({
        type: 'projected-break',
        startTime: formatTime(currentMinutes + projectedDriving),
        endTime: formatTime(currentMinutes + projectedDriving + REQUIRED_BREAK),
        durationMinutes: REQUIRED_BREAK,
        label: `Påkrevd pause (${REQUIRED_BREAK} min)`,
      })
    }
  }

  return {
    totalDrivingMinutes,
    remainingBeforeBreak,
    remainingDailyDriving,
    nextMandatoryBreakAt,
    dailyRestStartsAt,
    canExtendToday,
    timeline,
  }
}

export { formatTime, parseTime }
