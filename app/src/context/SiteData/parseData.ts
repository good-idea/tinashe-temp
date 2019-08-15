import { SiteSettings, Track } from '../../types'
import { SiteData } from './SiteData'

type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R
// from: https://stackoverflow.com/questions/41285211/overriding-interface-property-type-defined-in-typescript-d-ts-file

type RawTrack = Modify<
  Partial<Track>,
  {
    releaseDate: string
  }
>

export interface QueryResult {
  settings: SiteSettings
  tracks: RawTrack[]
}

/**
 * Make sure each track has all required data.
 * These are validated in Sanity, but some undefined values
 * could still slip through
 */
const parseTrack = (trackData: RawTrack, index: number): Track | null => {
  const { slug, title, trackNumber, releaseDate, ...rest } = trackData
  if (
    !title ||
    !title.length ||
    !slug ||
    !slug.length ||
    typeof trackNumber !== 'number'
  )
    return null
  return {
    ...rest,
    slug,
    title,
    releaseDate: new Date(releaseDate),
    /* In case track numbers are mismatched in the CMS,
     * assign it here explicitly */
    trackNumber: index + 1,
  }
}

export const parseData = (data: QueryResult): SiteData => {
  const { settings, tracks } = data
  return {
    settings,
    tracks: tracks
      .sort((a, b) => {
        if (a.trackNumber < b.trackNumber) return 1
        if (a.trackNumber > b.trackNumber) return -1
        return 0
      })
      .map(parseTrack)
      .filter(Boolean),
  }
}
