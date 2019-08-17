import { RawTrack } from './parseData'
import { SiteSettings } from '../../types'

const imageFragment = `
  "url": asset->url,
  "_key": asset->id,
  "metadata": asset->metadata,
  "extension": asset->extension,
  ...
`

const seoFragment = `
  seoTitle,
  seoDescription,
  "seoImage": seoImage{
    ${imageFragment}
  },
`

export const siteDataQuery = `{
  "tracks": *[
  	_type=="track"
  ] | order(trackNumber) {
    "slug": slug.current,
    ${seoFragment}
    "background": background[0]{
      ${imageFragment}
    },
    ...
  },
  "settings": *[
    _type=="homepage"
  ]{
    ${seoFragment}
    ...
  }[0]
}
`

export interface ExpectedQueryResult {
  tracks: RawTrack[]
  settings: SiteSettings
}
