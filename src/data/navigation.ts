import { Calculator, BookOpen, Clock, Crosshair, ShieldAlert, ClipboardCheck, type LucideIcon } from 'lucide-react'

export interface NavItem {
  path: string
  label: string
  icon: LucideIcon
  emoji: string
  description: string
  color: string
  colorText: string
  colorBorder: string
  colorGlow: string
}

export const navItems: NavItem[] = [
  {
    path: '/daglig-kontroll',
    label: 'Daglig kontroll',
    icon: ClipboardCheck,
    emoji: '✅',
    description: 'Sjekkliste for daglig kontroll av lastebil og tilhenger',
    color: 'bg-amber-500/15',
    colorText: 'text-amber-400',
    colorBorder: 'hover:border-amber-500/40',
    colorGlow: 'hover:shadow-amber-500/10',
  },
  {
    path: '/ltp-kalkulator',
    label: 'LTP-kalkulator',
    icon: Crosshair,
    emoji: '🎯',
    description: 'Finn lastens tyngdepunkt i lasterommet',
    color: 'bg-orange-500/15',
    colorText: 'text-orange-400',
    colorBorder: 'hover:border-orange-500/40',
    colorGlow: 'hover:shadow-orange-500/10',
  },
  {
    path: '/nyttelast-kalkulator',
    label: 'Nyttelastkalkulator',
    icon: Calculator,
    emoji: '⚖️',
    description: 'Beregn nyttelast for lastebil, semitrailer og vogntog',
    color: 'bg-green-500/15',
    colorText: 'text-green-400',
    colorBorder: 'hover:border-green-500/40',
    colorGlow: 'hover:shadow-green-500/10',
  },
  {
    path: '/kjore-hviletid',
    label: 'Kjøre- og hviletid',
    icon: Clock,
    emoji: '⏱️',
    description: 'Regler for kjøretid, pauser og hvile – med kalkulator',
    color: 'bg-teal-500/15',
    colorText: 'text-teal-400',
    colorBorder: 'hover:border-teal-500/40',
    colorGlow: 'hover:shadow-teal-500/10',
  },
  {
    path: '/ulykkeshandtering',
    label: 'Ulykkeshåndtering',
    icon: ShieldAlert,
    emoji: '🚨',
    description: 'Sikre, varsle og hjelpe – førstemann til skadested',
    color: 'bg-red-500/15',
    colorText: 'text-red-400',
    colorBorder: 'hover:border-red-500/40',
    colorGlow: 'hover:shadow-red-500/10',
  },
  {
    path: '/fagordbok',
    label: 'Fagordbok',
    icon: BookOpen,
    emoji: '📖',
    description: 'Slå opp tekniske begreper fra yrkessjåførkurs og førerkort C/CE',
    color: 'bg-purple-500/15',
    colorText: 'text-purple-400',
    colorBorder: 'hover:border-purple-500/40',
    colorGlow: 'hover:shadow-purple-500/10',
  },
]
