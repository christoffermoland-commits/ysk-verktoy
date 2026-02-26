import { Link } from 'react-router-dom'
import { Truck, Sparkles } from 'lucide-react'
import { navItems } from '../data/navigation'

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-10 py-4 sm:py-8">
      {/* Hero – Mattehjelpen-style centered header */}
      <section className="text-center space-y-4">
        <div className="flex justify-center">
          <img
            src="/otl-logo.png"
            alt="Opplæringskontoret Transport & Logistikk Agder"
            className="h-24 sm:h-28 w-auto"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          <span className="text-accent">OTL</span>{' '}
          <span className="text-text-primary">Sjåførverktøy</span>
        </h1>
        <p className="text-text-secondary text-base sm:text-lg max-w-md mx-auto leading-relaxed">
          Digitale verktøy for lærlinger i Yrkessjåførfaget – beregn vekt, lær begreper og forstå regelverket! 💪
        </p>
      </section>

      {/* Topic selection grid – like Mattehjelpen's subject buttons */}
      <section className="space-y-4">
        <h2 className="text-center text-sm font-semibold text-text-muted uppercase tracking-widest">
          Velg verktøy
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative bg-surface-secondary rounded-2xl border border-border-default p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${item.colorBorder} ${item.colorGlow}`}
            >
              {/* Colored icon box with emoji */}
              <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                <span className="text-2xl">{item.emoji}</span>
              </div>

              {/* Label */}
              <h3 className={`font-bold text-base sm:text-lg mb-1 ${item.colorText} transition-colors`}>
                {item.label}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA / engagement box – like Mattehjelpen's "Nå er det din tur!" */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-purple-500/10 to-teal-500/10 border border-accent/20 p-6 sm:p-8 text-center">
        <div className="relative z-10">
          <div className="flex justify-center mb-3">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-2">
            Klar for å lære? 🎯
          </h2>
          <p className="text-sm text-text-secondary max-w-sm mx-auto mb-4">
            Finn lastens tyngdepunkt med LTP-kalkulatoren, eller slå opp et begrep i fagordboken.
          </p>
          <Link
            to="/ltp-kalkulator"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors text-sm"
          >
            <Truck className="w-4 h-4" />
            Finn LTP
          </Link>
        </div>
      </section>

      {/* Quick info */}
      <section className="text-center space-y-2 pb-4">
        <p className="text-xs text-text-muted leading-relaxed max-w-md mx-auto">
          Appen er laget som læringsverktøy for elever og lærlinger i Yrkessjåførfaget.
          Den erstatter ikke offisielle forskrifter – sjekk alltid gjeldende regelverk hos Statens vegvesen.
        </p>
      </section>
    </div>
  )
}
