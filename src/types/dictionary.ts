export type DictionaryCategory =
  | 'motor-drivverk'
  | 'bremser'
  | 'chassis'
  | 'el-anlegg'
  | 'adr-farlig-gods'
  | 'kjoretoyforskriften'
  | 'kjore-hviletid'
  | 'sikkerhet'
  | 'lasting-sikring'

export interface DictionaryTerm {
  id: string
  term: string
  definition: string
  category: DictionaryCategory
  relatedTerms?: string[]
  mediaUrl?: string
  mediaType?: 'video' | 'image'
}

export interface CategoryInfo {
  id: DictionaryCategory
  label: string
}
