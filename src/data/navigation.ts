import { Calculator, BookOpen, Clock, PlayCircle, type LucideIcon } from 'lucide-react'

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
    path: '/ltp-kalkulator',
    label: 'LTP-kalkulator',
    icon: Calculator,
    emoji: '⚖️',
    description: 'Beregn lovlig totalvekt for lastebil, semitrailer og vogntog',
    color: 'bg-orange-500/15',
    colorText: 'text-orange-400',
    colorBorder: 'hover:border-orange-500/40',
    colorGlow: 'hover:shadow-orange-500/10',
  },
  {
    path: '/fagordbok',
    label: 'Fagordbok',
    icon: BookOpen,
    emoji: '📖',
    description: 'Slå opp tekniske begreper fra YSK-kurs og førerkortkurs C/CE',
    color: 'bg-purple-500/15',
    colorText: 'text-purple-400',
    colorBorder: 'hover:border-purple-500/40',
    colorGlow: 'hover:shadow-purple-500/10',
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
    path: '/videoer',
    label: 'Videoer',
    icon: PlayCircle,
    emoji: '🎬',
    description: 'Læringsvideoer sortert etter tema',
    color: 'bg-rose-500/15',
    colorText: 'text-rose-400',
    colorBorder: 'hover:border-rose-500/40',
    colorGlow: 'hover:shadow-rose-500/10',
  },
]
