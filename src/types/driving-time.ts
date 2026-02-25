export interface DrivingRegulation {
  id: string
  category: 'daglig-kjoring' | 'ukentlig-kjoring' | 'pause' | 'daglig-hvile' | 'ukentlig-hvile'
  title: string
  mainRule: string
  maxValue: number
  unit: 'timer' | 'minutter'
  exceptions: string[]
  legalReference: string
}

export interface BreakEntry {
  id: string
  startTime: string
  duration: number
}

export interface DrivingSession {
  startTime: string
  breaks: BreakEntry[]
}

export interface DrivingTimeResult {
  totalDrivingMinutes: number
  remainingBeforeBreak: number
  remainingDailyDriving: number
  nextMandatoryBreakAt: string
  dailyRestStartsAt: string
  canExtendToday: boolean
  timeline: TimelineSegment[]
}

export interface TimelineSegment {
  type: 'driving' | 'break' | 'rest' | 'projected-driving' | 'projected-break' | 'projected-rest'
  startTime: string
  endTime: string
  durationMinutes: number
  label: string
}
