import type { DictionaryTerm } from '../types/dictionary'

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
}

export function searchTerms(terms: DictionaryTerm[], query: string): DictionaryTerm[] {
  if (!query.trim()) return terms

  const normalizedQuery = normalize(query)
  return terms.filter((t) => {
    const normalizedTerm = normalize(t.term)
    const normalizedDef = normalize(t.definition)
    return normalizedTerm.includes(normalizedQuery) || normalizedDef.includes(normalizedQuery)
  })
}
