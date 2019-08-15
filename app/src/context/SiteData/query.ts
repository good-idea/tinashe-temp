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
