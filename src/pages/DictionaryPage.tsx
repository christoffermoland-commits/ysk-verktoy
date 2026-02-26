import { useState } from 'react'
import { BookOpen, Search } from 'lucide-react'
import type { DictionaryCategory } from '../types/dictionary'
import { dictionaryTerms, DICTIONARY_CATEGORIES } from '../data/dictionary-terms'
import { searchTerms } from '../utils/search'

export default function DictionaryPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<DictionaryCategory | null>(null)

  let filtered = searchTerms(dictionaryTerms, query)
  if (activeCategory) {
    filtered = filtered.filter((t) => t.category === activeCategory)
  }
  filtered = [...filtered].sort((a, b) => a.term.localeCompare(b.term, 'nb'))

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Fagordbok</h1>
          <p className="text-sm text-text-secondary">Teknisk ordbok for yrkessjåfør og førerkort C/CE</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          placeholder="Søk etter begrep..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-surface-tertiary border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
        />
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
        {DICTIONARY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-colors ${
              activeCategory === cat.id
                ? 'bg-accent text-white'
                : 'bg-surface-tertiary text-text-secondary hover:text-text-primary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-text-muted">
        {filtered.length} {filtered.length === 1 ? 'begrep' : 'begreper'} funnet
      </p>

      {/* Terms list */}
      <div className="space-y-3">
        {filtered.map((term) => {
          const catLabel = DICTIONARY_CATEGORIES.find((c) => c.id === term.category)?.label
          return (
            <div
              key={term.id}
              className="bg-surface-secondary rounded-xl border border-border-default p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-text-primary">{term.term}</h3>
                {catLabel && (
                  <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                    {catLabel}
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{term.definition}</p>
              {term.relatedTerms && term.relatedTerms.length > 0 && (
                <div className="mt-3 flex gap-2 flex-wrap">
                  <span className="text-xs text-text-muted">Relatert:</span>
                  {term.relatedTerms.map((rt) => {
                    const related = dictionaryTerms.find((t) => t.id === rt)
                    return related ? (
                      <button
                        key={rt}
                        onClick={() => setQuery(related.term)}
                        className="text-xs text-accent hover:underline"
                      >
                        {related.term}
                      </button>
                    ) : null
                  })}
                </div>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            <p>Ingen begreper funnet for &laquo;{query}&raquo;</p>
          </div>
        )}
      </div>
    </div>
  )
}
