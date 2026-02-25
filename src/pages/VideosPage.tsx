import { useState } from 'react'
import { PlayCircle, X } from 'lucide-react'
import { videoResources, videoCategories } from '../data/video-resources'

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)

  const filtered = activeCategory
    ? videoResources.filter((v) => v.category === activeCategory)
    : videoResources

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <PlayCircle className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Læringsvideoer</h1>
          <p className="text-sm text-text-secondary">Videoressurser sortert etter tema</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveCategory(null)}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-colors ${
            activeCategory === null
              ? 'bg-accent text-white'
              : 'bg-surface-tertiary text-text-secondary hover:text-text-primary'
          }`}
        >
          Alle
        </button>
        {videoCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-colors ${
              activeCategory === cat
                ? 'bg-accent text-white'
                : 'bg-surface-tertiary text-text-secondary hover:text-text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((video) => (
          <div
            key={video.id}
            className="bg-surface-secondary rounded-xl border border-border-default overflow-hidden"
          >
            {playingId === video.id ? (
              <div className="relative">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <button
                  onClick={() => setPlayingId(null)}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setPlayingId(video.id)}
                className="w-full aspect-video bg-surface-tertiary flex items-center justify-center group relative"
              >
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-7 h-7 text-white" />
                  </div>
                </div>
              </button>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-medium text-sm">{video.title}</h3>
                <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                  {video.category}
                </span>
              </div>
              <p className="text-xs text-text-secondary">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-text-muted">
          <p>Ingen videoer i denne kategorien ennå.</p>
        </div>
      )}

      <div className="bg-surface-secondary rounded-xl border border-border-default p-4 text-center">
        <p className="text-xs text-text-muted">
          Videoene er plassholderressurser. Faktiske læringsvideoer kan legges til ved å oppdatere video-dataene.
        </p>
      </div>
    </div>
  )
}
