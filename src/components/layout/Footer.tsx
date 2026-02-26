export default function Footer() {
  return (
    <footer className="border-t border-border-default bg-surface-secondary/50 py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3">
          <img src="/otl-logo.png" alt="OTL Agder" className="h-10 w-auto opacity-70" />
          <div className="text-left">
            <p className="text-xs font-medium text-text-secondary">Et verktøy fra</p>
            <p className="text-sm font-semibold text-text-primary">OTL Agder</p>
          </div>
        </div>
        <div className="text-sm text-text-muted">
          <p>YSK Verktøy er et læringsverktøy og erstatter ikke offisielle forskrifter.</p>
          <p className="mt-1">Sjekk alltid gjeldende regelverk hos Statens vegvesen og Arbeidstilsynet.</p>
        </div>
      </div>
    </footer>
  )
}
