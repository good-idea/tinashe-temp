import { SiteSettings, Track } from '../../types'
import { SiteData } from './SiteData'

type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R
// from: https://stackoverflow.com/questions/41285211/overriding-interface-property-type-defined-in-typescript-d-ts-file

export type RawTrack = Modify<
  Track,
  {
    releaseDate: string
  }
>

export interface QueryResult {
  settings: SiteSettings
  tracks: Partial<RawTrack>[]
}

/**
 * Make sure each track has all required data.
 * These are validated in Sanity, but some undefined values
 * could still slip through
 */
const validateTrack = (trackData: Partial<RawTrack>): boolean => {
  const { slug, title, trackNumber, releaseDate } = trackData
  return Boolean(
    releaseDate &&
      title &&
      title.length &&
      slug &&
      slug.length &&
      typeof trackNumber === 'number'
  )
}

const parseTrack = (trackData: RawTrack, index: number): Track => ({
  ...trackData,
  releaseDate: new Date(trackData.releaseDate),
  trackNumber: index + 1,
})

export const parseData = (data: QueryResult): SiteData => {
  const { settings, tracks } = data
  return {
    settings,
    tracks: tracks
      .filter(validateTrack)
      .sort((a, b) => {
        if (a.trackNumber < b.trackNumber) return 1
        if (a.trackNumber > b.trackNumber) return -1
        return 0
      })
      .filter(Boolean)
      .map(parseTrack),
  }
}
