import { useState, useMemo } from 'react'
import { BookOpen, Search, SortAsc, LayoutGrid } from 'lucide-react'
import type { DictionaryCategory, DictionaryTerm } from '../types/dictionary'
import { dictionaryTerms, DICTIONARY_CATEGORIES } from '../data/dictionary-terms'
import { searchTerms } from '../utils/search'

type ViewMode = 'alphabet' | 'category'

function TermCard({ term, onSearch }: { term: DictionaryTerm; onSearch: (q: string) => void }) {
  const catLabel = DICTIONARY_CATEGORIES.find((c) => c.id === term.category)?.label
  return (
    <div className="bg-surface-secondary rounded-xl border border-border-default p-5">
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
                onClick={() => onSearch(related.term)}
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
}

function AlphabetNav({ letters, activeLetter }: { letters: string[]; activeLetter: string | null }) {
  return (
    <div className="flex gap-1 flex-wrap">
      {letters.map((letter) => (
        <a
          key={letter}
          href={`#letter-${letter}`}
          className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
            activeLetter === letter
              ? 'bg-accent text-white'
              : 'bg-surface-tertiary text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
          }`}
        >
          {letter}
        </a>
      ))}
    </div>
  )
}

export default function DictionaryPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<DictionaryCategory | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('alphabet')

  const filtered = useMemo(() => {
    let result = searchTerms(dictionaryTerms, query)
    if (activeCategory) {
      result = result.filter((t) => t.category === activeCategory)
    }
    return [...result].sort((a, b) => a.term.localeCompare(b.term, 'nb'))
  }, [query, activeCategory])

  // Group terms by first letter for alphabet view
  const alphabetGroups = useMemo(() => {
    const groups: Record<string, DictionaryTerm[]> = {}
    for (const term of filtered) {
      const firstChar = term.term.charAt(0).toUpperCase()
      // Group special chars and numbers under #
      const letter = /[A-ZÆØÅ]/.test(firstChar) ? firstChar : '#'
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(term)
    }
    // Sort the keys with Norwegian alphabet order
    const sortedKeys = Object.keys(groups).sort((a, b) => {
      if (a === '#') return -1
      if (b === '#') return 1
      return a.localeCompare(b, 'nb')
    })
    return sortedKeys.map((letter) => ({ letter, terms: groups[letter] }))
  }, [filtered])

  // Group terms by category for category view
  const categoryGroups = useMemo(() => {
    return DICTIONARY_CATEGORIES.map((cat) => ({
      category: cat,
      terms: filtered.filter((t) => t.category === cat.id),
    })).filter((g) => g.terms.length > 0)
  }, [filtered])

  // Count terms per category for filter chips
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    const base = searchTerms(dictionaryTerms, query)
    for (const cat of DICTIONARY_CATEGORIES) {
      counts[cat.id] = base.filter((t) => t.category === cat.id).length
    }
    return counts
  }, [query])

  const availableLetters = alphabetGroups.map((g) => g.letter)
  const isSearching = query.trim().length > 0

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

      {/* View mode toggle + category filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-muted">
            {filtered.length} {filtered.length === 1 ? 'begrep' : 'begreper'}
          </p>
          <div className="flex bg-surface-tertiary rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('alphabet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'alphabet'
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <SortAsc className="w-3.5 h-3.5" />
              A–Å
            </button>
            <button
              onClick={() => setViewMode('category')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'category'
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Kategori
            </button>
          </div>
        </div>

        {/* Category filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-colors ${
              activeCategory === null
                ? 'bg-accent text-white'
                : 'bg-surface-tertiary text-text-secondary hover:text-text-primary'
            }`}
          >
            Alle ({dictionaryTerms.length})
          </button>
          {DICTIONARY_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.id] || 0
            if (count === 0 && query.trim()) return null
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-accent text-white'
                    : 'bg-surface-tertiary text-text-secondary hover:text-text-primary'
                }`}
              >
                {cat.label} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Alphabet quick-nav (only in alphabet view, not while searching) */}
      {viewMode === 'alphabet' && !isSearching && availableLetters.length > 1 && (
        <AlphabetNav letters={availableLetters} activeLetter={null} />
      )}

      {/* Terms list */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-text-muted">
          <p>Ingen begreper funnet{query ? <> for &laquo;{query}&raquo;</> : null}</p>
        </div>
      ) : viewMode === 'alphabet' ? (
        <div className="space-y-6">
          {alphabetGroups.map(({ letter, terms }) => (
            <div key={letter} id={`letter-${letter}`}>
              {!isSearching && (
                <div className="sticky top-0 z-10 bg-surface-primary/95 backdrop-blur-sm pb-2 pt-1 mb-3 border-b border-border-default">
                  <span className="text-lg font-bold text-accent">{letter}</span>
                  <span className="text-xs text-text-muted ml-2">({terms.length})</span>
                </div>
              )}
              <div className="space-y-3">
                {terms.map((term) => (
                  <TermCard key={term.id} term={term} onSearch={setQuery} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {categoryGroups.map(({ category, terms }) => (
            <div key={category.id}>
              <div className="sticky top-0 z-10 bg-surface-primary/95 backdrop-blur-sm pb-2 pt-1 mb-3 border-b border-border-default">
                <span className="text-lg font-bold text-accent">{category.label}</span>
                <span className="text-xs text-text-muted ml-2">({terms.length})</span>
              </div>
              <div className="space-y-3">
                {terms.map((term) => (
                  <TermCard key={term.id} term={term} onSearch={setQuery} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
