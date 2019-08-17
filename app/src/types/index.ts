export type SanityClient = {
  fetch: <ExpectedResult>(query: string) => Promise<ExpectedResult>
}

interface ImageMetaData {}

export interface SanityImage {
  _type: 'image'
  _key: string
  url: string
  metadata: ImageMetaData
  extension: string
}

export interface SEO {
  seoTitle: string
  seoDescription: string
  seoImage: SanityImage
}

export interface SiteSettings extends SEO {
  albumTitle: string
}

export interface Track extends Partial<SEO> {
  trackNumber: number
  title: string
  slug: string
  releaseDate: Date
}
