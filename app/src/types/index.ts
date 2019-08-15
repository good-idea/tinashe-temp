export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface SEO {
  seoTitle: string
  seoDescription: string
  seoImage: SanityImage
}

export interface SiteSettings extends SEO {}

export interface Track extends Partial<SEO> {
  trackNumber: number
  title: string
  slug: string
  releaseDate: Date
}
